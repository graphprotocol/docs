import { createContext, useContext } from 'react'

export const SSGContext = createContext<any>(false)

export const useSSG = (key = 'ssg') => useContext(SSGContext)?.[key]
