import { useEffect, useState } from "react";
import "./List.css";

const List = ({ notes, getNotes }) => {
  const [note, setNote] = useState([]);

  useEffect(() => {
    setNote(notes);
  }, [notes]);

  return (
    <>
      <section className="cards">
        {note ? (
          note.map((note) => (
            <figure key={note.id} className={"card " + note.category}>
              <div className="card-note-category">🎨</div>
              <div className="card-note-isCompleted">📁</div>
              <div className="card-data">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>

              <button className="card-delete-btn">❌</button>
            </figure>
          ))
        ) : (
          <div className="no-notes" onClick={getNotes}>
            <h3>No notes</h3>
            <button>List all notes from DB</button>
            <img src="./no-data.jpg" alt="robot no data" />
          </div>
        )}
      </section>
    </>
  );
};

export default List;
