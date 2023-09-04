import { cleanup } from "@testing-library/react";
import { expect } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers)

afterEach(() => {
    cleanup()
})