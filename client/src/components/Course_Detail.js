import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import config from '../config';

export default class Course_Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: [],
            id: '',
            title:'',
            description:'',
            materialsNeeded:'',
            estimatedTime:'',
            userId:'',
            username:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    course: response.data.course,
                    title: response.data.course.title,
                    description: response.data.course.description,
                    materialsNeeded: response.data.course.materialsNeeded,
                    estimatedTime: response.data.course.estimatedTime,
                    id: response.data.course.id,
                    userId: response.data.course.userId,
                    // username: response.data.course.User.firstName + " " + response.data.course.User.lastName,
                })
            })
            .catch(error => {
                console.log("Error fetching", error)
            })
    }

    delete = async(e) => {
        e.preventDefault();
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        let password = prompt("Enter pw to confirm");
        axios.delete(`${config.apiBaseUrl}/courses/${this.state.course.id}`, {
            method: "DELETE",
            auth: {
                username: `${authUser.emailAddress}`,
                password: password
            },
        }).then(() => {
            this.props.history.push("/");
        })
        .catch(err => {
            console.log(err);
            this.props.history.push("/error");
        });
    }

    render() {
        const {context} = this.props;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {context.authenticatedUser && context.authenticatedUser.id === this.state.userId ? (
                                <React.Fragment>
                                    <span>
                                    <Link className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</Link>
                                    <Link className="button" to="/" onClick={this.delete}>Delete Course</Link>
                                    </span>
                                </React.Fragment>
                            ): ("")}
                            <Link className="button button-secondary" to="/"> Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{this.state.course.title}</h3>
                        <p> By {this.state.username}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={this.state.description} />
                    </div>
                </div>
                <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
                                    </ul>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}
