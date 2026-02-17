import "@/index.css";
import { ExpandingCardsPage } from "@/pages/ExpandingCardsPage/ExpandingCardsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const expandingCardsPage = ExpandingCardsPage();
  app.appendChild(expandingCardsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
