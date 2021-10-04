import styled from "styled-components/macro";
import media from "./Media";
import {
  AlignItems,
  IAlignItems,
  Display,
  IDisplay,
  JustifyContent,
  IJustifyContent,
} from "./constants";

type ColumnType = string | number;
export interface IColumn {
  alignItems?: IAlignItems;
  alignItemsMobileL?: IAlignItems;
  column?: ColumnType | boolean;
  columnAtLeastMobile?: ColumnType;
  columnAtLeastMobileL?: ColumnType;
  columnAtLeastTablet?: ColumnType;
  columnAtLeastTabletL?: ColumnType;
  columnAtLeastLaptop?: ColumnType;
  display?: IDisplay;
  justifyContent?: IJustifyContent;
  justifyContentAtLeastMobile?: IJustifyContent;
  justifyContentAtLeastMobileL?: IJustifyContent;
  justifyContentAtLeastTablet?: IJustifyContent;
  justifyContentAtLeastLaptop?: IJustifyContent;
  margin?: string;
  marginMobile?: string;
  marginTablet?: string;
  padding?: string;
}

const TotalColums = 12;
const OneColumn = 100 / TotalColums;
const FlexBasis = (col: any): string => {
  switch (col) {
    case true:
      return `
            flex: 0, 0 auto;
            `;
    case "auto":
      return `
            flex: 0, 0 auto;
            width: auto;
            `;
    default:
      return `
            flex: 0, 0, auto;
            width: ${OneColumn * col}% !important;
            `;
  }
};

export const Column = styled.div<IColumn>`
  position: relative;
  min-height: 1px;

  ${({ column }) => (column ? FlexBasis(column) : null)};
  ${({ display = "flex" }) => Display[display]};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};

  ${media.mobile`
  margin: ${({ marginMobile }: IColumn) => marginMobile};
  `};

  ${media.atLeastMobile`
${({ columnAtLeastMobile }: IColumn) =>
  columnAtLeastMobile ? FlexBasis(columnAtLeastMobile) : null};
`};

  ${media.atLeastMobileL`
${({ columnAtLeastMobileL }: IColumn) =>
  columnAtLeastMobileL ? FlexBasis(columnAtLeastMobileL) : null};
`};

  ${media.tablet`
 margin: ${({ marginTablet }: IColumn) => marginTablet};
  `};

  ${media.atLeastTablet`
${({ columnAtLeastTablet }: IColumn) =>
  columnAtLeastTablet ? FlexBasis(columnAtLeastTablet) : null};
`};

  ${media.atLeastTabletL`
${({ columnAtLeastTabletL }: IColumn) =>
  columnAtLeastTabletL ? FlexBasis(columnAtLeastTabletL) : null};
`};

  ${media.atLeastLaptop`
${({ columnAtLeastLaptop }: IColumn) =>
  columnAtLeastLaptop ? FlexBasis(columnAtLeastLaptop) : null};
`};

  ${({ alignItems = "inherit" }) => AlignItems[alignItems]};

  ${({ justifyContent = "inherit" }) => JustifyContent[justifyContent]};

  ${media.mobileL`
  ${({ alignItemsMobileL = "inherit" }: IColumn) =>
    AlignItems[alignItemsMobileL]};
  `};

  ${media.atLeastMobile`
    ${({ justifyContentAtLeastMobile = "inherit" }: IColumn) =>
      JustifyContent[justifyContentAtLeastMobile]};
    `};

  ${media.atLeastMobileL`
    ${({ justifyContentAtLeastMobileL = "inherit" }: IColumn) =>
      JustifyContent[justifyContentAtLeastMobileL]};
    `};

  ${media.atLeastTablet`
    ${({ justifyContentAtLeastTablet = "inherit" }: IColumn) =>
      JustifyContent[justifyContentAtLeastTablet]};
    `};

  ${media.atLeastLaptop`
    ${({ justifyContentAtLeastLaptop = "inherit" }: IColumn) =>
      JustifyContent[justifyContentAtLeastLaptop]};
    `};
`;
