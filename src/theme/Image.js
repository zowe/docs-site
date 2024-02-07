import React from "react";

function Image(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      usemap={props.usemap}
      border={props.border}
      id={props.id}
      width={props.width}
    />
  );
}

export default Image;
