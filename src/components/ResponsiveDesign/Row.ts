import styled from "styled-components/macro";
import media from "./Media";
import {
  AlignContent,
  IAlignContent,
  AlignItems,
  IAlignItems,
  AlignSelf,
  IAlignSelf,
  JustifyContent,
  IJustifyContent,
} from "./constants";

const GutterX = 1.5;
const GutterY = 0;
const MeasuredUnit = "rem";

export interface IRow {
  alignContent?: IAlignContent;
  alignContentAtLeastMobile?: IAlignContent;
  alignContentAtLeastTablet?: IAlignContent;
  alignContentAtLeastLaptop?: IAlignContent;
  alignItems?: IAlignItems;
  alignItemsAtLeastMobile?: IAlignItems;
  alignItemsAtLeastTablet?: IAlignItems;
  alignItemsAtLeastLaptop?: IAlignItems;
  alignSelf?: IAlignSelf;
  alignSelfAtLeastMobile?: IAlignSelf;
  alignSelfAtLeastTablet?: IAlignSelf;
  alignSelfAtLeastLaptop?: IAlignSelf;
  justifyContent?: IJustifyContent;
  justifyContentAtLeastMobile?: IJustifyContent;
  justifyContentAtLeastTablet?: IJustifyContent;
  justifyContentAtLeastLaptop?: IJustifyContent;
}

export const Row = styled.div<IRow>`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${GutterY * -1 + MeasuredUnit};
  margin-right: ${GutterX / -2 + MeasuredUnit};
  margin-left: ${GutterX / -2 + MeasuredUnit};

  & > * {
    box-sizing: border-box;
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: ${GutterX / 2 + MeasuredUnit};
    padding-left: ${GutterX / 2 + MeasuredUnit};
    margin-top: ${GutterY + MeasuredUnit};
  }
  ${({ alignContent = "inherit" }) => AlignContent[alignContent]};
  ${({ alignItems = "inherit" }) => AlignItems[alignItems]};
  ${({ alignSelf = "inherit" }) => AlignSelf[alignSelf]};
  ${({ justifyContent = "inherit" }) => JustifyContent[justifyContent]};

  ${media.atLeastTablet`
     ${({ alignItemsAtLeastTablet = "inherit" }: IRow) =>
       AlignItems[alignItemsAtLeastTablet]};
      `};
  ${media.atLeastMobile`
    ${({ alignItemsAtLeastMobile = "inherit" }: IRow) =>
      AlignItems[alignItemsAtLeastMobile]};
    `};
  ${media.atLeastLaptop`
    ${({ alignItemsAtLeastLaptop = "inherit" }: IRow) =>
      AlignItems[alignItemsAtLeastLaptop]};
    `};
  ${media.atLeastTablet`
    ${({ justifyContentAtLeastTablet = "inherit" }: IRow) =>
      JustifyContent[justifyContentAtLeastTablet]};
    `};
  ${media.atLeastLaptop`
    ${({ justifyContentAtLeastLaptop = "inherit" }: IRow) =>
      JustifyContent[justifyContentAtLeastLaptop]};
    `};
`;
