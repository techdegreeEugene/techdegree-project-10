import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div className="bounds">
        <h1>Error</h1>
        <p> Sorry! We hust encoutered an unexpected error.</p>
        <p><Link to='/'  
        className="button button-secondary">Return to homepage</Link></p>
    </div>
);