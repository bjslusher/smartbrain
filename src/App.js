import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'
import './App.css';

function App() {
  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={10} bg={true} />
      <Navigation />
      <Rank />
      <ImageLinkForm />
        {/*<FaceRecognition /> */}

    </div>
  );
}

export default App;
