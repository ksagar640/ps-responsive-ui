import React from 'react'
import { Button as MuiButton } from "@material-ui/core";

export default function Button(props) {

    const { text, color, variant, onClick } = props

    return (
        <MuiButton
            variant={variant || "contained"}
            color={color || "primary"}
            onClick={onClick}>
            {text}
        </MuiButton>
    )
}