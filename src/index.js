import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./i18n";
import { QuestionnairesProvider } from "./context/questionnaires";

import ErrorPage from "./component/ErrorPage";
import Main from "./component/Main";

const routes = [
  {
    path: "/",
    element: (
      <>
        <QuestionnairesProvider>
          <Main />
        </QuestionnairesProvider>
      </>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const router = createHashRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <NextUIProvider>
    <RouterProvider router={router} />
  </NextUIProvider>
);
