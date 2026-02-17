import "@testing-library/jest-dom";

import { mockImages } from "@tests/__mocks__/images.mock";

jest.mock("@/constants/images", () => ({
  __esModule: true,
  default: mockImages,
}));
