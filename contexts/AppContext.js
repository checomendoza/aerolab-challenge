import {useEffect, useState, useContext, createContext } from 'react';
import {getUser} from '../api/User'

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [redeem, setRedeem]=useState(false)

  useEffect(()=>{
    getDataUser()
}, [redeem])

const getDataUser = ()=>{
  getUser().then((res)=>{
    setUser(res.data)
})
}
  // Interface donde será expuesto como proveedor y envolverá la App.
  return <AppContext.Provider 
  value={{user, redeem, setRedeem, getDataUser}}>
      {children}
  </AppContext.Provider>;
}

//
export function useAppContext() {
  const context = useContext(AppContext);

  if(!context){
    console.error('Error deploying App Context!!!');
  }

  return context;
}

export default useAppContext;