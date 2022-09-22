import { createContext, useContext, useState } from 'react'

export const appContext = createContext()

export const Provider = ({ children }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)

  return (
    <appContext.Provider value={{ selectedPropertyId, setSelectedPropertyId }}>
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => useContext(appContext)
