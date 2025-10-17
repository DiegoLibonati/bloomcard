import { CardProps } from "@src/entities/props";

import "@src/components/Card/Card.css";

export const Card = ({
  imgSrc,
  title,
  isActive,
  onClick,
}: CardProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = `card ${isActive && "card--touched"}`;

  divRoot.innerHTML = `
    <img
        src="${imgSrc}"
        alt="${title}"
        class="card__img"
    />
    <h3 class="card__title">${title}</h3>
  `;

  divRoot.addEventListener("click", onClick);

  return divRoot;
};
