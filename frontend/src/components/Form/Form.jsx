import { useRef, useState } from "react";
import "./Form.css";

const Form = (searchNote) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") return;
    setSearch("");
    searchNote.search(search);
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="🔍" />
        <input type="text" placeholder="Search notes" value={search} onChange={handleChange} ref={inputRef} autoFocus />
        {search && <button onClick={refresh}>✖</button>}
      </form>
    </>
  );
};

export default Form;
