import { v5Builder } from './v5-builder';

describe('v5Builder', (): void => {
  let builder: v5Builder;

  beforeEach(() => {
    builder = new v5Builder();
  });

  it('should exist', () => {
    expect(builder).toBeDefined();
  });
});
