import React, { Component } from 'react';
// import FirstComponent from "./components/learning components/FirstComponent"
// import SecondComponent from "./components/learning components/SecondComponent"
// import ThirdComponent from "./components/learning components/ThirdComponent"
// import Counter from './components/counter/Counter'
import TodoApp from './components/todo/TodoApp'

import './App.css';
import './bootstrap.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        {/*<Counter/>*/}
        <TodoApp/>
      </div>
    );
  }
}

// class LearningComponents extends Component {
//   render () {
//     return (
//       <div className="LearningComponents">
//          Hello World
//          <FirstComponent/>
//          <SecondComponent/>
//          <ThirdComponent/>
//       </div>
//     );
//   }
// }

export default App;
