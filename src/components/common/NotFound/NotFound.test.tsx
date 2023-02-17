import React from "react";
import { render, screen } from "@testing-library/react";
import { TestProvider } from "~/tests/providers";
import NotFound from ".";

describe("<NotFound />", () => {
  const MOCK_CODE = 418;
  const MOCK_TITLE = "MOCK_TITLE";
  const MOCK_FOOTER = "MOCK_FOOTER";

  beforeEach(() => {
    render(
      <TestProvider>
        <NotFound code={MOCK_CODE} title={MOCK_TITLE} footer={MOCK_FOOTER} />
      </TestProvider>
    );
  });

  it("renders the content", () => {
    expect(screen.getByText(MOCK_CODE)).toBeVisible();
    expect(screen.getByText(MOCK_TITLE)).toBeVisible();
    expect(screen.getByText(MOCK_FOOTER)).toBeVisible();
  });
});

describe("<NotFound /> with title only", () => {
  const MOCK_TITLE = "MOCK_TITLE";

  beforeEach(() => {
    render(
      <TestProvider>
        <NotFound title={MOCK_TITLE} />
      </TestProvider>
    );
  });

  it("renders the title", () => {
    expect(screen.getByText(MOCK_TITLE)).toBeVisible();
  });
});
