import styled from "styled-components/macro";
import { TradeNavbar } from "components/Navbar";
import { TradeSidebar } from "components/Sidebar";
import { ContainerFluid, Media } from "components/ResponsiveDesign";
import { Markets } from "components/Market";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.main`
  flex: 1 0 auto;
  display: flex;

  ${Media.mobileL`
    flex-direction: column;
  `}
`;

const PageContent = styled.div`
  width: calc(100% - 260px);

  ${Media.mobileL`
    width: 100%;
  `}
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <TradeNavbar />
      <PageContainer>
        <TradeSidebar />
        <PageContent>
          <ContainerFluid p="0.5rem">
            <Markets />
            {children}
          </ContainerFluid>
        </PageContent>
      </PageContainer>
    </Container>
  );
}
