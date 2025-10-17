import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ExpandingCardsPage } from "@src/pages/ExpandingCardsPage/ExpandingCardsPage";

import images from "@src/constants/images";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = ExpandingCardsPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/constants/images", () => [
  { src: "/image1.jpg", title: "Image 1" },
  { src: "/image2.jpg", title: "Image 2" },
  { src: "/image3.jpg", title: "Image 3" },
  { src: "/image4.jpg", title: "Image 4" },
]);

describe("ExpandingCardsPage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("expanding-cards-page");
      expect(container.querySelector(".cards")).toBeInTheDocument();
    });

    test("It should render cards section with list", () => {
      renderComponent();

      const cardsSection = document.querySelector(".cards");
      const cardsList = document.querySelector(".cards__list");

      expect(cardsSection).toBeInTheDocument();
      expect(cardsList).toBeInTheDocument();
    });

    test("It should render article element for cards list", () => {
      renderComponent();

      const cardsList = document.querySelector(".cards__list");

      expect(cardsList).toBeInstanceOf(HTMLElement);
      expect(cardsList?.tagName).toBe("ARTICLE");
    });
  });

  describe("Cards Rendering Tests.", () => {
    test("It should render all cards from images array", () => {
      renderComponent();

      const cards = document.querySelectorAll(".card");

      expect(cards.length).toBe(images.length);
      expect(cards.length).toBe(4);
    });

    test("It should render cards with correct titles", () => {
      renderComponent();

      images.forEach((image) => {
        const title = screen.getByText(image.title);
        expect(title).toBeInTheDocument();
      });
    });

    test("It should render cards with correct images", () => {
      renderComponent();

      images.forEach((image) => {
        const img = screen.getByAltText(image.title) as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(image.src);
      });
    });

    test("It should append all cards to cards list", () => {
      renderComponent();

      const cardsList = document.querySelector(".cards__list");
      const cards = cardsList?.querySelectorAll(".card");

      expect(cards?.length).toBe(images.length);
    });
  });

  describe("Initial Active State Tests.", () => {
    test("It should have first card active by default", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const firstCard = cards[0];

      expect(firstCard).toHaveClass("card--touched");
    });

    test("It should have only first card with active class", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const activeCards = document.querySelectorAll(".card--touched");

      expect(activeCards.length).toBe(1);
      expect(cards[0]).toHaveClass("card--touched");
    });

    test("It should not have active class on other cards initially", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      for (let i = 1; i < cards.length; i++) {
        expect(cards[i]).not.toHaveClass("card--touched");
      }
    });
  });

  describe("Card Expansion Tests.", () => {
    test("It should expand card when clicked", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const secondCard = cards[1];

      await user.click(secondCard);

      expect(secondCard).toHaveClass("card--touched");
    });

    test("It should remove active class from previously active card", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const firstCard = cards[0];
      const secondCard = cards[1];

      expect(firstCard).toHaveClass("card--touched");

      await user.click(secondCard);

      expect(firstCard).not.toHaveClass("card--touched");
      expect(secondCard).toHaveClass("card--touched");
    });

    test("It should maintain only one active card at a time", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      await user.click(cards[2]);

      const activeCards = document.querySelectorAll(".card--touched");
      expect(activeCards.length).toBe(1);
    });

    test("It should handle multiple card clicks", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      await user.click(cards[1]);
      expect(cards[1]).toHaveClass("card--touched");

      await user.click(cards[2]);
      expect(cards[2]).toHaveClass("card--touched");
      expect(cards[1]).not.toHaveClass("card--touched");

      await user.click(cards[3]);
      expect(cards[3]).toHaveClass("card--touched");
      expect(cards[2]).not.toHaveClass("card--touched");
    });
  });

  describe("Click Event Handling Tests.", () => {
    test("It should attach click event to all cards", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      for (const card of cards) {
        await user.click(card);
        expect(card).toHaveClass("card--touched");
      }
    });

    test("It should transfer active state between cards", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      await user.click(cards[3]);
      expect(cards[0]).not.toHaveClass("card--touched");
      expect(cards[3]).toHaveClass("card--touched");

      await user.click(cards[0]);
      expect(cards[3]).not.toHaveClass("card--touched");
      expect(cards[0]).toHaveClass("card--touched");
    });

    test("It should handle clicking the same card twice", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      await user.click(cards[2]);
      expect(cards[2]).toHaveClass("card--touched");

      await user.click(cards[2]);
      expect(cards[2]).toHaveClass("card--touched");

      const activeCards = document.querySelectorAll(".card--touched");
      expect(activeCards.length).toBe(1);
    });
  });

  describe("Images Array Integration Tests.", () => {
    test("It should create cards based on images array length", () => {
      renderComponent();

      const cards = document.querySelectorAll(".card");

      expect(cards.length).toBe(images.length);
    });

    test("It should render cards in correct order", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      cards.forEach((card, index) => {
        const title = card.querySelector(".card__title");
        expect(title?.textContent).toBe(images[index].title);
      });
    });

    test("It should apply isActive only to first card (index 0)", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      expect(cards[0]).toHaveClass("card--touched");

      for (let i = 1; i < cards.length; i++) {
        expect(cards[i]).not.toHaveClass("card--touched");
      }
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should nest cards inside cards list", () => {
      renderComponent();

      const cardsList = document.querySelector(".cards__list");
      const cardsInList = cardsList?.querySelectorAll(".card");

      expect(cardsInList?.length).toBe(images.length);
    });

    test("It should nest cards list inside cards section", () => {
      renderComponent();

      const cardsSection = document.querySelector(".cards");
      const cardsList = cardsSection?.querySelector(".cards__list");

      expect(cardsList).toBeInTheDocument();
    });

    test("It should maintain proper HTML structure", () => {
      const { container } = renderComponent();

      const main = container;
      const section = main.querySelector(".cards");
      const article = section?.querySelector(".cards__list");
      const cards = article?.querySelectorAll(".card");

      expect(main.tagName).toBe("MAIN");
      expect(section?.tagName).toBe("SECTION");
      expect(article?.tagName).toBe("ARTICLE");
      expect(cards?.length).toBeGreaterThan(0);
    });
  });

  describe("Card Component Props Tests.", () => {
    test("It should pass correct props to Card component", () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      cards.forEach((card, index) => {
        const img = card.querySelector(".card__img") as HTMLImageElement;
        const title = card.querySelector(".card__title");

        expect(img.src).toContain(images[index].src);
        expect(title?.textContent).toBe(images[index].title);

        if (index === 0) {
          expect(card).toHaveClass("card--touched");
        } else {
          expect(card).not.toHaveClass("card--touched");
        }
      });
    });

    test("It should pass onClick handler to all cards", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      for (let i = 0; i < cards.length; i++) {
        await user.click(cards[i]);
        expect(cards[i]).toHaveClass("card--touched");
      }
    });
  });

  describe("Expand Card Function Tests.", () => {
    test("It should query for currently active card before expanding new one", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");

      expect(cards[0]).toHaveClass("card--touched");

      await user.click(cards[1]);

      const activeCard = document.querySelector(".card--touched");
      expect(activeCard).toBe(cards[1]);
    });

    test("It should add card--touched class to clicked card", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const targetCard = cards[2];

      expect(targetCard).not.toHaveClass("card--touched");

      await user.click(targetCard);

      expect(targetCard).toHaveClass("card--touched");
    });

    test("It should remove card--touched class from previous card", async () => {
      renderComponent();

      const cards = document.querySelectorAll<HTMLDivElement>(".card");
      const firstCard = cards[0];
      const thirdCard = cards[2];

      expect(firstCard).toHaveClass("card--touched");

      await user.click(thirdCard);

      expect(firstCard).not.toHaveClass("card--touched");
    });
  });
});
