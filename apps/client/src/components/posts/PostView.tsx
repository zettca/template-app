import { HvTag, HvTypography } from "@hitachivantara/uikit-react-core";
import { Post } from "~/types/app";

type PostViewProps = {
  data: Post;
};

export const PostView: React.FC<PostViewProps> = ({ data }) => {
  return (
    <div>
      <HvTypography variant="3xlTitle">{data.title}</HvTypography>
      <HvTypography component="span">
        Created by <code>{data.author}</code>
      </HvTypography>{" "}
      <span>
        {data.tags?.split(",").map((tag) => (
          <HvTag
            key={tag}
            type="categorical"
            label={<HvTypography>{tag}</HvTypography>}
          />
        ))}
      </span>
      <HvTypography>{data.description}</HvTypography>
      <HvTypography>{data.body}</HvTypography>
    </div>
  );
};
