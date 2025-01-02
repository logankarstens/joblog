'use server'

import { createContext, useEffect, useState } from 'react';
import React from 'react';

import router from "next/router";


const UserContext = createContext({
  user: null,
  setUser: (user) => {}
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({ username: "fleud" }); //Default user: temporary

  const retrieveSessionUser = async () => {
    const response = await fetch('/api/user');

    if (response.status == 200) {
      const user = await response.json();
      console.log(user)
      if (user)
        setUser(user); 
    } 
  }

  const updateSessionUser = async (user) => {
    const response = await fetch('/api/user', {
      method: "POST",
      body: JSON.stringify(user)
    })

    if (response.status == 200)
      router.reload();
  }
  
  useEffect(() => { retrieveSessionUser(); }, []);
    
  return (
    <UserContext.Provider value={{user: user, setUser: updateSessionUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext;