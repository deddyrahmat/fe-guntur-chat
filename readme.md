# Setup Template Reactjs + Typescript
Template starter project with react js. This project has build with [Vitejs](https://vitejs.dev/).

## Package
### Tools Consistency Code (devDependencies)
1. eslint
2. eslint-config-airbnb (includes packages: eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y)
    
    - (eslint-config-airbnb/hooks)
    This entry point enables the linting rules for React hooks (requires v16.8+). To use, add "extends": ["airbnb", "airbnb/hooks"] to your .eslintrc.

3. @typescript-eslint/eslint-plugin
4. @typescript-eslint/parser
5. eslint-config-airbnb-typescript

    - (include .eslintrc.cjs at tsconfig.json)
    add new array .eslintrc.cjs and vite.config.ts at file tsconfig.json after src

6. eslint-config-prettier
7. eslint-plugin-prettier
8. prettier

    - create file .prettierrc.cjs and setup basic configuration file use module
    - add "prettier" at file eslintrc.cjs plugins array and add 'plugin:prettier/recommended' at extend


### Routing
1. react-router-dom

### Testing(devDependencies)
1. vitest(includes : @vitejs/plugin-react)
2. jsdom
3. @testing-library/jest-dom(includes : @testing-library/react)

    - check in github example react-testing-lib-msw and copy vite.config.ts. also add reference
    - add file setupTest.ts at file vite.config.ts and add [config](https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/)
    - add script "test" : "vitest"
