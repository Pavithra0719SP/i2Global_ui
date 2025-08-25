"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginPage from "./portal/login/components/signInView";

function Projects() {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
}

export default Projects;
