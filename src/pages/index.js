import React from "react"
import Layout from "../components/layout"

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Home() {
  return (
    <Layout>
       <h4>Welcome to AppContext , the Android developer blog.</h4>
    </Layout>
  );
}
