import { useEffect, useState } from "react";
import "./List.css";

const List = ({ notes, getNotes, putNote, putArchive, deleteNote }) => {
  const [note, setNote] = useState([]);
  const [edit, setEdit] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(null);
  };

  const handleEdit = (note) => {
    if (edit === null) setEdit(note);
  };

  const handlePut = (e, modified, note) => {
    if (JSON.stringify(modified) === JSON.stringify(note)) return;
    putNote(e, modified);
    setEdit(null);
  };

  const handleIsCompleted = (e, id) => {
    const confirmation = confirm(`confirm archive note id: ${id}?`);
    confirmation ? putArchive(e, id) : setEdit(null);
  };

  const handleDelete = (e, id) => {
    const confirmation = confirm(`confirm deletion note id: ${id}?`);
    confirmation ? deleteNote(e, id) : setEdit(null);
  };

  useEffect(() => {
    setNote(notes);
  }, [notes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEdit(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setEdit]);

  return (
    <>
      <section
        className="cards"
        onClick={() => {
          setEdit(null);
        }}
      >
        {note ? (
          note.map((note) => (
            <figure
              key={note.id}
              className={"card " + (edit?.id === note.id ? edit.category : note.category)}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(note);
              }}
            >
              <div className="card-note-category">
                {edit?.id === note.id ? (
                  <select name="category" value={edit.category} onChange={handleChange}>
                    <option value="" disabled>
                      🎨
                    </option>
                    <option value="white">⬜</option>
                    <option value="red">🔴</option>
                    <option value="green">🟢</option>
                    <option value="blue">🔵</option>
                    <option value="yellow">🟡</option>
                    <option value="orange">🟠</option>
                    <option value="magenta">🟣</option>
                    <option value="black">⬛</option>
                  </select>
                ) : (
                  "🎨"
                )}
                <span className="card-note-category-hovertext">Category</span>
              </div>
              <div className="card-note-isCompleted" onClick={(e) => handleIsCompleted(e, note.id)}>
                <img src="./assets/box-archive.svg" alt="archivar" />
                <span className="card-note-isCompleted-hovertext">Archive</span>
              </div>
              {edit?.id === note.id ? (
                <>
                  <form onSubmit={handleSubmit} className="pn-form">
                    <textarea name="title" value={edit.title} onChange={handleChange} autoFocus />
                    <textarea name="description" value={edit.description} onChange={handleChange} />
                    <div className="pn-form-btn">
                      <button onClick={(e) => handlePut(e, edit, note)}>SAVE</button>
                      <button>CANCEL</button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="card-data">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                  </div>
                  <button className="card-delete-btn" onClick={(e) => handleDelete(e, note.id)}>
                    🗑
                  </button>
                </>
              )}
            </figure>
          ))
        ) : (
          <div className="no-notes" onClick={getNotes}>
            <h3>No notes</h3>
            <button>List all notes from DB</button>
            <img src="./assets/no-data.jpg" alt="robot no data" />
          </div>
        )}
      </section>
    </>
  );
};

export default List;
