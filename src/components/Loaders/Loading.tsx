import styled from "styled-components/macro";
import { Dots } from "./Dots";

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  z-index: 1020;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrMsg = styled.p`
  font-size: 13px;
  color: #f5f5f5a3;
  text-align: center;
`;

interface LoadingProps {
  error?: string;
}

export function Loading({ error }: LoadingProps) {
  return (
    <Container>
      <Content>
        <Dots />
        {error && <ErrMsg>{error}</ErrMsg>}
      </Content>
    </Container>
  );
}
