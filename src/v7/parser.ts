import { fromBinary } from '@bufbuild/protobuf';

import { IProElementOutline, IProElementPosition, IProElementShadow } from '../shared.model';
import * as Utils from '../utils';
import { Action_ActionType } from './gen/action_pb';
import { ApplicationInfo_Platform } from './gen/applicationInfo_pb';
import { type Color } from './gen/color_pb';
import { type Cue } from './gen/cue_pb';
import {
  type Graphics_Rect,
  type Graphics_Shadow,
  type Graphics_Stroke,
  type Graphics_Text,
  Graphics_Text_ScaleBehavior,
} from './gen/graphicsData_pb';
import { type Presentation, PresentationSchema } from './gen/presentation_pb';
import { type PresentationSlide } from './gen/presentationSlide_pb';
import { type Timestamp } from './gen/rvtimestamp_pb';
import { type Slide, Slide_Element_Info } from './gen/slide_pb';
import {
  IPro7Arrangement,
  IPro7ArrangementSlideGroup,
  IPro7Properties,
  IPro7Slide,
  IPro7SlideGroup,
  IPro7SlideTextElement,
  IPro7Song,
} from './parser.model';

export class v7Parser {
  parse(fileContent: string | Uint8Array): IPro7Song {
    // Convert string to Uint8Array if needed (for binary protobuf data)
    let binaryData: Uint8Array;
    if (typeof fileContent === 'string') {
      binaryData = new TextEncoder().encode(fileContent);
    } else {
      binaryData = fileContent;
    }

    // Parse the protobuf data
    const presentation = fromBinary(PresentationSchema, binaryData);

    // Check version - v7 should have application info
    if (!presentation.applicationInfo) {
      throw new Error('Expected a ProPresenter 7 file but no application info found');
    }

    const properties = this.getProperties(presentation);
    const slideGroups = this.getSlideGroups(presentation);
    const arrangements = this.getArrangements(presentation, slideGroups);

    return { properties, slideGroups, arrangements };
  }

  private getProperties(presentation: Presentation): IPro7Properties {
    const appInfo = presentation.applicationInfo;
    const ccli = presentation.ccli;

    return {
      CCLIArtistCredits: ccli?.artistCredits ?? '',
      CCLIAuthor: ccli?.author ?? '',
      CCLICopyrightYear: ccli?.copyrightYear ?? '',
      CCLIDisplay: ccli?.display ?? false,
      CCLIPublisher: ccli?.publisher ?? '',
      CCLISongNumber: ccli?.songNumber ?? '',
      CCLISongTitle: ccli?.songTitle ?? '',
      backgroundColor: this.convertColor(
        presentation.background?.Fill?.case === 'color' ? presentation.background.Fill.value : undefined
      ),
      buildNumber: parseInt(appInfo?.applicationVersion?.build ?? '0', 10),
      category: presentation.category ?? '',
      chordChartPath: presentation.chordChart?.RelativeFilePath.value?.path ?? '',
      drawingBackgroundColor: presentation.background?.isEnabled ?? false,
      lastDateUsed: this.convertTimestamp(presentation.lastDateUsed),
      notes: presentation.notes ?? '',
      os: appInfo?.platform ?? ApplicationInfo_Platform.UNDEFINED,
      selectedArrangementID: presentation.selectedArrangement?.string ?? '',
    };
  }

  private getSlideGroups(presentation: Presentation): IPro7SlideGroup[] {
    const slideGroups: IPro7SlideGroup[] = [];

    for (const cueGroup of presentation.cueGroups) {
      if (!cueGroup.group) continue;

      const group = cueGroup.group;
      const slides: IPro7Slide[] = [];

      // Find slides for this group by matching cue identifiers
      for (const cueId of cueGroup.cueIdentifiers) {
        const cue = presentation.cues.find((c) => c.uuid?.string === cueId.string);
        if (cue) {
          const slide = this.createSlideFromCue(cue);
          if (slide) {
            slides.push(slide);
          }
        }
      }

      slideGroups.push({
        groupLabel: group.name ?? '',
        groupId: group.uuid?.string ?? '',
        groupColor: this.convertColor(group.color),
        slides,
      });
    }

    return slideGroups;
  }

  private createSlideFromCue(cue: Cue): IPro7Slide | null {
    // Find slide actions in the cue
    const slideActions = cue.actions.filter((action) => action.type === Action_ActionType.PRESENTATION_SLIDE);

    if (slideActions.length === 0) {
      // Return a basic slide if no slide actions found
      return {
        backgroundColor: { r: 0, g: 0, b: 0 },
        chordChartPath: '',
        drawingBackgroundColor: false,
        enabled: cue.isEnabled ?? true,
        hotKey: cue.hotKey?.controlIdentifier ?? '',
        id: cue.uuid?.string ?? '',
        label: cue.name ?? '',
        notes: '',
        textElements: [],
      };
    }

    // Use the first slide action
    const slideAction = slideActions[0];
    if (slideAction.ActionTypeData.case !== 'slide' || !slideAction.ActionTypeData.value.Slide.case) {
      return null;
    }

    if (slideAction.ActionTypeData.value.Slide.case !== 'presentation') {
      return null;
    }

    const presentationSlide = slideAction.ActionTypeData.value.Slide.value;
    const baseSlide = presentationSlide.baseSlide;

    if (!baseSlide) {
      return null;
    }

    // Extract text elements from the slide
    const textElements = this.extractTextElements(baseSlide);

    return {
      backgroundColor: this.convertColor(baseSlide.backgroundColor),
      chordChartPath: presentationSlide.chordChart?.RelativeFilePath.value?.path ?? '',
      drawingBackgroundColor: baseSlide.drawsBackgroundColor ?? false,
      enabled: cue.isEnabled ?? true,
      hotKey: cue.hotKey?.controlIdentifier ?? '',
      id: cue.uuid?.string ?? '',
      label: cue.name ?? '',
      notes: this.extractNotesText(presentationSlide.notes),
      textElements,
    };
  }

  private extractTextElements(slide: Slide): IPro7SlideTextElement[] {
    const textElements: IPro7SlideTextElement[] = [];

    for (const element of slide.elements) {
      if (!element.element?.text) {
        continue; // Skip non-text elements
      }

      const graphicsElement = element.element;
      const textData = element.element?.text;

      // Extract plain text from RTF data
      const rtfString = this.convertRtfDataToString(textData.rtfData);
      const plainText = Utils.stripRtf(rtfString);

      // Extract font information from text attributes
      const fontInfo = this.extractFontInfo(textData);

      const textElement: IPro7SlideTextElement = {
        adjustsHeightToFit: textData.scaleBehavior === Graphics_Text_ScaleBehavior.ADJUST_CONTAINER_HEIGHT,
        displayDelay: element.buildIn?.delayTime ?? 0,
        displayName: graphicsElement.name ?? 'Default',
        drawingFill: graphicsElement.fill?.enable ?? false,
        fillColor: this.convertColor(
          graphicsElement.fill?.FillType?.case === 'color' ? graphicsElement.fill.FillType.value : undefined
        ),
        fromTemplate: element.info === Slide_Element_Info.IS_TEMPLATE_ELEMENT,
        id: graphicsElement.uuid?.string ?? '',
        locked: graphicsElement.locked ?? false,
        opacity: graphicsElement.opacity ?? 1,
        revealType: element.revealType ?? 0,
        rotation: graphicsElement.rotation ?? 0,
        verticalAlignment: textData.verticalAlignment ?? 0,

        // Font information
        fontName: fontInfo.fontName,
        textColor: fontInfo.textColor,
        textSize: fontInfo.textSize,

        // Text content
        plainText,
        rtfData: rtfString,

        // Other properties
        outline: this.convertStrokeToOutline(graphicsElement.stroke),
        position: this.convertRectToPosition(graphicsElement.bounds),
        textShadow: this.convertShadowToTextShadow(graphicsElement.shadow),
      };

      textElements.push(textElement);
    }

    return textElements;
  }

  private extractNotesText(notes: PresentationSlide['notes']): string {
    if (!notes) return '';
    return Utils.stripRtf(this.convertRtfDataToString(notes.rtfData));
  }

  private extractFontInfo(textData: Graphics_Text): {
    fontName: string;
    textColor: { r: number; g: number; b: number };
    textSize: number;
  } {
    const attributes = textData.attributes;

    return {
      fontName: attributes?.font?.name ?? 'Arial',
      textColor: this.convertColor(attributes?.fill?.case === 'textSolidFill' ? attributes.fill.value : undefined),
      textSize: attributes?.font?.size ?? 12,
    };
  }

  private convertRtfDataToString(rtfData: Uint8Array | undefined): string {
    if (!rtfData || rtfData.length === 0) {
      return '';
    }

    try {
      return new TextDecoder('utf-8').decode(rtfData);
    } catch (error) {
      console.warn('Failed to convert RTF data to string:', error);
      return '';
    }
  }

  private convertStrokeToOutline(stroke: Graphics_Stroke | undefined): IProElementOutline {
    return {
      enabled: stroke?.enable ?? false,
      color: this.convertColor(stroke?.color),
      size: stroke?.width ?? 0,
    };
  }

  private convertRectToPosition(bounds: Graphics_Rect | undefined): IProElementPosition {
    return {
      x: bounds?.origin?.x ?? 0,
      y: bounds?.origin?.y ?? 0,
      z: 0, // Not available
      width: bounds?.size?.width ?? 0,
      height: bounds?.size?.height ?? 0,
    };
  }

  private convertShadowToTextShadow(shadow: Graphics_Shadow | undefined): IProElementShadow {
    if (!shadow) {
      return {
        enabled: false,
        color: { r: 0, g: 0, b: 0 },
        angle: 135,
        length: 0,
        radius: 0,
      };
    }

    return {
      enabled: shadow.enable ?? false,
      color: this.convertColor(shadow.color),
      angle: shadow.angle ?? 135,
      length: shadow.offset ?? 0,
      radius: shadow.radius ?? 0,
    };
  }

  private getArrangements(presentation: Presentation, slideGroups: IPro7SlideGroup[]): IPro7Arrangement[] {
    const arrangements: IPro7Arrangement[] = [];

    for (const arrangement of presentation.arrangements) {
      const groupOrder: IPro7ArrangementSlideGroup[] = [];

      for (const groupId of arrangement.groupIdentifiers) {
        const group = slideGroups.find((g) => g.groupId === groupId.string);
        if (group) {
          groupOrder.push({
            groupId: group.groupId,
            groupLabel: group.groupLabel,
          });
        }
      }

      arrangements.push({
        label: arrangement.name ?? '',
        groupOrder,
      });
    }

    return arrangements;
  }

  private convertColor(color: Color | undefined): { r: number; g: number; b: number } {
    if (!color) {
      return { r: 0, g: 0, b: 0 };
    }

    return {
      r: Math.round((color.red ?? 0) * 255),
      g: Math.round((color.green ?? 0) * 255),
      b: Math.round((color.blue ?? 0) * 255),
    };
  }

  private convertTimestamp(timestamp: Timestamp | undefined): Date {
    if (!timestamp) {
      return new Date();
    }

    const seconds = Number(timestamp.seconds ?? 0);
    const nanos = Number(timestamp.nanos ?? 0);
    return new Date(seconds * 1000 + nanos / 1000000);
  }
}
