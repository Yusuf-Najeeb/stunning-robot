import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Counter from "./components/Counter";
import Missing from "./components/Missing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Missing />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <PostPage />,
      },
      {
        path: "/newPost",
        element: <NewPost />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/count",
        element: <Counter />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
