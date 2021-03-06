import React from "react"
import { graphql } from "gatsby"
import "../css/blogtemplate/blogtemplate.scss"
import Layout from "../components/layout"


import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <br/>
        <div id="blog_details">
          <h2>{frontmatter.date}</h2>
          <img src={frontmatter.author.image} id="avatar"></img>
          <h2>{frontmatter.author.name}</h2>
        </div>
        <br/>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    </Layout>
    
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author {
          name
          image
        }
      }
    }
  }
`