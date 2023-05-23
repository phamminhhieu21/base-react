import { useState, useEffect } from 'react'

const useLocalStorage = (key: string, initialValue: string) => {
  // Tạo state để lưu trữ giá trị trong LocalStorage
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  // Lắng nghe sự thay đổi của giá trị và lưu vào LocalStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
