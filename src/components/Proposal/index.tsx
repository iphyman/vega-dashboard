import { useQuery, gql } from "@apollo/client";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Loading, DisConnected } from "../Loaders";
import DataTable from "../DataTable";

dayjs.extend(relativeTime);

const GET_PROPOSALS = gql`
  query GetProposals {
    proposals {
      state
      votes {
        yes {
          totalNumber
        }
        no {
          totalNumber
        }
      }
      rejectionReason
      terms {
        enactmentDatetime
        closingDatetime
        change {
          ... on NewMarket {
            instrument {
              name
              code
            }
          }
        }
      }
    }
  }
`;

export function Proposal() {
  const { loading, data, error } = useQuery(GET_PROPOSALS);

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const proposals = data?.proposals;

  return (
    <DataTable>
      <thead>
        <tr>
          <th>Proposal</th>
          <th>Status</th>
          <th>Enactment date</th>
          <th>Votes Yes/No</th>
          <th>Closing date</th>
          <th>Rejection reason</th>
        </tr>
      </thead>
      <tbody>
        {proposals?.map((proposal: any, index: number) => (
          <tr key={index}>
            <td>New Market: {proposal?.terms?.change?.instrument?.code}</td>
            <td>{proposal?.state}</td>
            <td>
              {dayjs(proposal?.terms?.enactmentDatetime).format(
                "YYYY MM DD HH:MM"
              )}
            </td>
            <td>
              {proposal?.votes?.yes?.totalNumber}/
              {proposal?.votes?.no?.totalNumber}
            </td>
            <td>
              {dayjs(proposal?.terms?.closingDatetime).format(
                "YYYY MM DD HH:MM"
              )}
            </td>
            <td>{proposal?.rejectionReason}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
