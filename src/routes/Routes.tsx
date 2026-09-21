import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../layout/Wrapper";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Transactions = lazy(() => import("../pages/Transactions"));

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <p className="h-screen flex bg-zinc-900 justify-center items-center text-xl text-emerald-500">
                Loading...
              </p>
            }
          >
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "transactions",
        element: (
          <Suspense
            fallback={
              <p className="h-screen flex bg-zinc-900 justify-center items-center text-xl text-emerald-500">
                Loading...
              </p>
            }
          >
            <Transactions />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Routes;
