import React, {useState} from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from 'particles-bg'
import './App.css';


function App() {
    const [input, setInput] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [box, setBox] = useState({})
    const [route , setRoute] = useState("signin")
    const [isSignedIn, setIsSignedIn] = useState(false)

    const returnClarifaiRequestOptions = (imageURL) => {
        const PAT = 'f9073df9ab234435a9ffabc21e3c6f38';
        const USER_ID = 'bjslush';
        const APP_ID = 'smartBrain';
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

    const onRouteChange = (route) => {
        if (route === "signin") {
            setIsSignedIn(false)
        } else if (route === "home") {
            setIsSignedIn(true)
        }
        setRoute(route)
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
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
        {route === "home"
            ?<div>
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onButtonClick={onButtonClick} />
            <FaceRecognition box={box} imageURL={imageURL} />
            </div>
            :(
                route === "signin"
                ?
                <SignIn onRouteChange={onRouteChange}/>
                :
                <Register onRouteChange={onRouteChange}/>
            )
        }
    </div>
  );
}

export default App;
