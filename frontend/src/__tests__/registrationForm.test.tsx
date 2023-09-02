import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { expect, it, describe, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import RegForm from "../pages/registration/regForm";

describe("Registration form", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RegForm accessCode="doesNotMatter" />
      </BrowserRouter>
    );
  });

  it("types too long username", async () => {
    const tooLongUsername = "I".repeat(50);
    const password = "1231";

    let usernameInput = screen.getByRole("textbox", { name: /Username/i });
    let passwordInput = screen.getByLabelText("password");
    let submitBtn = screen.getByRole("button", {
      name: "Submit your registration credentials",
    });

    await user.type(usernameInput, tooLongUsername);
    await user.type(passwordInput, password);

    expect(submitBtn.getAttribute("disabled")).toBe("");
  });
  it("does not provide any credentials", () => {
    let submitBtn = screen.getByRole("button", {
      name: "Submit your registration credentials",
    });

    expect(submitBtn.getAttribute("disabled")).toBe(null);
  });
  it("types too short username and password", async () => {
    const tooShortUsername = "aa";
    const tooShortPasssword = "11";

    let usernameInput = screen.getByRole("textbox", { name: /Username/i });
    let passwordInput = screen.getByLabelText("password");
    let submitBtn = screen.getByRole("button", {
      name: "Submit your registration credentials",
    });

    await user.type(usernameInput, tooShortUsername);
    await user.type(passwordInput, tooShortPasssword);

    expect(submitBtn.getAttribute("disabled")).toBe("");
  });
  it("types correct credentials", async () => {
    const username = "username";
    const password = "password";

    let usernameInput = screen.getByRole("textbox", { name: /Username/i });
    let passwordInput = screen.getByLabelText("password");
    let submitBtn = screen.getByRole("button", {
      name: "Submit your registration credentials",
    });

    await user.type(usernameInput, username);
    await user.type(passwordInput, password);

    expect(submitBtn.getAttribute("disabled")).toBe(null);
  });
});
