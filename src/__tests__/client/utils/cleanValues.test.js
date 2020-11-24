import cleanValues from '../../../client/utils/cleanValues';

describe('Function cleanValues works as expected', () => {
  it('Returns the same valid object as passed ', () => {
    const original = { name: 'Peter', surname: 'Parker' };
    const result = cleanValues(original);

    expect(result).toEqual(original);
  });

  it('Removes undefined values from an object ', () => {
    const original = { name: 'Peter', surname: 'Parker', heroName: undefined };
    const result = cleanValues(original);

    expect(result).toEqual({ name: 'Peter', surname: 'Parker' });
  });

  it('It does not remove falsy values apart from undefined', () => {
    const original = { name: undefined, surname: '', heroName: null, age: 0 };
    const result = cleanValues(original);

    expect(result).toEqual({ surname: '', heroName: null, age: 0 });
  });
});
