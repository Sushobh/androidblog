import React from "react"

export default function RoundCropImage(props){

    const style = {
        width : props.dimen,
        height : props.dimen,
        borderRadius : "40%",
        margin : "10px"
    }

    return <img src={props.imagepath} style={style}/>
}