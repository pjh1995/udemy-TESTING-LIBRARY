# Starter with Vite, React Testing Library and Vitest

Created for the Udemy course [React Testing Library with Jest / Vitest](https://www.udemy.com/course/react-testing-library)

## How this project was created

This project was created using this command:

```sh
npm create vite@latest vite-starter -- --template react
```

and then following all of the steps below.

I also removed a few unnecessary files, and updated

- App.jsx
- this README file 😄

## Installing Vitest and React Testing Library in a Vite project

### Install dependencies

```sh
npm install -D vitest @vitest/ui eslint-plugin-vitest
npm install -D jsdom @testing-library/jest-dom @testing-library/react
```

## Add test script to package.json `test` object

```json
  "test": "vitest --watch",
```

## Add a setup file

To make [jest-dom matchers](https://github.com/testing-library/jest-dom#custom-matchers) available in all test files:

1. create new file _src/setupTests.js_
1. add these contents:

```js
import '@testing-library/jest-dom';
```

## Add Vitest plugin to ESLint

This step avoids linting errors when using the `test` and `expect` Vitest globals without importing them first.

In _.eslintrc.cjs_:

1. Add this to to the `extends` array:

```js
   'plugin:vitest/recommended',
```

1. This step avoids linting errors when using the `test` and `expect` Vitest globals without importing them first.

At the top, require the Vitest plugin:

```js
const vitest = require('eslint-plugin-vitest');
```

Then Add this property / value to the top-level `module.exports` object:

```js
    globals: {
      ...vitest.environments.env.globals,
    },
```

## Update a few ESLint rules

Add these to the `rules` object in _.eslintrc.cjs_:

```js
    "no-unused-vars": "warn", // warning, not error
    "vitest/expect-expect": "off", // eliminate distracting red squiggles while writing tests
    "react/prop-types": "off", // turn off props validation
```

**Note**: if you're having issues getting ESLint to work properly with VSCode, please see [this troubleshooting guide](https://dev.to/bonnie/eslint-prettier-and-vscode-troubleshooting-ljh).

## Update vite configuration for tests

Update _vite.config.js_ based on the [Vitest Testing Library example](https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts). Add this property / value to the `defineConfig` argument:

```js
  test: {
    globals: true,
    environment: "jsdom",
    // this points to the setup file that we created earlier
    setupFiles: "./src/setup.js",
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here becasue often people want to parse CSS in tests.
    css: true,
  },
```

## Command to run tests

```sh
npm test
```

## Reference

- [creating a Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Vitest Testing Library example](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
- [Vitest ESLint plugin](https://www.npmjs.com/package/eslint-plugin-vitest)

## Summary

- Section 2

  - fireEvent
  - matcher
    - toBeEnabled: 특정 요소가 활성화 되어있는지 확인
    - toBeDisabled: 특정 요소가 disabled 상태인지 확인
    - toBeDisabled: 특정 요소가 checked 상태인지 확인
  - query : 페이지의 요소를 찾는 데 제공하는 방법입니다.
    - [query methods](https://testing-library.com/docs/queries/about/#priority)
    - getByRole
      - [role 리스트](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles)
      - name 옵션: aria-label, aria-labelledby, 내부 텍스트 콘텐츠를 기준으로 필터링
  - describe : group test를 위한 함수
  - unit test
  - [잘못된 추상화보다는 복제를 선호](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)

- Section 4

  - 강의 예제 : checkbox가 버튼의 활성화 여부를 제어하는 플로우 테스트 방법
  - userEvent와 fireEvent의 차이
    - fireEvent는 이벤트를 세부적으로 제어할 수 있는 기능을 제공합니다. (ex. 개발자 도구의 force element state)
    - userEvent는 더 높은 수준의 API로, 사용자의 실제 동작을 시뮬레이션하는 데 중점을 둡니다.
  - userEvent
    - user 인스턴스의 생성이 필요함 `user = userEvent.setup()`
    - 해당 user로 가져온 모든 메서드는 promise를 반환한다. `await user.click(checkboxEl);`
  - 사용한 methods
    - user.hover
    - user.unhover
  - 사용한 screen query, matcher
    - queryByText: text를 기반으로 screen에서 원하는 Element를 검색함
    - toBeInTheDocuement: 특정 요소가 문서 내에 존재하는지를 확인

- Section 5
  - msw: Mock Service Worker의 약자로, 네트워크 요청을 가로채고 모킹(Mocking)하는 도구입니다
