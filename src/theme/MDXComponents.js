import InitialMDXComponents from "@theme/MDXComponents";
import Badge from "./Badge";
import tpsr from "./tpsr";
import img from "./ZoomedImage";
import image from "./image";

const MDXComponents = {
  ...InitialMDXComponents,
  Badge: Badge,
  tpsr: tpsr,
  img: img,
  image: image,
};

export default MDXComponents;
