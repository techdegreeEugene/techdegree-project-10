import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div className="bounds">
        <h1>Forbidden</h1>
        <p> Oh no, You can't access this page</p>
        <Link to='/' 
        className="button button-secondary">Return to Courses</Link>
    </div>
)