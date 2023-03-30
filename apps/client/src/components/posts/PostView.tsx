import {
  HvTag,
  HvTextArea,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Post } from "~/types/app";

type PostViewProps = {
  data: Post;
};

export const PostView: React.FC<PostViewProps> = ({ data }) => {
  return (
    <div>
      <HvTypography variant="3xlTitle">{data.title}</HvTypography>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <span>
          Created by <code>{data.author}</code>
        </span>
        <span>
          {data.tags?.split(",").map((tag) => (
            <HvTag key={tag} type="categorical" label={tag} />
          ))}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <HvTypography>{data.description}</HvTypography>
        <HvTextArea readOnly rows={4} value={data.body} />
      </div>
    </div>
  );
};
