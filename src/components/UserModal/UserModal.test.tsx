import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserModal, UserModalProps } from "./UserModal";

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

  it("Cancel and <X> action should be called", () => {
    render(<UserModal {...props} />);
    const actions = screen.getAllByRole("button");

    fireEvent.click(actions[0]);
    expect(props.onCancel).toHaveBeenCalled();

    fireEvent.click(actions[2]);
    expect(props.onCancel).toHaveBeenCalled();
  });

  it("Save action should be called", async () => {
    const editedUser = {
      email: "editedUser@jitera.com",
      id: 1,
      name: "Leanne Graham",
      phone: "editedUser",
      website: "https://editedUser.com",
    };

    render(<UserModal {...props} />);
    const actions = screen.getAllByRole("button");
    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], { target: { value: "" } });
    fireEvent.change(inputs[0], { target: { value: editedUser.email } });
    fireEvent.change(inputs[1], { target: { value: "" } });
    fireEvent.change(inputs[1], { target: { value: editedUser.phone } });
    fireEvent.change(inputs[2], { target: { value: "" } });
    fireEvent.change(inputs[2], { target: { value: editedUser.website } });

    const emailElement = screen.getByDisplayValue(editedUser.email);
    const phoneElement = screen.getByDisplayValue(editedUser.phone);
    const websiteElement = screen.getByDisplayValue(editedUser.website);

    expect(emailElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
    expect(websiteElement).toBeInTheDocument();

    fireEvent.click(actions[1]);

    await waitFor(() => {
      expect(props.onSave).toHaveBeenCalledWith({ ...editedUser });
    });
  });
});
