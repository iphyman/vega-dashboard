import styled from "styled-components/macro";

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
  display: flex;
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

export function DisConnected() {
  return (
    <Overlay>
      <Container>
        <Box>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo officia
          veniam vel autem doloremque animi repellat natus. Aliquam asperiores
          minus optio, dolorum nostrum neque, cum, at quis tempora enim
          voluptas!
        </Box>
      </Container>
    </Overlay>
  );
}
