import filterFalsyValues from '../../../client/utils/filterFalsyValues';

describe('Function filterFalsyValues works as expected', () => {
  it('Returns the same valid object as passed ', () => {
    const original = { name: 'Tony', surname: 'Stark' };
    const result = filterFalsyValues(original);

    expect(result).toEqual(original);
  });

  it('Removes undefined values from an object ', () => {
    const original = { name: 'Tony', surname: 'Stark', heroName: undefined };
    const result = filterFalsyValues(original);

    expect(result).toEqual({ name: 'Tony', surname: 'Stark' });
  });

  it('It does remove falsy values apart from undefined', () => {
    const original = { name: 'Tony', surname: '', heroName: null, age: 0 };
    const result = filterFalsyValues(original);

    expect(result).toEqual({ name: 'Tony' });
  });
});
