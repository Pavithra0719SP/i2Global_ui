"use client"; 

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

interface Props {
  children: ReactNode;
}

const ProviderWrapper = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
