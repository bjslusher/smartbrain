import React, {useState} from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from 'particles-bg'
import './App.css';


function App() {
    const [input, setInput] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [box, setBox] = useState({})

    const returnClarifaiRequestOptions = (imageURL) => {
        const PAT = 'f9073df9ab234435a9ffabc21e3c6f38';
        // Specify the correct user_id/app_id pairings
        // Since you're making inferences outside your app's scope
        const USER_ID = 'bjslush';
        const APP_ID = 'smartBrain';
        // Change these to whatever model and image URL you want to use

        ///////////////////////////////////////////////////////////////////////////////////
        // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
        ///////////////////////////////////////////////////////////////////////////////////

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": imageURL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
        return requestOptions
    };

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    const displayFaceBox = (box) => {
        setBox(box)
    }
    const onInputChange = (event) => {
        setInput(event.target.value)
    }
    const onButtonClick = event => {
        setImageURL(input)
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
            .then(response => response.json())
            .then(response => displayFaceBox(calculateFaceLocation(response)))

            .catch(error => console.log('error', error));
    }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={150} bg={true} />
      <Navigation />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonClick={onButtonClick} />
      <FaceRecognition box={box} imageURL={imageURL} />
    </div>
  );
}

export default App;
