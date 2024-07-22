export default {
  // Type check TypeScript files
  '(apps|packages|tooling)/**/*.(ts|tsx)': () => 'pnpm typecheck',
  // Lint files
  '(apps|packages|tooling)/**/*.(ts|tsx|js|jsx)': (files) =>
    `pnpm eslint ${files.join(' ')}`,
  '*.(ts|tsx|js|jsx|cjs|mjs|json|md|mdx)': (files) =>
    `pnpm prettier -uc ${files.join(' ')}`,
};
