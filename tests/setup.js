import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matcher from '@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
