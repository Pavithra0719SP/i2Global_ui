"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import LoginContainer from "./components/loginContiner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoginContainer />
    </Provider>
  );
}
