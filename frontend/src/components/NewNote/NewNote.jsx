import { useEffect, useState } from "react";
import "./NewNote.css";

const NewNote = ({ setShowNew, postNote }) => {
  const initNote = {
    title: "",
    description: "",
    category: "",
    isCompleted: false,
  };
  const [newNote, setNewNote] = useState(initNote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title === "" || newNote.description === "" || newNote.category === "") return;
    postNote(newNote);
    setNewNote(initNote);
    setShowNew(false);
  };

  const cancel = (e) => {
    e.preventDefault();
    setShowNew(false);
  };

  return (
    <div className="nn-form-container">
      <form onSubmit={handleSubmit} className="nn-form">
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleChange}
          placeholder="  Title"
          required
          autoFocus
        />
        <textarea
          name="description"
          value={newNote.description}
          onChange={handleChange}
          placeholder="  Description"
          required
        />
        <select name="category" value={newNote.category} onChange={handleChange} required>
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
        <div className="nn-form-btn">
          <input type="submit" value="SAVE" />
          <button onClick={cancel}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};
export default NewNote;
