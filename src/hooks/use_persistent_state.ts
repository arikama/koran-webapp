import { useEffect, useState } from "react"

export function usePersistentState<T>(storageKey: string, initialState: T): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(initialState)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blob = window.localStorage.getItem(storageKey)
      if (blob) {
        const parsed = JSON.parse(blob) as T
        if (parsed) {
          setState(parsed)
        }
      }
    }
  }, [storageKey])

  const update = (newState: T) => {
    setState(newState)
    if (typeof window !== "undefined") {
      const blob = JSON.stringify(newState)
      window.localStorage.setItem(storageKey, blob)
    }
  }

  return [state, update]
}
