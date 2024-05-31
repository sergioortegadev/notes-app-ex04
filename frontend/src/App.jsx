import { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import NewNote from "./components/NewNote/NewNote";

function App() {
  const [notes, setNotes] = useState([]);
  const [showNew, setShowNew] = useState(false);

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

  const postNote = async (newNote) => {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });
    getNotes();
  };

  const deleteNote = async (id) => {
    const data = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    setNotes(data.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1 onClick={getNotes}>Notes</h1>
      {showNew && <NewNote setShowNew={setShowNew} postNote={postNote} />}
      <Form search={searchNote} />
      <button className="btn-add-newNote" onClick={() => setShowNew(true)}>
        Add Note ➕
      </button>
      <List notes={notes} getNotes={getNotes} deleteNote={deleteNote} />
    </>
  );
}

export default App;
