import React from "react"
import "../css/global.scss"
import "../css/layout.scss"
import { Link } from "gatsby"

export default function Layout({ children }) {
  

  
  return (
    <div id="layout_main">
      <div id="layout_header">
        <div id="site_label_holder">
            <Link to="/" style={{color : "white",paddingRight : "20px",textDecoration : "none"}}>
            <h2>FlatMap</h2>
            </Link>
            <h5>The Android developer blog</h5>
         </div> 
      
       <div id="other_links">
       <Link to="/authors" style={{color : "white",paddingRight : "20px",textDecoration : "none"}}><h4>Authors</h4></Link>
       <Link to="/about" style={{color : "white",paddingRight : "20px",textDecoration : "none"}}><h4>About</h4></Link>
       </div>
      </div>
      <div id="child_holder" >
          {children}
      </div>
      
    </div>
  )
}