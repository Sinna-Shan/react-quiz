import { useReducer } from "react";

const initialState = { count: 0, step: 1 }

function reducer(state, action) { 
  console.log(state, action);

  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return {...state, count: state.count - state.step}
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return {...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Invalid action');
  }

 }


function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date('2024-07-31');
  date.setDate(date.getDate() + count);

  function defineStep(e) {
    dispatch({type: 'setStep', payload: Number(e.target.value)});
  }

  function defineCount(e) {
    dispatch({type: 'setCount', payload: Number(e.target.value)});
  }

  function dec() {
    dispatch({type: 'dec'});
  }

  function inc() {
    dispatch({type: 'inc'});
  }

  function reset() {
    dispatch({type: 'reset'});
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
