import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import "@/components/Card/Card.css";

export const Card = ({
  imgSrc,
  title,
  isActive,
  onClick,
}: CardProps): CardComponent => {
  const divRoot = document.createElement("div") as CardComponent;
  divRoot.className = `card ${isActive ? "card--touched" : ""}`;
  divRoot.setAttribute("role", "button");
  divRoot.setAttribute("tabindex", "0");
  divRoot.setAttribute("aria-label", `Expand card: ${title}`);

  divRoot.innerHTML = `
    <img
        src="${imgSrc}"
        alt="${title}"
        aria-hidden="true"
        class="card__img"
    />
    <h3 class="card__title" aria-hidden="true">${title}</h3>
  `;

  divRoot.addEventListener("click", onClick);

  divRoot.cleanup = (): void => {
    divRoot.removeEventListener("click", onClick);
  };

  return divRoot;
};
