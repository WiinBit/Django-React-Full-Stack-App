import React from 'react';
import './NotFound.css'; // Import the CSS file

function NotFound() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Page Not Found</h2>
                <p> Are you Lost?</p>
                <a href="/">Go to Homepage</a>
            </div>
        </div>
    );
}

export default NotFound;
