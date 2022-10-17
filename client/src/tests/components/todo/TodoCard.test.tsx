import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { useState as useStateMock } from "react";

import TodoCard from "../../../components/todo/TodoCard";

// mock TodoDetails because of the api request
jest.mock("../../../components/todo/TodoDetails", () => {
  return null;
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("TodoCard component", () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init: false) => [
      init,
      setState,
    ]);
  });

  it("should renders the component correctly", () => {
    render(
      <TodoCard id="abc" title="Todo 1" body="Body of the todo" done={false} />
    );

    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByText(/todo 1/i)).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const component = renderer.create(
      <TodoCard id="abc" title="Todo 1" body="Body of the todo" done={false} />
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should call setShowDetails if we click on the todo", () => {
    render(
      <TodoCard id="abc" title="Todo 1" body="Body of the todo" done={false} />
    );

    fireEvent.click(screen.getByRole("listitem"));

    expect(setState).toHaveBeenCalledTimes(1);
  });
});
