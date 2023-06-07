import {Dispatch, SetStateAction, createContext, useState} from "react"


interface AppContextProps {
  pageTitle: string,
  setPageTitle: Dispatch<SetStateAction<string>>,
  openSideBar: boolean,
  toggleSideBar: () => void
}

export const AppContext = createContext<AppContextProps>({
  pageTitle: "",
  setPageTitle: () => {},
  openSideBar: false,
  toggleSideBar: () => {}
})

export function AppProvider({ children }: any) {

  const [pageTitle, setPageTitle] = useState<string>("Vendas")
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)

  function toggleSideBar() {
    setOpenSideBar(!openSideBar)
  }

  const values = {
    pageTitle,
    setPageTitle,
    openSideBar,
    toggleSideBar
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}
