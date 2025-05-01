import React, { Component } from 'react'
import moment from 'moment'
import TodoDataService from '../../api/todo/TodoDataService'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import AuthenticationService from './AuthenticationService'


class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.goBack = this.goBack.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
                }
            )
        )      
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUsername()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo).then(this.props.history.push("/todos"))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo).then(this.props.history.push("/todos"))
        }
    }

    goBack() {
        this.props.history.push("/todos")
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a Description"
        } else if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters in Description"
        }

        if (!moment(values.targetDate).isValid()) {
            errors.description = "Enter a Valid Target Date"
        }
        return errors
    }

    render() {
        let { description, targetDate } = this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button type="button" className="btn btn-danger" onClick={this.goBack}>Cancel</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent