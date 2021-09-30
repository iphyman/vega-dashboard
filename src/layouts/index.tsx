import styled from "styled-components/macro";
import { Navbar } from "../components/Navbar";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.main`
  flex: 1 0 auto;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Navbar />
      <PageContent>{children}</PageContent>
    </Container>
  );
}
