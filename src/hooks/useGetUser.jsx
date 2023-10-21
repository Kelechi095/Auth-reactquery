import { useState } from "react";


export default function useGetUser() {
  const user = localStorage.getItem("user")

  
  return { user};
}
