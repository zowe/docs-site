import React from "react";
import ImageZoom from "react-medium-image-zoom";

function img(props) {
  return (
    <div>
      <ImageZoom
        image={{
          src: props.src,
          alt: props.alt,
        }}
      />
    </div>
  );
}

export default img;
