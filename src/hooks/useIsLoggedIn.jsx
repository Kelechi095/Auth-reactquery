import React from 'react'

export default function useIsLoggedIn() {

    const isLoggedIn = localStorage.getItem("user") ? true : false

  return {isLoggedIn}
}
