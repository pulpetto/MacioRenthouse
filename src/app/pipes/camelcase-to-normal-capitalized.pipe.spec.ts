import { CamelcaseToNormalCapitalizedPipe } from './camelcase-to-normal-capitalized.pipe';

describe('CamelcaseToNormalCapitalizedPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelcaseToNormalCapitalizedPipe();
    expect(pipe).toBeTruthy();
  });
});
