const fs = require('node:fs');
const path = require('node:path');

const apps = fs.readdirSync(path.resolve(__dirname, 'apps'));
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));
const configs = fs.readdirSync(path.resolve(__dirname, 'packages/configs'));

/** @type {import("cz-git").UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-min-length': [2, 'always', 2],
    'subject-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['repo', ...apps, ...packages, ...configs]],
  },
  prompt: {
    alias: {
      b: 'chore(repo): :hammer: bump dependencies',
    },
    maxSubjectLength: 100,
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    skipQuestions: ['footer'],
    useEmoji: true,
    enableMultipleScopes: true,
    scopeEnumSeparator: ',',
  },
};
