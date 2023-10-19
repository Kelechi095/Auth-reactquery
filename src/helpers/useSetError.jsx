import React, { useEffect, useState } from "react";

export default function useSetError(error) {
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    setCustomError(error);
    const id = setTimeout(() => {
      setCustomError("");
    }, 3000);

    return () => clearTimeout(id);
  }, [error]);

  return { customError };
}
