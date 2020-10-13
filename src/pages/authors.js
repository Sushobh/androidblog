
import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "gatsby"
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
export default function AuthorList({data}) {

    const authors_mainStyle = {
        marginTop : "20px",
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    }

    let uniqueAuthors = new Set();
    data.allMarkdownRemark.nodes.map(element => {
        uniqueAuthors.add(element.frontmatter.author);
        return element;
    });

    return <Layout>
        <div id="authors_main" style={authors_mainStyle}>
              <h3>Authors</h3>
              <List>
                  {
                    Array.from(uniqueAuthors).map(item => {
                        return <Link to={'/authors/'+item} className="link">  
                            <ListItem button>
                            <ListItemText primary={item}></ListItemText>
                            
                            </ListItem>
                            </Link>
                            
                    })
                  }
              </List>
        </div>
    </Layout>
}

export const pageQuery = graphql`query MyQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          author
        }
      }
    }
  }
  
`