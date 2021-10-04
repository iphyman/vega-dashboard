import { useSubscription, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import { useActiveMarketId } from "../../data/application/hooks";
import { Loading, DisConnected } from "../Loaders";
import DataTable from "components/DataTable";

numeral.defaultFormat("0,0");

const STREAM_ORDERS = gql`
  subscription OnNewOrders($marketId: ID) {
    orders(marketId: $marketId) {
      size
      side
      price
      market {
        decimalPlaces
      }
    }
  }
`;

export function OrderBook() {
  const defaultMarketId = useActiveMarketId();
  const { marketId } = useParams<{ marketId: string }>() ?? defaultMarketId;
  const { loading, data, error } = useSubscription(STREAM_ORDERS, {
    variables: { marketId },
  });

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const decimals = 5;

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <DataTable>
      <thead>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Side</th>
        </tr>
      </thead>
      <tbody>
        {data?.orders.map((order: any, index: number) => (
          <tr key={index} data-side={order?.side}>
            <td>{formatDecimal(order?.price)}</td>
            <td>{order?.size}</td>
            <td>{order?.side}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
