
import React from "react"
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card'
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link } from "gatsby"
import RoundCropImage from "../components/roundimage"

export default function PostItem(props){
    const cardStyle = {};
    const item = props.item;
    return <Card id="list_item" key={item.id} style={cardStyle}>
    <CardContent>
    <Link to={item.frontmatter.slug} className="link">
       <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
       <ListItemText primary={item.frontmatter.title} />
       <RoundCropImage imagepath={item.frontmatter.author.image} dimen="50px"/>
       </div>
       <ListItemText  primary={item.frontmatter.author.name} />
       <ListItemText  secondary={item.excerpt} />
     </Link>
    </CardContent>
 </Card>
}