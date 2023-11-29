import { useState } from "react";
import "./App.css";
import { run_text, BadConfig_text } from "./Services/Image-text";
import { run_generate_image, BadConfig_image } from "./Services/Generate-image";

function App() {
  const [url, setUrl] = useState("#");
  const [text, setText] = useState("");
  const [imgSrc, setIMG] = useState("");
  const [changedisplay, setchangedisplay] = useState(false);

  const handletextChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };
  const handleClickAnalyze = async () => {
    setIMG(url);
    setchangedisplay(true);
    try {
      const result = await run_text(url);
      setText(result.outputs[0].data.text.raw);
    } catch (error) {
      const resultError = BadConfig_text(error);
      if (resultError.Value) {
        setText("ERROR: " + resultError.error);
      }
    }
  };
  const handleClickGenerate = async () => {
    setchangedisplay(true);
    try {
      const result = await run_generate_image(url);
      setIMG(`data:image/jpeg;base64,${result}`);
      setText();
    } catch (error) {
      const resultError = BadConfig_image(error);
      if (resultError.Value) {
        setText("ERROR: " + resultError.error);
      }
    }
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
        }}
        onChange={handletextChange}
        type="text"
        placeholder="Enter an image url or textual prompt to generate an image"
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleClickAnalyze}>Analyze</button>
        <button onClick={handleClickGenerate}>Generate</button>
      </div>
      <main
        style={{
          padding: "10px",
          backgroundImage:
            "radial-gradient(circle, #ff9cb0, #da8aa7, #b57a99, #916a88, #705a73, #6b5972, #655871, #60576f, #716584, #83749a, #9583b1, #a892c8)",
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
            marginTop: "1rem",
          }}
          src={imgSrc}
        />
        <h4
          style={{
            color: "#fff",
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
