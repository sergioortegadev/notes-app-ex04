import { useRef, useState, useEffect } from "react";
import "./Form.css";

const Form = ({ searchNote, getNotes }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") return;
    searchNote(search);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const inputRef = useRef(null);
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const refresh = () => {
    setSearch("");
    focusInput();
  };

  useEffect(() => {
    const handlekeyDown = (e) => {
      if (e.key === "Escape") {
        getNotes();
      }
    };
    window.addEventListener("keydown", handlekeyDown);
    return () => {
      window.removeEventListener("keydown", handlekeyDown);
    };
  }, []);

  useEffect(() => {
    if (search.length > 2) {
      searchNote(search);
    }
  }, [search]);

  return (
    <>
      <form onSubmit={handleSubmit} className="f-form">
        <input type="submit" value="🔍" />
        <input type="text" placeholder="Search notes" value={search} onChange={handleChange} ref={inputRef} autoFocus />
        {search && <button onClick={refresh}>✖</button>}
      </form>
    </>
  );
};

export default Form;
