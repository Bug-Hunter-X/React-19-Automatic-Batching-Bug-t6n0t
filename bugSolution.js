The issue can be resolved by explicitly flushing updates using `ReactDOM.unstable_batchedUpdates` or by refactoring state management to use `useReducer`.  Here's an example using `useReducer`:

```javascript
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleAsyncUpdate = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch({ type: 'UPDATE', payload: state.count + 1 });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleAsyncUpdate}>Update Async</button>
    </div>
  );
};

export default MyComponent;
```

Alternatively, if using `ReactDOM.unstable_batchedUpdates`:
```javascript
import ReactDOM from 'react-dom/client';
// ... your component
ReactDOM.unstable_batchedUpdates(() => {
    // multiple state updates here
});
```