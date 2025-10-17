import { ExpandingCardsPage } from "@src/pages/ExpandingCardsPage/ExpandingCardsPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const expandingCardsPage = ExpandingCardsPage();
  app.appendChild(expandingCardsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
