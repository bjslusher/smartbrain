import React from "react";
import "./ImageLinkForm.css"


const ImageLinkForm = ({onInputChange, onButtonClick}) => {

    return (
        <div>
            <p className="dark-green f3 b">
            {"Feed me an image and I will show you the faces!"}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 p2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-dark-green" onClick={onButtonClick}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;