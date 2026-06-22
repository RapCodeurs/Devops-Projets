module.exports = [
  {
    files: ['**/*.js'], // only check .js files in backend directory
    rules: {
      semi: 'error', // enforce semicolons
      'no-unused-vars': 'warn', // warn about unused variables
    },
  },
];
