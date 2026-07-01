module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',      // new feature
        'fix',       // bug fix
        'docs',      // documentation only
        'style',     // formatting changes
        'refactor',  // code refactoring without feature/fix
        'perf',      // performance improvements
        'test',      // adding or updating tests
        'chore',     // build, deps, tooling
        'ci',        // CI/CD configuration
        'revert',    // revert previous commit
      ],
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lowercase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', ['uppercase']],
    'header-max-length': [2, 'always', 100],
  },
};
