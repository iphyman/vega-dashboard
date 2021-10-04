import styled from "styled-components/macro";

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 2px solid #4e524e;
  & th,
  & td {
    padding: 3px 5px;
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
  & tr {
    border: 1px solid #4e524e;
    transition: 0.25s background-color ease;
    &:hover {
      background-color: #f5f5f5a3;
      cursor: pointer;
    }
  }
`;

export default DataTable;
