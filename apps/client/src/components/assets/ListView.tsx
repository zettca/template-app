import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  HvTableInstance,
} from "@hitachivantara/uikit-react-core";

import { Asset } from "@generated/apiSchemas";

export type ListViewProps = {
  instance: HvTableInstance<Asset>;
};

export const ListView: React.FC<ListViewProps> = ({ instance }) => {
  const { page, prepareRow, columns } = instance;

  return (
    <HvTableContainer style={{ padding: "2px" }}>
      <HvTable variant="listrow" {...instance.getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="listcheckbox" />
            {columns.map((col) => (
              <HvTableHeader key={col.accessor}>{col.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody withNavigation {...instance.getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              /* eslint-disable react/jsx-key */
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export default ListView;
