'use client'

import React from 'react'

export const CartList = React.createContext<any>({})
export const CartListProvider = ({ children }: any) => {
  const [cartProductList, setCartProductList] = React.useState([])

  return (
    <CartList.Provider value={{ cartProductList, setCartProductList }}>
      {children}
    </CartList.Provider>
  )
}

export const SearchValue = React.createContext<any>({})
export const SearchValueProvider = ({ children }: any) => {
  const [value, setValue] = React.useState('')

  return (
    <SearchValue.Provider value={{ value, setValue }}>
      {children}
    </SearchValue.Provider>
  )
}
