import styled from "styled-components/macro";
import media from "./Media";

export interface IContainer {
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  mx?: string;
  my?: string;
}

export const Container = styled.div<IContainer>`
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: ${({ mr, mx }) => (mr ? mr : mx ? mx : "auto")};
  margin-left: ${({ ml, mx }) => (ml ? ml : mx ? mx : "auto")};
  margin-top: ${({ mt, my }) => mt ?? my};
  margin-bottom: ${({ mb, my }) => mb ?? my};

  ${media.atLeastMobileL`
    max-width: 540px;
  `};

  ${media.atLeastTablet`
    max-width: 720px;
  `};

  ${media.atLeastTabletL`
    max-width: 960px;
  `};

  ${media.atLeastLaptopM`
    max-width: 1140px;
  `};

  ${media.atLeastLaptopL`
    max-width: 1320px;
  `}
`;
