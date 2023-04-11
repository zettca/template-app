import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Add,
  Cards,
  Delete,
  List,
  Preview,
} from "@hitachivantara/uikit-react-icons";
import {
  HvBulkActions,
  HvControls,
  HvEmptyState,
  HvInput,
  HvLoading,
  HvPagination,
  HvRightControl,
  HvTableColumnConfig,
  useHvBulkActions,
  useHvData,
  useHvGlobalFilter,
  useHvPagination,
  useHvRowSelection,
  useHvSortBy,
} from "@hitachivantara/uikit-react-core";

import { useListAssets } from "@generated/apiComponents";
import { Asset } from "@generated/apiSchemas";
import { CardView } from "~/components/assets/CardView";
import ListView from "~/components/assets/ListView";

const pageSizeOptions = [8, 16, 24, 32];

export const getColumns = (): HvTableColumnConfig<Asset>[] => [
  { Header: "Title", accessor: "name", style: { minWidth: 220 } },
  // { Header: "Event Type", accessor: "eventType", style: { minWidth: 100 } },
  { Header: "Status", accessor: "status", style: { width: 120 } },
  { Header: "Severity", accessor: "severity" },
  // { Header: "Priority", accessor: "priority" },
  { Header: "Time", accessor: "time" },
  // { Header: "Temperature", accessor: "temperature" },
];

export const Component: React.FC = () => {
  const queryParams = { skip: 0, take: 20 };
  const { isLoading, error, data } = useListAssets({ queryParams });
  const [searchParams, setSearchParams] = useSearchParams();
  const columns = useMemo(() => getColumns(), []);

  const [currentView, setCurrentView] = useState("card");

  const instance = useHvData(
    { data, columns, initialState: { pageSize: pageSizeOptions[0] } },
    useHvGlobalFilter,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  if (isLoading) {
    return <HvLoading />;
  }

  if (error || !data) {
    return <HvEmptyState message="Error" icon={undefined} />;
  }

  const search = searchParams.get("search");

  return (
    <div>
      <HvControls
        selectedView={currentView}
        views={[
          { id: "card", label: "Card view", icon: <Cards /> },
          { id: "list", label: "List view", icon: <List /> },
          { id: "base", label: "Basic view", icon: <Add /> },
        ]}
        onViewChange={(_evt, id) => setCurrentView(id)}
      >
        <HvInput
          type="search"
          value={search}
          onChange={(_evt, val) => {
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("search", val);
              return newParams;
            });
          }}
        />
        <HvRightControl
          values={[
            { accessor: "name", desc: true, label: "Name Desc" },
            { accessor: "name", desc: false, label: "Name Asc" },
          ]}
        />
      </HvControls>

      <HvBulkActions
        {...instance.getHvBulkActionsProps()}
        numTotal={data.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        actions={[
          { id: "add", label: "Add", icon: <Add /> },
          { id: "delete", label: "Delete", icon: <Delete /> },
          { id: "put", label: "Preview", icon: <Preview /> },
        ]}
        actionsCallback={(_evt, id, action) => {
          console.log(id, action);
        }}
      />

      {currentView === "card" && <CardView instance={instance} />}
      {currentView === "list" && <ListView instance={instance} />}
      {currentView === "base" &&
        instance.page.map(({ original: { id, name } }) => (
          <p key={id}>
            <Link to={id}>{name}</Link>
          </p>
        ))}

      {instance.page.length > 0 && (
        <HvPagination
          {...instance.getHvPaginationProps()}
          pageSizeOptions={[8, 16, 32]}
        />
      )}
    </div>
  );
};
