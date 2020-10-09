import React from "react"
import "../css/global.scss"
import "../css/layout.scss"

export default function Layout({ children }) {
  

  
  return (
    <div>
      <div id="layout_header">
      <h1>AppContext</h1>
      </div>
      {children}
    </div>
  )
}