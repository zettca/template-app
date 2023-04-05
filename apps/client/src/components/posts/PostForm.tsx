import { FormEventHandler, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Form, FormMethod } from "react-router-dom";
import {
  HvButton,
  HvGrid,
  HvInput,
  HvTextArea,
} from "@hitachivantara/uikit-react-core";

import { Post } from "~/types/app";

type PostFormValues = Post;

type PostFormProps = {
  method: FormMethod;
  defaultValues?: PostFormValues;
  onBack?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function PostForm({
  method = "post",
  defaultValues,
  onBack,
  onSubmit,
}: PostFormProps) {
  const { t } = useTranslation("posts", { keyPrefix: "form" });

  return (
    <Form method={method} onSubmit={onSubmit}>
      <HvGrid container>
        <HvGrid item xs={12}>
          <HvInput
            required
            autoFocus
            name="title"
            label={t("title")}
            defaultValue={defaultValues?.title}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput
            required
            name="description"
            label={t("description")}
            defaultValue={defaultValues?.description}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvTextArea
            required
            name="body"
            label={t("body")}
            rows={4}
            defaultValue={defaultValues?.body}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvInput
            name="tags"
            label={t("tags")}
            defaultValue={defaultValues?.tags}
          />
        </HvGrid>
        <HvGrid
          item
          xs={12}
          style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
        >
          <HvButton type="submit" category="secondary">
            {t(`submit.${method}`)}
          </HvButton>
          <HvButton category="ghost" onClick={onBack}>
            {t("submit.cancel")}
          </HvButton>
        </HvGrid>
      </HvGrid>
    </Form>
  );
}
