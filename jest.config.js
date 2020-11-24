module.exports = {
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    'isomorphic-style-loader/withStyles': '<rootDir>/tools/mocks/withStyles.js',
  },
};
