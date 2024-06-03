import { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import NewNote from "./components/NewNote/NewNote";
import ListArchive from "./components/ListArchive/ListArchive";

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showNew, setShowNew] = useState(false);

  const endpoint = "http://localhost:5000/v1/notes";

  const getNotes = async () => {
    const data = await fetch(endpoint).then((res) => res.json());
    const active = data.data.filter((el) => !el.isCompleted);
    setNotes(active);
  };

  const getArchiveNotes = async () => {
    const data = await fetch(endpoint).then((res) => res.json());
    const disactive = data.data.filter((el) => el.isCompleted);
    setArchivedNotes(disactive);
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

  const putNote = async (e, modified) => {
    e.preventDefault();
    await fetch(`${endpoint}/${modified.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modified),
    });
    getNotes();
  };

  const putArchive = async (e, id) => {
    e.preventDefault();
    await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: true }),
    });
    getNotes();
    getArchiveNotes();
  };

  const putDisarchive = async (e, id) => {
    e.preventDefault();
    await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: false }),
    });
    getNotes();
    getArchiveNotes();
  };

  const deleteNote = async (e, id) => {
    e.preventDefault();
    await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    getNotes();
    getArchiveNotes();
  };

  useEffect(() => {
    getNotes();
    getArchiveNotes();
  }, []);

  return (
    <>
      <h1 onClick={getNotes}>Notes</h1>
      {showNew && <NewNote setShowNew={setShowNew} postNote={postNote} />}
      <Form searchNote={searchNote} getNotes={getNotes} />
      <button className="btn-add-newNote" onClick={() => setShowNew(true)}>
        Add Note ➕
      </button>
      <List notes={notes} getNotes={getNotes} putNote={putNote} putArchive={putArchive} deleteNote={deleteNote} />
      <ListArchive
        archivedNotes={archivedNotes}
        getArchiveNotes={getArchiveNotes}
        putDisarchive={putDisarchive}
        deleteNote={deleteNote}
      />
    </>
  );
}

export default App;
