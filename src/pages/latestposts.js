import React from "react"
import { graphql,StaticQuery } from "gatsby"
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "gatsby"
import "../css/latestposts.scss"
import RoundCropImage from "../components/roundimage"
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import PostItem from "../components/postitem"


export default function LatestPosts() {
    return (
      <StaticQuery
        query={graphql`
        query {
          allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
              node {
                id
                excerpt(pruneLength: 150)
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
          }
        }
      `}
        render={data => postlistview(data)}
      />
    )
  }

  function postlistview(data) {
    return  <div id="main">
               <h2 id="header">Latest posts</h2>
               {getPostLists(data)}
            </div>
  }
  
 export function getPostLists(data) {
    const cardStyle = {backgroundColor : "aliceblue"};
    return <List>
    {
     data.allMarkdownRemark.edges.map(item => {
       return <PostItem item={item.node}></PostItem>
            
         
     })
    }
 </List>
  }
