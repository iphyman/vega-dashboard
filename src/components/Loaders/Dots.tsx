import styled, { keyframes } from "styled-components/macro";

export interface DotsProps {
  size?: string;
  bg?: string;
  width?: string;
}

const PulseAnimation = keyframes`
 from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
`;

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width ?? "50px"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.6rem 0rem;
`;

const Dot = styled.div<Omit<DotsProps, "width">>`
  background-color: ${({ bg }) => bg ?? "#fff"};
  width: ${({ size }) => size ?? "12px"};
  height: ${({ size }) => size ?? "12px"};
  border-radius: 50%;

  &:nth-child(1) {
    animation: ${PulseAnimation} 0.4s ease 0s infinite alternate;
  }
  &:nth-child(2) {
    animation: ${PulseAnimation} 0.4s ease 0.2s infinite alternate;
  }
  &:nth-child(3) {
    animation: ${PulseAnimation} 0.4s ease 0.4s infinite alternate;
  }
`;

export function Dots({ width, ...rest }: DotsProps) {
  return (
    <Container width={width}>
      <Dot {...rest} />
      <Dot {...rest} />
      <Dot {...rest} />
    </Container>
  );
}
