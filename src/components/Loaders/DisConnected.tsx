import styled from "styled-components/macro";
import { AiOutlineClose } from "react-icons/ai";
import { Dots } from "components/Loaders";
import { useSetAppConnected } from "data/application/hooks";

const Overlay = styled.div`
  position: fixed;
  padding: 0rem 1rem;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  z-index: 1020;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 460px;
  min-height: 120px;
  background-color: #000000;
  color: #ffffff;
  border-radius: 4px;
  padding: 1rem;
  border: 1px solid #000;
  box-shadow: 0px 0px 10px 1px rgb(255 255 255 / 40%);
`;

const Title = styled.div`
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 20px;
  color: #f5f5f5a3;
  appearance: none;
  padding: 2px;
  margin: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.5s color ease;

  &:hover {
    color: #ffffff;
  }
`;

const Text = styled.div`
  font-size: 13px;
  color: #ffffff;
  text-align: center;
`;

interface DisconnectedProps {
  error?: any;
}

export function DisConnected(props: DisconnectedProps) {
  const { error } = props;
  const toggle = useSetAppConnected();

  return (
    <Overlay>
      <Container>
        <Box>
          <Title>Reconnecting...</Title>
          <Dots />
          <Text>
            We are having difficulty connecting to the{" "}
            <a href="https://vega.xyz" target="_blank" rel="noreferrer">
              Vega
            </a>{" "}
            live feed, ensure you have a working internet connection.
          </Text>
          {error && <Text>{error}</Text>}
          <CloseBtn onClick={() => toggle()}>
            <AiOutlineClose />
          </CloseBtn>
        </Box>
      </Container>
    </Overlay>
  );
}
