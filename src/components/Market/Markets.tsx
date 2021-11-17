import styled from "styled-components/macro";
import { NavLink, NavLinkProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Slider } from "../Slider";
import { Loading } from "components/Loaders";
import { useSetMarketId } from "data/application/hooks";

const GET_MARKETS = gql`
  query GetMarkets {
    markets {
      id
      state
      tradableInstrument {
        instrument {
          code
        }
      }
    }
  }
`;

const activeclassname = "active";

const NavbarWrapper = styled.div`
  width: 100%;
  background-color: #1f1f1f;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px 5px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NavbarItem = styled(NavLink).attrs({
  activeclassname,
})`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.4);
  /* margin: 2px 5px; */
  border-radius: 8px 8px 0px 0px;
  padding: 5px 10px;
  text-decoration: none;
  &.${activeclassname} {
    border-color: #ffffff;
    border-bottom-color: #000000;
    border-top: 4px solid #edff22;
  }
`;

const NavbarTitle = styled.div`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const NavbarSubTitle = styled.div`
  color: #f5f5f5a3;
  font-size: 0.6rem;
`;

interface NavItemProps extends NavLinkProps {
  title: string;
  subtitle: string;
}

function NavItem(props: NavItemProps) {
  const { subtitle, title, to } = props;

  return (
    <NavbarItem to={to}>
      <NavbarTitle>{title}</NavbarTitle>
      <NavbarSubTitle>{subtitle}</NavbarSubTitle>
    </NavbarItem>
  );
}

export function Markets() {
  const [setActiveMarketId] = useSetMarketId();
  const { loading, error, data } = useQuery(GET_MARKETS);

  if (loading) return <Loading />;

  if (error) return <Loading error={error.message} />;

  // Set default market to first market in array
  setActiveMarketId(data.markets[0].id);

  return (
    <NavbarWrapper>
      <Container>
        <Row>
          <Slider
            rightIcon={<BsChevronDoubleRight />}
            leftIcon={<BsChevronDoubleLeft />}
          >
            {data?.markets.map((market: any, index: number) => (
              <NavItem
                key={index}
                title={market?.tradableInstrument?.instrument?.code}
                subtitle={market?.state}
                to={`/trade/${market?.id}`}
                onClick={() => setActiveMarketId(market?.id)}
              />
            ))}
          </Slider>
        </Row>
      </Container>
    </NavbarWrapper>
  );
}
