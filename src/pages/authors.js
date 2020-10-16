
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
import RoundCropImage from "../components/roundimage"
export default function AuthorList({data}) {

    const authors_mainStyle = {
        marginTop : "20px",
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    }
    const cardStyle = {margin : "10px"};
    return <Layout>
        <div id="authors_main" style={authors_mainStyle}>
              <h3>Authors</h3>
              <List>
                  {
                   data.allAuthorsJson.nodes.map(item => {
                        return <Card  style={cardStyle}>
                           <CardContent>
                           <Link to={'/authors/'+item.id} className="link">  
                            <ListItem button>
                            <ListItemText primary={item.name}></ListItemText>
                            <RoundCropImage imagepath={item.image} dimen="60px"></RoundCropImage>
                            </ListItem>
                            </Link>
                           </CardContent>
                         </Card>
                          
                            
                    })
                  }
              </List>
        </div>
    </Layout>
}

export const pageQuery = graphql`
{
  allAuthorsJson {
    nodes {
      id
      image
      name
    }
  }
}
  
`