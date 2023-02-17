import React from "react";
import { HvLoading } from "@hitachivantara/uikit-react-core";

export type LoadingProps = {
  label?: string;
};

/** "Fullscreen" Loading component to use for `Suspense` and other loading fallbacks */
const Loading: React.FC<LoadingProps> = ({ label }) => {
  return <HvLoading role="progressbar" label={label} aria-valuetext={label} />;
};

export default Loading;
