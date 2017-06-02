import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import About from './About.js'
import Day from './DayRate.js'



var complete = false;

const Title = ({todoCount}) => {
  return (
    <div>
       <div>
          <h1>to-do ({todoCount})</h1>
       </div>
    </div>
  );
}


const TodoForm = ({addTodo}) => {
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


const Todo = ({todo, remove}) => {
  // Each Todo
  return (<a href="#" className="list-group-item" onClick={() => {{remove(todo.id)}; congratulationAction()}}>{todo.text}</a>);
}

const congratulationAction = (complete) => { return ( console.log("it worked!!")

    ); }

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}

// THIS IS THE NAV BAR STUFF 

function handleTouchTap() {
  //we want to send/route to home page here
}
function handleNavTouch(){
  //trigger the drop down menu
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};


// Container Component
// Todo Id
//window.id = 0;
class Home extends Component {
 

   constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  
    // Lifecycle method
  componentDidMount(){
    // Make HTTP reques with Axios
     Notification.requestPermission();
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});
      });
  }
  // Add todo handler
  addTodo(val){
    // Assemble data
    const todo = {text: val}
    // Update data
    axios.post(this.apiUrl, todo)
       .then((res) => {
          this.state.data.push(res.data);
          this.setState({data: this.state.data});
       });
  }
  // Handle remove
  handleRemove(id){
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id){ return todo }
      else{complete = true}
      new Notification('RADICAL DUDE!!!');
    });
    // Update state with filter
    axios.delete(this.apiUrl+'/'+id)
      .then((res) => {
        this.setState({data: remainder});})

  
  }
  handleCongratulationAction(complete){
      console.log("it worked!");
    }
  

//App-Bar
//<MuiThemeProvider>

  render() {
  
    return (
      <div>
        
       <div> 
       
        <Router>
        <p className="Nav-links">
  
       
        <Route exact path="/about" component={About}/> 
        <Route exact path="/rate-your-day" component={Day}/>
        
        </p>
        </Router>
       </div>


      
<div className="ToDo">
        <Title todoCount={this.state.data.length}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          complete={this.handleRemove.complete}
          
        />
        
      </div>
      
      
      <div className="List">
          <h3> Recommendations</h3>
          <ul>
          <li> Eat </li>
          <li> Go for a walk~ </li>
          <li> Meditate </li>
          <li> Deep breathing exercises </li>
          <li> Drink Water+ </li>
          <li> Social activity </li>
          <li> Exercise </li>
          <li> Journal </li>
          <li> Try Something New</li>
          <li> Spend time outside </li>
          <li> Eat a balanced meal </li>
          <li> Read </li>
          
          </ul>
          
        </div>
      
       
        </div>
        
    );
  }
}

export default Home;