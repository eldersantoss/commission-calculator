import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Layout from ".";

describe("Container Component", () => {
  it("Should display side bar on click in IconMenu button", async () => {
    render(
      <Layout>
        <></>
      </Layout>
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    const topBarButton = screen.getByLabelText("Expandir SideBar");

    await userEvent.click(topBarButton);

    screen.findByRole("menu");
  });
});
