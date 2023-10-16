import React from "react";
import brain from './brain.png'
import { Tilt } from 'react-tilt'

const Logo = () => {
    return (
        <Tilt style={{borderRadius: "5rem" ,background: "linear-gradient(89deg, red, white, blue)", padding: "10px"}}>
            <img style={{padding: "20px"}} src={brain} alt="brain img"/>
        </Tilt>
    );
}


export default Logo;