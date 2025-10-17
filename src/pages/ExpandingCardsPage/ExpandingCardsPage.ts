import { Card } from "@src/components/Card/Card";

import images from "@src/constants/images";

import "@src/pages/ExpandingCardsPage/ExpandingCardsPage.css";

const expandCard = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLDivElement;

  const cardOpen = document.querySelector<HTMLDivElement>(".card--touched");

  cardOpen!.classList.remove("card--touched");
  target?.classList.add("card--touched");
};

export const ExpandingCardsPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "expanding-cards-page";

  main.innerHTML = `
    <section class="cards">
        <article class="cards__list"></article>
    </section>
  `;

  const cardList = main.querySelector<HTMLElement>(".cards__list");

  images.forEach((image, i) => {
    const card = Card({
      imgSrc: image.src,
      title: image.title,
      isActive: i === 0,
      onClick: (e) => expandCard(e),
    });

    cardList?.append(card);
  });

  return main;
};
