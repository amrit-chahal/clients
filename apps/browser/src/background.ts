import MainBackground from "./background/main.background";

declare global {
  interface Window {
    bitwardenMain: MainBackground;
  }
}

const bitwardenMain = (window.bitwardenMain = new MainBackground());
bitwardenMain.bootstrap().then(() => {
  // Finished bootstrapping
});
