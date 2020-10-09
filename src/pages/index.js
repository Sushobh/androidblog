import React from "react"
import Layout from "../components/layout"

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Home() {
  return (
    <Layout >
      <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
       
      </div>
      
    </Layout>
  );
}
