# Setup Template Reactjs + Typescript

Template starter project with react js. This project has build with [Vitejs](https://vitejs.dev/).

## Package

### Tools Consistency Code (devDependencies)

1. eslint (check documentation for rules installation)
2. eslint-config-airbnb (includes packages: eslint, eslint-plugin-import, eslint-plugin-react, eslint-plugin-react-hooks, and eslint-plugin-jsx-a11y)

    - check documentation for rules installation
    - (eslint-config-airbnb/hooks)
      This entry point enables the linting rules for React hooks (requires v16.8+). To use, add "extends": ["airbnb", "airbnb/hooks"] to your .eslintrc.

3. eslint-config-airbnb-typescript(includes : @typescript-eslint/eslint-plugin and @typescript-eslint/parser )

    - (add new array at include section file tsconfig.json)
      add new array .eslintrc.cjs and vite.config.ts at file tsconfig.json after src

4. prettier eslint-config-prettier eslint-plugin-prettier (install 3 package)

    - create file .prettierrc.cjs and setup basic configuration file use module
    - add "prettier" at file eslintrc.cjs plugins array and change 'eslint:recommended' to 'plugin:prettier/recommended' at extend

if you want to check detail configuration, you can check [here](https://blog.logrocket.com/linting-typescript-eslint-prettier/)

### Routing

1. react-router-dom

### Testing(devDependencies)

1. vitest(includes : @vitejs/plugin-react)
2. jsdom
3. @testing-library/jest-dom(includes : @testing-library/react)

    - check in github example react-testing-lib-msw and copy vite.config.ts. also add reference tag, check in [here](https://vitest.dev/guide/)
    - at file setupTest.ts, add [config](https://markus.oberlehner.net/blog/using-testing-library-jest-dom-with-vitest/)
    - add script "test" : "vitest" at package.json
