import normalizeData from '../../../client/utils/normalizeData';

describe('Function normalizeData works as expected', () => {
  it('Correctly normalizes the given data ', () => {
    const superheroes = [
      {
        id: 1,
        name: 'The Homelander',
        power: ['Too much'],
      },
      {
        id: 2,
        name: 'Black Noir',
        power: ['Super strength', 'Great Pilot'],
      },
      {
        id: 3,
        name: 'Queen Maeve',
        powers: ['Super-strength', 'Flight', 'Invulnerability'],
      },
    ];

    const { allIds, dataById } = normalizeData(superheroes);

    const expectedIds = [1, 2, 3];
    const expectedDataById = {
      1: superheroes[0],
      2: superheroes[1],
      3: superheroes[2],
    };

    expect(allIds).toEqual(expectedIds);
    expect(dataById).toEqual(expectedDataById);
  });
});
