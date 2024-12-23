import { paths } from "../constants/paths.js";
import { globePov } from "../utils/globePov.js";
import { handleDepAndDes } from "/scripts/handleDepAndDes.js";
import { setDefaultDeparture } from "/scripts/setDefaultDeparture.js";

export const world = Globe()(document.getElementById("globe-container"))
  .globeImageUrl(paths.globUrl)
  .showAtmosphere(true)
  .atmosphereAltitude(0.3);

const resizeGlobe = () => {
  const container = document.getElementById("globe-container");
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  world.width(width).height(height);

  const screenWidth = window.innerWidth;
  let altitude;

  if (screenWidth <= 310) {
    altitude = 10;
  } else if (screenWidth <= 400) {
    altitude = 9;
  } else if (screenWidth <= 600) {
    altitude = 8;
  } else if (screenWidth <= 768) {
    altitude = 4;
  } else if (screenWidth <= 2570) {
    altitude = 3;
  }

  world.pointOfView({ lat: 0, lng: 0, altitude }, 0);
};

globePov(world);
window.addEventListener("resize", resizeGlobe);
resizeGlobe();
setDefaultDeparture();
document
  .getElementById("search-button")
  .addEventListener("click", handleDepAndDes);
  