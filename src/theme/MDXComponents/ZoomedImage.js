import React from "react";
import Zoom from "react-medium-image-zoom";

function img(props) {
  return (
    <span>
      <Zoom wrapElement="span" zoomImg={{src: props.src}}>
        <img
          src={props.src}
          alt={props.alt}
        />
      </Zoom>
    </span>
  );
}

export default img;
