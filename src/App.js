import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {} = state;

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");

        const data = await res.json();
        dispatch({ type: "dataReceived", payLoad: data });
      } catch (err) { 
        dispatch({ type: "dataFailed"})
      }
    }

    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>question?</p>
      </Main>
    </div>
  );
}
