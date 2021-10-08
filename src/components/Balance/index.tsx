import { useQuery, gql } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import { useActiveMarketId } from "../../data/application/hooks";
import numeral from "numeral";
import { Loading } from "../Loaders";
import DataTable from "../DataTable";

numeral.defaultFormat("0,0");

const GET_PARTY_BALANCE = gql`
  query GetPartyBalance($partyID: ID) {
    party(id: $partyID) {
      accounts {
        type
        balance
        asset {
          symbol
        }
      }
    }
  }
`;

// const partyID = process.env.REACT_APP_WALLET_PUBLIC_KEY;
const partyID =
  "11712988e1cb3be24d5f664d23478e8c08436862f1f521fe7996628ca89596f9";

export function Balance() {
  // const defaultMarketId = useActiveMarketId();
  // const { marketId } = useParams<{ marketId: string }>() ?? defaultMarketId;
  const { loading, data, error } = useQuery(GET_PARTY_BALANCE, {
    variables: { partyID },
  });

  if (loading) return <Loading />;

  if (error) return <Loading error={error.message} />;

  const balances = data?.party?.accounts;

  const decimals = 5;

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <DataTable>
      <thead>
        <tr>
          <th>Asset</th>
          <th>Balance</th>
          <th>Account Type</th>
        </tr>
      </thead>
      <tbody>
        {balances?.map((balance: any, index: number) => (
          <tr key={index}>
            <td>{balance?.asset?.symbol}</td>
            <td>{formatDecimal(balance?.balance)}</td>
            <td>{balance?.type}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
