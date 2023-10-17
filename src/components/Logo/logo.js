import React from "react";
import brain from './brain.png'
import { Tilt } from 'react-tilt'

const Logo = () => {
    return (
        <div style={{padding: 10}}>
        <Tilt className="pa5 shadow-5 br44" style={{borderRadius: "5rem" ,background: "linear-gradient(89deg, blue, white, red)", padding: 3}}>
            <img style={{padding: "20px"}} src={brain} alt="brain img"/>
        </Tilt>
        </div>
    );
}


export default Logo;