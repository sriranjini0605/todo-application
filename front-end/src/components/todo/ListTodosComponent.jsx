import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import Alert from 'react-bootstrap/Alert'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message: ""
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
            .then(response => {
                console.log(response)
                this.setState({ todos: response.data })
            })
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.deleteTodo(username, id)
            .then(response => {
                this.setState({ message: `Deletion of Todo - ${id} Successful` });
                this.refreshTodos();
            })
    }

    updateTodoClicked(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked() {
        this.props.history.push("/todos/-1")
    }

    render() {
        return (
            <div>
                <br/>
                <h1>Todos List</h1><br/>
                {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate.toString()).format("YYYY-MM-DD")}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="container">
                        <button className="btn btn-primary" onClick={this.addTodoClicked}>Add</button>
                    </div>
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent