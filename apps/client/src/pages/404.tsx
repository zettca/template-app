import { useTranslation } from "react-i18next";
import { HvContainer } from "@hitachivantara/uikit-react-core";

import NotFoundComponent from "~/components/common/NotFound";

export default function NotFound() {
  const { t } = useTranslation("notFound");

  return (
    <HvContainer>
      <NotFoundComponent title={t("title")} />
    </HvContainer>
  );
}
