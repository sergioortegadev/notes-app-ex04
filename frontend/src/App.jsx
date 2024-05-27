import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  const getNotes = () => {
    return (async () => {
      const data = await fetch("http://localhost:5000/v1/notes").then((res) => res.json());
      setText(data.message);
      return await data.message;
    })();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1>Notes</h1>
      <div className="text">{text}</div>
    </>
  );
}

export default App;
