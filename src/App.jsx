import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import run from "./Services/Image-text";

function App() {
  const [url, setUrl] = useState("#");
  const [text, setText] = useState("");
  const [imgSrc, setIMG] = useState("");
  const [changedisplay, setchangedisplay] = useState(false);

  const handletextChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };
  const handleClick = async () => {
    setIMG(url);
    setchangedisplay(true);
    const img = await run(url).then((result) => {
      setText(result.outputs[0].data.text.raw);
    });
  };
  return (
    <>
      <h1>Analyze an image with Azure Cognitive Services</h1>
      <input
        style={{
          padding: "10px",
          borderRadius: "24px",
          border: "none",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          width: "80%",
          outline: "none",
          fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
          color: "rgba(255, 255, 255, 0.87)",
        }}
        onChange={handletextChange}
        type="text"
        placeholder="Enter an image url or textual prompt to generate an image"
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleClick}>Analyze</button>
        <button>Generate</button>
      </div>
      <main
        style={{
          padding: "10px",
          backgroundColor: "#a67da8",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginTop: "1rem",
          display: changedisplay ? "block" : "none",
        }}
      >
        <img
          style={{
            width: "440px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }
          src={imgSrc}
        />
        <h4
          style={{
            color: "#333",
            fontSize: "18px",
            lineHeight: "1.6",
            marginTop: "10px",
          }}
        >
          {text}
        </h4>
      </main>
    </>
  );
}

export default App;
