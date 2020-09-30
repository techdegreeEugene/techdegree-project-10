import React from 'react';
import {Link} from 'react-router-dom';

export default ({context}) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.name} is authenticated!</h1>
      <Link className='button' 
        to={`/courses/`}>View Your Courses</Link>
    </div>
  </div>
  );
}