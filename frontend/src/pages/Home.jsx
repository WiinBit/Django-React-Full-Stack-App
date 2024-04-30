import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // New state for messages

    useEffect(() => {
        getNotes();
        adjustContainerPosition();
        window.addEventListener('resize', adjustContainerPosition);
        return () => window.removeEventListener('resize', adjustContainerPosition);
    }, []);

    const getNotes = () => {
        setLoading(true);
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => { setNotes(data); setLoading(false); })
        .catch((err) => {
            setMessage("Failed to fetch notes. Please try again."); // Set message on error
            setLoading(false);
        });
    };

    const deleteNote = (id) => {
        setLoading(true);
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    setMessage("Note deleted successfully."); // Set message on success
                    getNotes();
                } else {
                    setMessage("Failed to delete note."); // Set message on failure
                }
                setLoading(false);
            })
            .catch((error) => {
                setMessage("Failed to delete note. Please try again."); // Set message on error
                setLoading(false);
            });
    };

    const createNote = (e) => {
        e.preventDefault();
        setLoading(true);
        api
            .post("/api/notes/", {content, title})
            .then((res) => {
                if (res.status === 201) {
                    setMessage("Note created successfully."); // Set message on success
                    getNotes();
                } else {
                    setMessage("Failed to create note."); // Set message on failure
                }
                setLoading(false);
            })
            .catch((err) => {
                setMessage("Failed to create note. Please try again."); // Set message on error
                setLoading(false);
            });
    };

    const adjustContainerPosition = () => {
        const homeContainer = document.querySelector('.home-container');
        const windowHeight = window.innerHeight;
        const containerHeight = homeContainer.offsetHeight;
        const topPosition = (windowHeight - containerHeight) / 2;
        homeContainer.style.top = `${topPosition}px`;
    };

    const handleLogin = () => {
        // Simulate a successful login
        setMessage("Welcome"); // Set message to "Welcome" on successful login
    };

    return (
    <div className="main-container">
     {message && <div className="message">{message}</div>} {/* Display message if message is not empty */}        
        
        <div className="home-container">
            <div>
                <h2>Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
            {loading && <LoadingIndicator />}
            <div className="notes-container">
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id}/>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Home;
