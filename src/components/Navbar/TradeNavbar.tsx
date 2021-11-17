import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Media } from "components/ResponsiveDesign";

const activeclassname = "active";

const NavbarWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 800;
  background-color: #1f1f1f;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #f5f5f5a3;
  margin-right: 7px;
  margin-left: 7px;
`;

const HomeLinkWrap = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  text-decoration: none;
  /* Hide Home Logo on mobile */
  ${Media.mobile`
  display: none;
  `}
`;

const MenuGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ExternalLink = styled.a.attrs({
  target: "_blank",
})`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  color: #f5f5f5a3;
  transition: color 0.5s ease;
  border-radius: 10px;
  margin-right: 5px;
  &:hover,
  &:focus {
    color: #ffffff;
  }
`;

const MenuLink = styled(NavLink).attrs({
  activeclassname,
})`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 15px;
  height: 38px;
  line-height: 1;
  transition: color 0.5s ease;
  color: #f5f5f5a3;
  &.${activeclassname} {
    font-weight: 600;
    color: #ffffff;
  }
  &:hover,
  &:focus {
    color: #ffffff;
  }
`;

export function TradeNavbar() {
  return (
    <NavbarWrap>
      <Container>
        <HomeLinkWrap href=".">
          <Title>VegaMex</Title>
        </HomeLinkWrap>
        <MenuGroup>
          <MenuLink to="/trade">Trade</MenuLink>
          <ExternalLink href="https://docs.fairground.vega.xyz/api/graphql/">
            Reference
          </ExternalLink>
          <ExternalLink href="https://docs.fairground.vega.xyz/docs/api-reference/">
            API
          </ExternalLink>
          <ExternalLink href="https://github.com/iphyman/vega-dashboard">
            <FaGithub size={24} />
          </ExternalLink>
        </MenuGroup>
      </Container>
    </NavbarWrap>
  );
}
