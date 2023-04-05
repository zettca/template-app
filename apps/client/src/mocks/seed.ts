import { assetsDb } from "./models";

const seed = ({ numAssets = 120 }) => {
  Array.from(Array(numAssets)).forEach((_, i) => {
    assetsDb.asset.create({ id: `${i}` });
  });
};

export { seed as default };
