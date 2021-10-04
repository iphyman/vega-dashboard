import styled from "styled-components/macro";
import { Media } from "components/ResponsiveDesign";
import { MarketInfo } from "components/Market";

const Sidebar = styled.div`
  position: relative;
  top: 0px;
  min-width: 240px;
  max-width: 260px;
  min-height: calc(100vh - 60px);
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #1f1f1f;

  ${Media.mobileL`
    max-width: 100%;
  `};
`;

const Container = styled.div``;

export function TradeSidebar() {
  return (
    <Sidebar>
      <Container>
        <MarketInfo />
      </Container>
    </Sidebar>
  );
}
