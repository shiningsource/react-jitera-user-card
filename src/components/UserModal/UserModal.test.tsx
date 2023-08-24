import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserModal, UserModalProps } from "./UserModal";
import exp from "constants";

const user = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  avatar:
    "https://avatars.dicebear.com/v2/avataaars/{{Leanne_Graham}}.svg?options[mood][]=happy",
  website: "http://hildegard.org",
  favorite: false,
};

const props: UserModalProps = {
  user,
  isOpen: true,
  onSave: jest.fn(),
  onCancel: jest.fn(),
};

describe("userModal", () => {
  it("render the user info", () => {
    render(<UserModal {...props} />);
    const nameElement = screen.getByText(user.name);
    const emailElement = screen.getByDisplayValue(user.email);
    const phoneElements = screen.getByDisplayValue(user.phone);
    const websiteElements = screen.getByDisplayValue(user.website);

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(phoneElements).toBeInTheDocument();
    expect(websiteElements).toBeInTheDocument();
  });

  it("Cancel and X action should be called", () => {
    render(<UserModal {...props} />);
    const actions = screen.getAllByRole("button");

    fireEvent.click(actions[0]);
    expect(props.onCancel).toHaveBeenCalled();

    fireEvent.click(actions[2]);
    expect(props.onCancel).toHaveBeenCalled();
  });
});
