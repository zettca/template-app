import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Link } from "react-router-dom";

export default function PostsIndex() {
  return (
    <HvTypography>
      Select a post from the sidebar, or <Link to="new">click here</Link> to
      create a new post
    </HvTypography>
  );
}
