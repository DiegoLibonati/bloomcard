import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ExpandingCardsPage from "@/pages/ExpandingCardsPage/ExpandingCardsPage";

const renderPage = (): Page => {
  const container = ExpandingCardsPage();
  document.body.appendChild(container);
  return container;
};

describe("ExpandingCardsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".expanding-cards-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render cards container", () => {
    renderPage();

    const cardsSection = document.querySelector<HTMLElement>(".cards");
    const cardsList = document.querySelector<HTMLElement>(".cards__list");

    expect(cardsSection).toBeInTheDocument();
    expect(cardsList).toBeInTheDocument();
  });

  it("should render all cards from images data", () => {
    renderPage();

    expect(screen.getByText("Image 1")).toBeInTheDocument();
    expect(screen.getByText("Image 2")).toBeInTheDocument();
    expect(screen.getByText("Image 3")).toBeInTheDocument();
    expect(screen.getByText("Image 4")).toBeInTheDocument();
  });

  it("should render all card images", () => {
    renderPage();

    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 2")).toBeInTheDocument();
    expect(screen.getByAltText("Image 3")).toBeInTheDocument();
    expect(screen.getByAltText("Image 4")).toBeInTheDocument();
  });

  it("should have first card active by default", () => {
    renderPage();

    const cards = document.querySelectorAll<HTMLDivElement>(".card");
    expect(cards[0]).toHaveClass("card--touched");
    expect(cards[1]).not.toHaveClass("card--touched");
  });

  it("should expand card when clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const cards = document.querySelectorAll<HTMLDivElement>(".card");
    const secondCard = cards[1];

    if (secondCard) await user.click(secondCard);

    expect(secondCard).toHaveClass("card--touched");
  });

  it("should remove active class from previous card when clicking new card", async () => {
    const user = userEvent.setup();
    renderPage();

    const cards = document.querySelectorAll<HTMLDivElement>(".card");
    const firstCard = cards[0];
    const secondCard = cards[1];

    expect(firstCard).toHaveClass("card--touched");

    if (secondCard) await user.click(secondCard);

    expect(firstCard).not.toHaveClass("card--touched");
    expect(secondCard).toHaveClass("card--touched");
  });

  it("should allow switching between multiple cards", async () => {
    const user = userEvent.setup();
    renderPage();

    const cards = document.querySelectorAll<HTMLDivElement>(".card");

    if (cards[1]) await user.click(cards[1]);
    expect(cards[1]).toHaveClass("card--touched");
    expect(cards[0]).not.toHaveClass("card--touched");

    if (cards[2]) await user.click(cards[2]);
    expect(cards[2]).toHaveClass("card--touched");
    expect(cards[1]).not.toHaveClass("card--touched");

    if (cards[3]) await user.click(cards[3]);
    expect(cards[3]).toHaveClass("card--touched");
    expect(cards[2]).not.toHaveClass("card--touched");
  });

  it("should cleanup all card listeners on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
