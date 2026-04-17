import "@/index.css";
import BloomcardPage from "@/pages/BloomcardPage/BloomcardPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const bloomcardPage = BloomcardPage();
  app.appendChild(bloomcardPage);
};

document.addEventListener("DOMContentLoaded", onInit);
