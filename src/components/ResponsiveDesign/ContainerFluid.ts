import styled from "styled-components/macro";

export interface IContainerFluid {
  maxWidth?: string;
  height?: string;
  pr?: string;
  pl?: string;
  mr?: string;
  ml?: string;
}

export const ContainerFluid = styled.div<IContainerFluid>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: ${({ height }) => height};
  padding-right: ${({ pr }) => pr ?? "1rem"};
  padding-left: ${({ pl }) => pl ?? "1rem"};
  margin-right: ${({ mr }) => mr ?? "auto"};
  margin-left: ${({ ml }) => ml ?? "auto"};
`;
