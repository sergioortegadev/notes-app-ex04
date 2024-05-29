import { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";

function App() {
  const [notes, setNotes] = useState([]);
  const endpoint = "http://localhost:5000/v1/notes";

  const getNotes = async () => {
    const data = await fetch(endpoint).then((res) => res.json());
    setNotes(data.data);
  };

  const searchNote = async (text) => {
    const titSearch = await fetch(`${endpoint}?title=${text}`).then((res) => res.json());

    const descriptionSearch = await fetch(`${endpoint}?description=${text}`).then((res) => res.json());

    const combinedSearch = () => {
      if (titSearch.data && descriptionSearch.data) {
        const combS = [...titSearch.data, ...descriptionSearch.data];
        const uniqueObj = {};
        combS.forEach((item) => {
          uniqueObj[item.id] = item;
        });
        return Object.values(uniqueObj);
      } else if (titSearch.data) {
        return titSearch.data;
      } else return descriptionSearch.data;
    };
    const data = combinedSearch();
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1 onClick={getNotes}>Notes</h1>
      <Form search={searchNote} />
      <List notes={notes} getNotes={getNotes} />
    </>
  );
}

export default App;
