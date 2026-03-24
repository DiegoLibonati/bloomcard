import type { Page } from "@/types/pages";
import type { CardComponent } from "@/types/components";

import { Card } from "@/components/Card/Card";

import images from "@/constants/images";

import "@/pages/ExpandingCardsPage/ExpandingCardsPage.css";

export const ExpandingCardsPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "expanding-cards-page";

  main.innerHTML = `
    <section class="cards" aria-label="Image gallery">
        <article class="cards__list" aria-label="Gallery cards"></article>
    </section>
  `;

  const cardList = main.querySelector<HTMLElement>(".cards__list");

  const expandCard = (e: MouseEvent): void => {
    const target = e.currentTarget as HTMLDivElement;

    const cardOpen = main.querySelector<HTMLDivElement>(".card--touched");

    if (cardOpen) {
      cardOpen.classList.remove("card--touched");
    }

    target.classList.add("card--touched");
  };

  const cards: CardComponent[] = [];

  images.forEach((image, i) => {
    const card = Card({
      imgSrc: image.src,
      title: image.title,
      isActive: i === 0,
      onClick: (e) => {
        expandCard(e);
      },
    });

    cards.push(card);
    cardList?.append(card);
  });

  main.cleanup = (): void => {
    cards.forEach((card) => {
      card.cleanup?.();
    });
  };

  return main;
};
