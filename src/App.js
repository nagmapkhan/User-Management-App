import React,{Component} from "react";
import './App.css';
import UserList from "./components/UserList"; 
import UserForm from "./components/UserForm";
import axios from 'axios'

class  App extends Component {

  state = {
    users: [],
    selectedUser : null,
  }
  
    
  deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const users = this.state.users.filter((user) => user.id !== id);
      this.setState({ users });
    } catch (error) {
      this.setState({ error: "Failed to delete user" });
    }
  };
  render(){
  return (
    <div>
     <UserList users={this.state.users} deleteUser={this.deleteUser}/>
     <UserForm addUser={this.addUser} editUser={this.editUser} selectedUser={this.state.selectedUser}/>
    </div>
  );
}}

export default App;
