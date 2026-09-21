import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import ReduxProvider from "./services/helper/provider/ReduxProvider";

const App = () => {
  return (
    <>
     <ReduxProvider>
      <RouterProvider router={Routes} />
    </ReduxProvider>
    </>
  );
};

export default App;
