import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import Card from "@/components/Card/Card";

const renderComponent = (props: CardProps): CardComponent => {
  const container = Card(props);
  document.body.appendChild(container);
  return container;
};

describe("Card Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: CardProps = {
    imgSrc: "/images/nature.jpg",
    title: "Beautiful Nature",
    isActive: false,
    onClick: mockOnClick,
  };

  it("should render card with correct structure", () => {
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card");
    expect(card).toBeInTheDocument();
  });

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Beautiful Nature");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/nature.jpg");
    expect(image).toHaveClass("card__img");
  });

  it("should render title", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Beautiful Nature")).toBeInTheDocument();
  });

  it("should apply active class when isActive is true", () => {
    const activeProps: CardProps = {
      ...defaultProps,
      isActive: true,
    };

    renderComponent(activeProps);

    const card = document.querySelector<HTMLDivElement>(".card");
    expect(card).toHaveClass("card", "card--touched");
  });

  it("should not apply active class when isActive is false", () => {
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card");
    expect(card).toHaveClass("card");
    expect(card).not.toHaveClass("card--touched");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const card = document.querySelector<HTMLDivElement>(".card");
    if (card) await user.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const card = renderComponent(defaultProps);

    card.cleanup?.();

    const cardElement = document.querySelector<HTMLDivElement>(".card");
    if (cardElement) await user.click(cardElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
