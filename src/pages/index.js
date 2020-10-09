import React from "react"
import Layout from "../components/layout"

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Home() {
  return (
    <Layout>
       <h2>Welcome to AppContext , the Android developer blog.</h2>
       <h4>Congratulations , you have found a greate place for 
         quality content on Android development. 
         We , the maintainers of this blog are on always on top of cutting edge
         technologies and trends related to Android development.
         We have years of experience building and publishing Android
         apps and are obsessed with developing apps the right way.
         Right from naming conventions to architecting large scale 
         multi module apps we are laser focused on best practices.
         All of this convinced us that it would be a great idea to 
         share our knowledge and expereinces with the wider internet. 
         Do hang around the blog for a little while, we are sure 
         that you will find the content here engrossing. 
       </h4>
    </Layout>
  );
}
