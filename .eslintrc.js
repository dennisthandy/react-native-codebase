module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
};
