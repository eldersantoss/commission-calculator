import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Container from ".";

describe("Container Component", () => {
  it("Should display side bar on click in IconMenu button", async () => {
    render(
      <Container>
        <></>
      </Container>
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    const topBarButton = screen.getByLabelText("Expandir SideBar");

    await userEvent.click(topBarButton);

    screen.findByRole("menu");
  });
});
