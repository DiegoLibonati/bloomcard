import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Card } from "@src/components/Card/Card";

import { CardProps } from "@src/entities/props";

type RenderComponent = {
  container: HTMLDivElement;
  props: CardProps;
};

const renderComponent = (props: CardProps): RenderComponent => {
  const container = Card(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("Card.ts", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: CardProps = {
        imgSrc: "/test-image.jpg",
        title: "Test Card",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("card");
    });

    test("It should render all required elements", () => {
      const props: CardProps = {
        imgSrc: "/test-image.jpg",
        title: "Test Card",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = screen.getByAltText("Test Card");
      const title = screen.getByText("Test Card");

      expect(img).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    test("It should have correct CSS classes", () => {
      const props: CardProps = {
        imgSrc: "/test-image.jpg",
        title: "Test Card",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector(".card__img");
      const title = document.querySelector(".card__title");

      expect(img).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    test("It should return HTMLDivElement", () => {
      const props: CardProps = {
        imgSrc: "/test-image.jpg",
        title: "Test Card",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should display the correct title", () => {
      const props: CardProps = {
        imgSrc: "/test-image.jpg",
        title: "My Test Title",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = screen.getByText("My Test Title");

      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe("My Test Title");
    });

    test("It should render image with correct src", () => {
      const props: CardProps = {
        imgSrc: "/images/card.png",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = screen.getByAltText("Test") as HTMLImageElement;

      expect(img.src).toContain("/images/card.png");
    });

    test("It should render image with correct alt text from title", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Alternative Text",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = screen.getByAltText("Alternative Text");

      expect(img).toHaveAttribute("alt", "Alternative Text");
    });

    test("It should render h3 element for title", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Heading Title",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = document.querySelector(
        ".card__title"
      ) as HTMLHeadingElement;

      expect(title).toBeInstanceOf(HTMLHeadingElement);
      expect(title.tagName).toBe("H3");
    });
  });

  describe("isActive State Tests.", () => {
    test("It should not have 'card--touched' class when isActive is false", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("card");
      expect(container).not.toHaveClass("card--touched");
    });

    test("It should have 'card--touched' class when isActive is true", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: true,
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.className).toContain("card--touched");
      expect(container).toHaveClass("card");
      expect(container).toHaveClass("card--touched");
    });

    test("It should toggle class based on isActive prop", () => {
      const propsInactive: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container: inactiveCard } = renderComponent(propsInactive);
      expect(inactiveCard).not.toHaveClass("card--touched");

      document.body.innerHTML = "";

      const propsActive: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: true,
        onClick: mockOnClick,
      };

      const { container: activeCard } = renderComponent(propsActive);
      expect(activeCard).toHaveClass("card--touched");
    });
  });

  describe("Click Event Tests.", () => {
    test("It should call onClick handler when card is clicked", async () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should call onClick handler multiple times on multiple clicks", async () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      await user.click(container);
      await user.click(container);
      await user.click(container);

      expect(componentProps.onClick).toHaveBeenCalledTimes(3);
    });

    test("It should attach click event listener to card element", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      const { container, props: componentProps } = renderComponent(props);

      const clickEvent = new MouseEvent("click", { bubbles: true });
      container.dispatchEvent(clickEvent);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should work with different onClick handlers", async () => {
      const firstClickHandler = jest.fn();
      const secondClickHandler = jest.fn();

      const props1: CardProps = {
        imgSrc: "/test.jpg",
        title: "First Card",
        isActive: false,
        onClick: firstClickHandler,
      };

      const { container: card1, props: props1Component } =
        renderComponent(props1);
      await user.click(card1);

      document.body.innerHTML = "";

      const props2: CardProps = {
        imgSrc: "/test.jpg",
        title: "Second Card",
        isActive: false,
        onClick: secondClickHandler,
      };

      const { container: card2, props: props2Component } =
        renderComponent(props2);
      await user.click(card2);

      expect(props1Component.onClick).toHaveBeenCalledTimes(1);
      expect(props2Component.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Different Image Sources Tests.", () => {
    test("It should handle relative image paths", () => {
      const props: CardProps = {
        imgSrc: "./images/test.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector(".card__img") as HTMLImageElement;

      expect(img.src).toContain("images/test.jpg");
    });

    test("It should handle absolute image paths", () => {
      const props: CardProps = {
        imgSrc: "/assets/images/card.png",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector(".card__img") as HTMLImageElement;

      expect(img.src).toContain("/assets/images/card.png");
    });

    test("It should handle external image URLs", () => {
      const props: CardProps = {
        imgSrc: "https://example.com/image.jpg",
        title: "Test",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector(".card__img") as HTMLImageElement;

      expect(img.src).toBe("https://example.com/image.jpg");
    });
  });

  describe("Multiple Cards Tests.", () => {
    test("It should render multiple cards independently", () => {
      const props1: CardProps = {
        imgSrc: "/card1.jpg",
        title: "Card 1",
        isActive: false,
        onClick: jest.fn(),
      };

      const props2: CardProps = {
        imgSrc: "/card2.jpg",
        title: "Card 2",
        isActive: true,
        onClick: jest.fn(),
      };

      renderComponent(props1);
      renderComponent(props2);

      const card1 = screen.getByText("Card 1");
      const card2 = screen.getByText("Card 2");
      const allCards = document.querySelectorAll(".card");

      expect(card1).toBeInTheDocument();
      expect(card2).toBeInTheDocument();
      expect(allCards.length).toBe(2);
    });

    test("It should handle different active states for multiple cards", () => {
      const props1: CardProps = {
        imgSrc: "/card1.jpg",
        title: "Active Card",
        isActive: true,
        onClick: jest.fn(),
      };

      const props2: CardProps = {
        imgSrc: "/card2.jpg",
        title: "Inactive Card",
        isActive: false,
        onClick: jest.fn(),
      };

      const { container: card1 } = renderComponent(props1);
      const { container: card2 } = renderComponent(props2);

      expect(card1).toHaveClass("card--touched");
      expect(card2).not.toHaveClass("card--touched");
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty title", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = document.querySelector(".card__title");

      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe("");
    });

    test("It should handle special characters in title", () => {
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: "Test & Title <3>",
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = document.querySelector(".card__title");

      expect(title?.textContent).toBe("Test & Title <3>");
    });

    test("It should handle long titles", () => {
      const longTitle = "This is a very long title that might break the layout";
      const props: CardProps = {
        imgSrc: "/test.jpg",
        title: longTitle,
        isActive: false,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = screen.getByText(longTitle);

      expect(title).toBeInTheDocument();
    });
  });
});
