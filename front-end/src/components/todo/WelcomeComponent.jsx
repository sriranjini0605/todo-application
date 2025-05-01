import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'
import Alert from 'react-bootstrap/Alert'


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulRepsonse = this.handleSuccessfulRepsonse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage: "",
            errorMessage: ""
        }
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1><br/>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your Todos <Link to="/todos">here</Link>.<br/>
                </div>
                <div className="container"><br/>
                    Click here to get a customized welcome message. <br/><br/>
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-primary">
                        Get Welcome Message</button>
                </div>
                <div className="container"><br/>
                    {this.state.welcomeMessage && <Alert variant="success">{this.state.welcomeMessage}</Alert>}
                    {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}
                </div>

            </>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulRepsonse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulRepsonse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        console.log(error.response)
        let errorMessage = ''
        if(error.message) {
            errorMessage += error.message
        }
        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }
        this.setState({errorMessage: errorMessage})
    }
}

export default WelcomeComponent