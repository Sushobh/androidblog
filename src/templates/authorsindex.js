import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import PostItem from "../components/postitem"
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link } from "gatsby"

export default function AuthorTemplate({data}){
return  <Layout>
          {postlistview(data)}
        </Layout>
}

function postlistview(data) {
  const authorName =  data.allMarkdownRemark.nodes[0].frontmatter.author.name;
  return  <div id="main">
             <h2 id="header">Posts by {authorName}</h2>
             {getPostLists(data)}
          </div>
}

export function getPostLists(data) {

  return <List>
  {
   data.allMarkdownRemark.nodes.map(item => {
     return <PostItem item={item}></PostItem>
   })
  }
</List>
}




export const pageQuery = graphql`
query ($author: String) {
  allMarkdownRemark(filter: {frontmatter: {author: 
  
    {
      id :{eq: $author}
    }
  
  }}) {
    nodes {
      id
      frontmatter {
        author {
          name
          image
        }
        title
        slug
        date
      }
      excerpt
    }
  }
}

`



