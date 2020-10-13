import React from "react"
import Layout from "../components/layout"
import LatestPosts from "../pages/latestposts"


export default function Home() {

  const mainContentCss = { width : "100%",
     display : "flex",
     flexDirection : "row",
     justifyContent : "center"
  }

  return (
    <Layout >
       <div id="main_content" style={mainContentCss}>
             <LatestPosts/>
       </div>
     
    </Layout>
  );
}
