import React from "react";
import styled from "styled-components";

const Image = styled(({ src, alt, className, style }) => {
  return <img src={src} alt={alt} className={className} style={style} />;
})`
  max-width: 100%;
  height: auto;
`;

export default Image;
