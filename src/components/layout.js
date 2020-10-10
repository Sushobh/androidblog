import React from "react"
import "../css/global.scss"
import "../css/layout.scss"
import { Link } from "gatsby"

export default function Layout({ children }) {
  

  
  return (
    <div>
      <div id="layout_header">
      <h1>AppContext</h1>
      <Link to="/about" style={{color : "white",paddingRight : "20px",textDecoration : "none"}}><h3>About</h3></Link>
      </div>
      {children}
    </div>
  )
}