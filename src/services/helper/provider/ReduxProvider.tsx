import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../../store/Store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
