import { Dispatch, SetStateAction, createContext, useState } from "react";

interface AppContextProps {
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
  openSideBar: boolean;
  toggleSideBar: () => void;
  displayedMessagePopup: string;
  setDisplayedMessagePopup: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps>({
  pageTitle: "",
  setPageTitle: () => {},
  openSideBar: false,
  toggleSideBar: () => {},
  displayedMessagePopup: "",
  setDisplayedMessagePopup: () => {},
});

export function AppProvider({ children }: any) {
  const [pageTitle, setPageTitle] = useState<string>("Vendas");
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [displayedMessagePopup, setDisplayedMessagePopup] =
    useState<string>("");

  function toggleSideBar() {
    setOpenSideBar(!openSideBar);
  }

  const values = {
    pageTitle,
    setPageTitle,
    openSideBar,
    toggleSideBar,
    displayedMessagePopup,
    setDisplayedMessagePopup,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
