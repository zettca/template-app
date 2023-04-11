import { Asset } from "@generated/apiSchemas";
import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCheckBox,
  HvActionBar,
  HvActionsGeneric,
  HvTypography,
  HvSemanticColorKeys,
  HvTableInstance,
} from "@hitachivantara/uikit-react-core";
import {
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
} from "@hitachivantara/uikit-react-icons";
import { Link } from "react-router-dom";

const colorMap: Record<Asset["severity"], HvSemanticColorKeys> = {
  critical: "sema4",
  major: "sema3",
  average: "sema2",
  minor: "sema1",
};

const iconMap: Record<Asset["severity"], React.ReactNode> = {
  critical: <Level3Bad semantic="sema4" />,
  major: <Level2Average semantic="sema3" />,
  average: <Level1 semantic="sema2" />,
  minor: <Level0Good semantic="sema1" />,
};

export type CardViewProps = {
  instance: HvTableInstance<Asset>;
};

export const CardView: React.FC<CardViewProps> = ({ instance }) => {
  const { page } = instance;
  return (
    <HvSimpleGrid
      breakpoints={[
        { minWidth: 1270, cols: 4, spacing: "md" },
        { minWidth: 960, cols: 3, spacing: "md" },
        { minWidth: 600, cols: 2, spacing: "sm" },
        { minWidth: 0, cols: 1, spacing: "sm" },
      ]}
    >
      {page.map((row) => {
        const value = row.original;
        return (
          <HvCard
            key={value.id}
            bgcolor="atmo1"
            style={{ width: "100%" }}
            statusColor={colorMap[value.severity]}
            icon={iconMap[value.severity]}
          >
            <HvCardHeader title={value.name} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Event</HvTypography>
                  <HvTypography noWrap>{row?.values?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Severity</HvTypography>
                  <HvTypography noWrap>{value.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Status</HvTypography>
                  <HvTypography noWrap>{value.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Priority</HvTypography>
                  <HvTypography noWrap>{value.status}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvActionBar>
              <HvCheckBox
                value="value"
                onChange={() => instance.toggleRowSelected(row.id)}
                checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
              />
              <div style={{ flex: 1 }} />
              <HvActionsGeneric
                actions={[
                  { id: "view1", label: <Link to={value.id}>View</Link> },
                ]}
              />
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};
