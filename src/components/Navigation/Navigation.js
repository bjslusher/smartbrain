import React from "react";
import Logo from "../Logo/logo";

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: "space-between"}}>
                    <div><Logo/></div>
                    <div><p onClick={() => onRouteChange("signin")}
                            className='white f3 link dim underline pa3 pointer'>Sign Out</p></div>
                </nav>);
        }else {
            return (
                <nav style={{display: 'flex', justifyContent: "space-between"}}>
                    <div><Logo/></div>
                        <span>
                            <p onClick={() => onRouteChange("signin")}
                                className='black f3 b link dim underline pa3 pointer'>Sign In</p>
                        </span>
                        <span>
                            <p onClick={() => onRouteChange("register")}
                               className='white f3 b link dim underline pa3 pointer'>Register</p>
                        </span>
                </nav>)
        }
}

export default Navigation;
