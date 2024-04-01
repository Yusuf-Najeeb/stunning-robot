import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter/counterSlice";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export AppDispatch = store.dispatch
