import React from "react";
import Logo from "../Logo/logo";

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: "space-between"}}>
            <div><Logo /></div>
            <div><p  className= 'f3 link dim underline pa3 pointer'>Sign Out</p></div>
        </nav>
    );
}

export default Navigation;
