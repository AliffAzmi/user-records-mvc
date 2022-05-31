import React, { useContext } from 'react'

const StoreContext = React.createContext<any>({})
export const useStore = () => useContext(StoreContext)

interface Props {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = React.useState([])
  const value = {
    users,
    setUsers
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
