import stringIncludes from '../../../client/utils/stringIncludes';

describe('Function stringIncludes works as expected', () => {
  it('Correctly compares the same string ', () => {
    const original = 'Superman';
    const compared = 'Superman';

    const result = stringIncludes(original, compared);
    expect(result).toBe(true);
  });

  it('Compares the same string with different casing and trims it', () => {
    const original = '  Solid Snake';
    const compared = 'sOLid Snake  ';

    const result = stringIncludes(original, compared);
    expect(result).toBe(true);
  });

  it('It results false when comparing completely different strings', () => {
    const original = 'With great power';
    const compared = 'comes great responsibility';

    const result = stringIncludes(original, compared);
    expect(result).toBe(false);
  });
});
