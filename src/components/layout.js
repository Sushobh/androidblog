import React from "react"


export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <h3>AppContext</h3>
      {children}
    </div>
  )
}