import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoDetails from "../../../components/todo/TodoDetails";
import { renderWithClient } from "../../msw/helpers";
import { AppContext } from "../../../context/AppContext";
import ITodo from "../../../interfaces/todo";

interface Props {
  mockedDoneState: boolean;
}

jest.mock("../../../api/todo", () => {
  return null;
});

const mockedTodosList: ITodo[] = [];
const mockedSetTodosList = jest.fn();
const mockedSetShowDetails = jest.fn();

const MockedComponent: React.FC<Props> = ({ mockedDoneState }) => {
  return (
    <AppContext.Provider
      value={{
        todosList: mockedTodosList,
        setTodosList: mockedSetTodosList,
      }}
    >
      <TodoDetails
        id="abc"
        title="Todo 1"
        body="Make the bed"
        done={mockedDoneState}
        setShowDetails={mockedSetShowDetails}
      />
    </AppContext.Provider>
  );
};

describe("TodoDetails components", () => {
  it("should renders the component correctly", () => {
    renderWithClient(<MockedComponent mockedDoneState={false} />);

    expect(screen.getAllByRole("heading")).toHaveLength(2);
    expect(screen.getByText(/make the bed/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should renders a button with the text 'Mark as finished' if the props done is false", () => {
    renderWithClient(<MockedComponent mockedDoneState={false} />);

    expect(
      screen.getByRole("button", {
        name: /marked as finished/i,
      })
    ).toBeInTheDocument();
  });

  it("should renders a button with the text 'Not yet finished' if the props done is true", () => {
    renderWithClient(<MockedComponent mockedDoneState={true} />);

    expect(
      screen.getByRole("button", {
        name: /not yet finished/i,
      })
    ).toBeInTheDocument();
  });

  it("should calls setTodosList to update the todosList if we click on the 'Mark as finished' button", () => {
    renderWithClient(<MockedComponent mockedDoneState={false} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /marked as finished/i,
      })
    );

    expect(mockedSetTodosList).toHaveBeenCalledTimes(1);
    expect(mockedSetShowDetails).toHaveBeenCalledWith(false);
  });

  it("should calls setTodosList to update the todosList if we click on the 'Not yet finished' button", () => {
    renderWithClient(<MockedComponent mockedDoneState={true} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /not yet finished/i,
      })
    );

    expect(mockedSetTodosList).toHaveBeenCalledTimes(1);
    expect(mockedSetShowDetails).toHaveBeenCalledWith(false);
  });

  it("should calls setTodosList to delete the current todo if we click on the 'Delete' button", () => {
    renderWithClient(<MockedComponent mockedDoneState={false} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /delete/i,
      })
    );

    expect(mockedSetTodosList).toHaveBeenCalledTimes(1);
    expect(mockedSetShowDetails).toHaveBeenCalledWith(false);
  });
});
