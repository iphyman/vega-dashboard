import { useQuery, gql } from "@apollo/client";
import numeral from "numeral";
import { Loading } from "../Loaders";
import DataTable from "../DataTable";

numeral.defaultFormat("0,0");

const GET_PARTY_POSITIONS = gql`
  query GetPartyPositions($partyID: ID) {
    party(id: $partyID) {
      positions {
        unrealisedPNL
        openVolume
        realisedPNL
        averageEntryPrice
        margins {
          maintenanceLevel
        }
        market {
          tradableInstrument {
            instrument {
              code
            }
          }
        }
      }
    }
  }
`;

// const partyID = process.env.REACT_APP_WALLET_PUBLIC_KEY;
const partyID =
  "11712988e1cb3be24d5f664d23478e8c08436862f1f521fe7996628ca89596f9";

export function Positions() {
  const { loading, data, error } = useQuery(GET_PARTY_POSITIONS, {
    variables: { partyID },
  });

  if (loading) return <Loading />;

  if (error) return <Loading error={error.message} />;

  const positions = data?.party?.positions;

  const decimals = 5;

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <DataTable>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Entry price</th>
          <th>Maintenance margin</th>
          <th>Unrealised PNL</th>
          <th>Realised PNL</th>
          <th>Open vol</th>
        </tr>
      </thead>
      <tbody>
        {positions?.map((position: any, index: number) => (
          <tr key={index}>
            <td>{position?.market?.tradableInstrument?.instrument?.code}</td>
            <td>{formatDecimal(position?.averageEntryPrice)}</td>
            <td>{position?.margins?.maintenanceLevel}</td>
            <td>{formatDecimal(position?.unrealisedPNL)}</td>
            <td>{formatDecimal(position?.realisedPNL)}</td>
            <td>{position?.openVolume}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
