import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import Button from "../../../components/common/Button";

const mockedFn = jest.fn();

describe("Button component", () => {
  it("should match the snapshot", () => {
    const component = renderer.create(
      <Button title="Button" bgColor="bg-teal-400" onClick={mockedFn} />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should call the function that we pass in props if we click on the button", () => {
    render(<Button title="Button" bgColor="bg-teal-400" onClick={mockedFn} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /button/i,
      })
    );

    expect(mockedFn).toHaveBeenCalledTimes(1);
  });
});
