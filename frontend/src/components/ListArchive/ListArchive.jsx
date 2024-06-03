import { useEffect, useState } from "react";
import "./../List/List.css";

const ListArchive = ({ archivedNotes, getArchiveNotes, putDisarchive, deleteNote }) => {
  const [archived, setArchived] = useState([]);

  const handleDelete = (e, id) => {
    const confirmation = confirm(`Confirm deletion note id: ${id}?`);
    confirmation ? deleteNote(e, id) : false;
  };

  useEffect(() => {
    setArchived(archivedNotes);
  }, [archivedNotes]);

  return (
    <>
      <h2>Archived Notes</h2>
      <section className="cards archived">
        {archived.map((note) => (
          <figure key={note.id} className={"card " + note.category}>
            <div className="card-ArcNote-isCompleted" onClick={(e) => putDisarchive(e, note.id)}>
              <img src="./assets/box-up.png" alt="archivar" />
              <span className="card-ArcNote-isCompleted-hovertext">Disarchive</span>
            </div>
            <div className="card-ArcNote-data">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
            </div>
            <button className="card-ArcNote-delete-btn" onClick={(e) => handleDelete(e, note.id)}>
              🗑
            </button>
          </figure>
        ))}
      </section>
    </>
  );
};

export default ListArchive;
