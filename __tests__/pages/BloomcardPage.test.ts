import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import BloomcardPage from "@/pages/BloomcardPage/BloomcardPage";

const renderPage = (): Page => {
  const element = BloomcardPage();
  document.body.appendChild(element);
  return element;
};

describe("BloomcardPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      renderPage();
      expect(document.querySelector("main")).toBeInTheDocument();
    });

    it("should have class bloomcard-page", () => {
      renderPage();
      expect(document.querySelector("main")).toHaveClass("bloomcard-page");
    });

    it("should render a section with aria-label Image gallery", () => {
      renderPage();
      expect(
        screen.getByRole("region", { name: "Image gallery" })
      ).toBeInTheDocument();
    });

    it("should render a card for each image", () => {
      renderPage();
      expect(screen.getAllByRole("button")).toHaveLength(4);
    });

    it("should set the first card as active", () => {
      renderPage();
      expect(screen.getAllByRole("button")[0]!).toHaveClass("card--touched");
    });

    it("should not set other cards as active initially", () => {
      renderPage();
      screen
        .getAllByRole("button")
        .slice(1)
        .forEach((card) => {
          expect(card).not.toHaveClass("card--touched");
        });
    });
  });

  describe("behavior", () => {
    it("should expand a card when clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      const cards = screen.getAllByRole("button");
      await user.click(cards[1]!);
      expect(cards[1]!).toHaveClass("card--touched");
    });

    it("should collapse the previously active card when another is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      const cards = screen.getAllByRole("button");
      await user.click(cards[1]!);
      expect(cards[0]!).not.toHaveClass("card--touched");
    });

    it("should keep only one card active at a time", async () => {
      const user = userEvent.setup();
      renderPage();
      const cards = screen.getAllByRole("button");
      await user.click(cards[2]!);
      expect(document.querySelectorAll(".card--touched")).toHaveLength(1);
    });

    it("should re-activate the same card when clicked while active", async () => {
      const user = userEvent.setup();
      renderPage();
      const cards = screen.getAllByRole("button");
      await user.click(cards[0]!);
      expect(cards[0]!).toHaveClass("card--touched");
    });
  });

  describe("cleanup", () => {
    it("should remove click listeners from all cards after cleanup", async () => {
      const user = userEvent.setup();
      const page = renderPage();
      page.cleanup?.();
      const cards = screen.getAllByRole("button");
      await user.click(cards[1]!);
      expect(cards[1]!).not.toHaveClass("card--touched");
    });
  });
});
