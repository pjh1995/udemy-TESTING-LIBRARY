// https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/src/test/setup.ts
import '@testing-library/jest-dom';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

// API mocking 전 해야할 작업
beforeAll(() => server.listen());

// 각 테스트 간의 핸들러를 리셋함
afterEach(() => server.resetHandlers());

// 테스트 후 server close
afterAll(() => server.close());
