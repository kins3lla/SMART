import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import About from './About.js'
import Day from './DayRate.js'
import Home from './Home.js'
import * as firebase from 'firebase'

const Title = ({ todoCount }) => {
  return (
    <div>
      <div>
        <h1>to-do ({todoCount})</h1>
      </div>
    </div>
  );
}


const TodoForm = ({ addTodo }) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      addTodo(input.value);
      input.value = '';
    }}>
      <input className="form-control col-md-12" ref={node => {
        input = node;
      }} />
      <br />
    </form>
  );
};

const Todo = ({ todo, remove }) => {
  // Each Todo
  return (<a href="#" className="list-group-item" onClick={() => { remove(todo.id) }}>{todo.text}</a>);
}

const TodoList = ({ todos, remove }) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<div className="list-group" style={{ marginTop: '30px' }}>{todoNode}</div>);
}

// THIS IS THE NAV BAR STUFF 

function handleTouchTap() {
  //we want to send/route to home page here
}
function handleNavTouch() {
  //trigger the drop down menu
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const AppBarExampleIconButton = () => (
  <AppBar
    title={<span style={styles.title}>Title</span>}
    onTitleTouchTap={handleTouchTap}
  />
);


//END NAV BAR STUFF


// Container Component
class App extends Component {



  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      showStars: false

    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }


  // Lifecycle method
  componentDidMount() {
    Notification.requestPermission();
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({ data: res.data });
      });
  }
  
  // Add todo handler
  addTodo(val) {
    // Assemble data
    const todo = { text: val }
    // Update data
    axios.post(this.apiUrl, todo)
      .then((res) => {
        this.state.data.push(res.data);
        this.setState({ data: this.state.data });
      });
  }
  // Handle remove
  handleRemove(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id)
      .then((res) => {
        this.setState({ data: remainder });
      })
  }

  //App-Bar
  //<MuiThemeProvider>

  render() {

    return (
      <div>

        <div className="App">

          <MuiThemeProvider App-Bar>
            <div className="AppBar">
              <AppBar
                title="Welcome to SMART!"
              />


            </div>
          </MuiThemeProvider>

          <div>
            <p className="App-intro">
              Welcome to your page to keep track of your goals and healthy habits!
        </p>
            <Router>

              <p className="Nav-links">

                <a> <Link to="/home">Home</Link> </a>
          
                <a> | </a> <a> <Link to="/rate-your-day">About / Rate Your Day! </Link> </a>


                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
               
                <Route exact path="/rate-your-day" component={Day} />

              </p>
            </Router>
          </div>


        </div>
      </div>
    );
  }
}


export default App;