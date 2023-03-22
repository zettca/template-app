import React from "react";
import { render, screen } from "@testing-library/react";
import { TestProvider } from "~/tests/providers";
import Loading from ".";

describe("<Loading />", () => {
  const MOCK_LABEL = "MOCK_LABEL";

  beforeEach(() => {
    render(
      <TestProvider>
        <Loading label={MOCK_LABEL} />
      </TestProvider>
    );
  });

  it("renders the label", () => {
    expect(screen.getByText(MOCK_LABEL)).toBeVisible();
  });

  it("renders the aria loading", () => {
    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});
