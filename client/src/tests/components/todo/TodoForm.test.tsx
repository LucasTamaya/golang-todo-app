import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AppContext } from "../../../context/AppContext";
import TodoForm from "../../../components/todo/TodoForm";
import { renderWithClient } from "../../msw/helpers";
import { mockedSetTodosList, mockedTodosList } from "./TodoDetails.test";

jest.mock("../../../api/todo", () => {
  return null;
});

const MockedComponent: React.FC = () => {
  return (
    <AppContext.Provider
      value={{
        todosList: mockedTodosList,
        setTodosList: mockedSetTodosList,
      }}
    >
      <TodoForm />
    </AppContext.Provider>
  );
};

describe("TodoForm component", () => {
  it("should renders the component correctly", () => {
    renderWithClient(<MockedComponent />);

    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/body/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add a todo/i })
    ).toBeInTheDocument();
  });

  it("should calls setTodosList to add a todo if we fill in the form correctly and click on the button", () => {
    renderWithClient(<MockedComponent />);

    // here we fill in the form
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "Todo 1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/body/i), {
      target: { value: "Make the bed" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add a todo/i }));

    expect(mockedSetTodosList).toHaveBeenCalledTimes(1);
  });

  it("should not calls setTodosList if we don't fill in the form correctly and click on the button", () => {
    renderWithClient(<MockedComponent />);

    // here we don't fill in the form
    fireEvent.click(screen.getByRole("button", { name: /add a todo/i }));

    expect(mockedSetTodosList).toHaveBeenCalledTimes(0);
  });
});
