import { useTranslation } from "react-i18next";
import { Form, FormMethod } from "react-router-dom";
import {
  HvButton,
  HvGrid,
  HvInput,
  HvTextArea,
} from "@hitachivantara/uikit-react-core";

type PostFormValues = {};

type PostFormProps = { method: FormMethod; defaultValues?: PostFormValues };

export function PostForm({ method = "post" }: PostFormProps) {
  const { t } = useTranslation();

  return (
    <Form method={method}>
      <HvGrid container>
        <HvGrid item xs={12}>
          <HvInput required autoFocus name="title" label={t("title")} />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput required name="description" label={t("description")} />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvTextArea required name="body" label={t("body")} rows={4} />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput name="tags" label={t("tags")} />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvButton type="submit">Create</HvButton>
        </HvGrid>
      </HvGrid>
    </Form>
  );
}
