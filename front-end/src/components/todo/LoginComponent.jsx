import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "random",
            password: "",
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then( (response) => {
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}` )
        }).catch( () => {
            this.setState(
                {
                    hasLoginFailed: true,
                    showSuccessMessage: false
                }
            )
        })

    }

    render() {
        return (
            <div className="container"><br/>
                <h1>Login</h1><br/>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter User Name" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" onClick={this.loginClicked}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(LoginComponent)