import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import Card from "@/components/Card/Card";

const mockOnClick = jest.fn();

const defaultProps: CardProps = {
  imgSrc: "/images/test.jpg",
  title: "Test Card",
  isActive: false,
  onClick: mockOnClick,
};

const renderComponent = (props: Partial<CardProps> = {}): CardComponent => {
  const element = Card({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Card", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a div with role button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should have tabindex 0", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("tabindex", "0");
    });

    it("should have the correct aria-label", () => {
      renderComponent({ title: "Mountain" });
      expect(
        screen.getByRole("button", { name: "Expand card: Mountain" })
      ).toBeInTheDocument();
    });

    it("should have class card when isActive is false", () => {
      renderComponent({ isActive: false });
      const card = screen.getByRole("button");
      expect(card).toHaveClass("card");
      expect(card).not.toHaveClass("card--touched");
    });

    it("should have class card--touched when isActive is true", () => {
      renderComponent({ isActive: true });
      expect(screen.getByRole("button")).toHaveClass("card--touched");
    });

    it("should render an img with the correct src", () => {
      renderComponent({ imgSrc: "/images/hero.jpg" });
      const img = document.querySelector<HTMLImageElement>(".card__img");
      expect(img).toHaveAttribute("src", "/images/hero.jpg");
    });

    it("should render an img with the correct alt text", () => {
      renderComponent({ title: "Forest" });
      const img = document.querySelector<HTMLImageElement>(".card__img");
      expect(img).toHaveAttribute("alt", "Forest");
    });

    it("should render an h3 with the title", () => {
      renderComponent({ title: "Ocean" });
      expect(
        screen.getByRole("heading", { level: 3, hidden: true })
      ).toHaveTextContent("Ocean");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });
  });

  describe("cleanup", () => {
    it("should remove the click listener after cleanup", async () => {
      const user = userEvent.setup();
      const card = renderComponent();
      card.cleanup?.();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
