import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
// import Public from './components/Public';
import Not_Found from './components/Not_Found';
import User_Sign_Up from './components/User_Sign_Up';
import User_Sign_In from './components/User_Sign_In';
import User_Sign_Out from './components/User_Sign_Out';
import Authenticated from './components/Authenticated';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';


import Courses from './components/Courses';
import Create_Course from './components/Create_Course';
import Course_Detail from './components/Course_Detail';
import Update_Course from './components/Update_Course';
import Unhandled_Error from './components/Unhandled_Error';
import Forbidden from './components/Forbidden';
import {Provider} from './Context';

const Auth_With_Context = withContext(Authenticated);
const Course_Detail_With_Content = withContext(Course_Detail);
const Create_Course_With_Context = withContext(Create_Course);
const HEADER_WITH_CONTEXT = withContext(Header);
const User_Sign_In_With_Context = withContext(User_Sign_In);
const User_Sign_Out_With_Context = withContext(User_Sign_Out);
const User_Sign_Up_With_Context = withContext(User_Sign_Up);
const Update_Course_With_Context = withContext(Update_Course);

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div id="root">
            <div>
            
              <HEADER_WITH_CONTEXT />
              <Switch>
                <Redirect exact from="/" to="/courses" />
                <Route exact path="/courses" component={Courses} />
                <PrivateRoute path="/authenticated" component={Auth_With_Context} />
                <PrivateRoute path="/courses/create" component={Create_Course_With_Context} />
                <PrivateRoute path="/courses/:id/update" component={Update_Course_With_Context} />
                <Route path="/courses/:id" component={Course_Detail_With_Content} />
                <Route path="/signin" component={User_Sign_In_With_Context} />
                <Route path="/signup" component={User_Sign_Up_With_Context} />
                <Route path="/signout" component={User_Sign_Out_With_Context} />
                <Route path="/error" component={Unhandled_Error} />
                <Route path="/forbidden" component={Forbidden} />
                <Route component={Not_Found} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
