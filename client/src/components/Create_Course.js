import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Create_Course extends Component {
    state = {
        errors: [],
        id: '',
        title:'',
        description:'',
        materialsNeeded:'',
        estimatedTime:''

    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = (e) => {
        e.preventDefault();
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = prompt("Enter your password");
        const userId = authUser.id;
        const credentials = btoa(`${authUser.emailAddress}:` + password);
        if (this.state.description === "" || this.state.title === "") {
            this.setState({
                errors: "Course / Descriptions are required"
            })
        } else {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/courses',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${credentials}`
            },
            auth: {
                username: emailAddress,
                password: password
            },
            data: {
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
                userId: userId
            }
        }).then(() => {
            alert(this.state.title + ' has been created.')
            this.props.history.push('/');
        }).catch(err => {
            if (err.response.status === 400) {
                this.setState({
                    errors: err.response.data.message
                })
            } else if (err.response.status === 401) {
                this.setState({
                    errors: err.response.data.message
                })
            }
        })
    }
}

render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;

    return(
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                {
                    this.state.errors.length ?
                    (
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{this.state.errors}</li>
                                </ul>
                            </div>
                        </div>
                    ): null
                }
            </div>
            <form onSubmit={this.submit}>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                            <input 
                                id="title"
                                name="title"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Course title"
                                value={this.state.title}
                                onChange={this.change}
                            />
                        </div>
                        <p>By {authUser.firstName} {authUser.lastName}</p>
                        <div className="course--description">
                            <div>
                                <textarea   
                                    id="description"
                                    name="description"
                                    placeholder="Course description"
                                    value={this.state.description}
                                    onChange={this.change}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimate Time</h4>
                                    <div>
                                        <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            className="course--time--input"
                                            placeholder="Hours"
                                            value={this.state.estimatedTime}
                                            onChange={this.change}
                                        />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea   
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            placeholder="List materials"
                                            value={this.state.materialsNeeded}
                                            onChange={this.change}
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <Link to="/" 
                    className="button button-secondary">Cancel</Link>            
                </div>
            </form>
        </div>
    )
}
}