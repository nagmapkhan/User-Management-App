import React,{Component} from "react";
import './App.css';
import UserList from "./components/UserList"; 
import UserForm from "./components/UserForm";
import ErrorBoundry from "./components/ErrorBoundry";
import axios from 'axios'

class  App extends Component {

  state = {
    users: [],
    selectedUser : null,
    error:null
  }
  componentDidMount(){
    this.fetchUserData();
  }

  fetchUserData = async()=>{
    try{
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      console.log("Fetched Users:", response.data);
      this.setState({users:response.data})
    }catch(error){
      this.setState({error:"Failedd to fetch users"});

    }

  };
addUser = async(user) =>{
  try{
    const response = await axios.post("https://jasonplaceholder.typicode.com/users",user)
    this.setState({users:[...this.state.users, response.data]})
  }catch(error){
    this.setState({error:"Failed to add User"})
  }
}



  editUser = async(updatedUser)=>{
    try{
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,updatedUser);
      const users = this.setState.users.map((user)=>
         user.id === updatedUser.id ? updatedUser: user

      );
      this.setState({users,selectedUser:null});

    }catch(error){
      this.setState({error:"Failed to update user"})

    }

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
   
  selectUser =(user)=>{
    this.setState({selectedUser:user});

  }

  render(){
  return (
    <ErrorBoundry>
    <div className="App">
      <h1>Management App</h1>
     <UserList users={this.state.users} deleteUser={this.deleteUser} selectUser={this.selectUser}/>
     <UserForm addUser={this.addUser} editUser={this.editUser} selectedUser={this.state.selectedUser}/>
    </div>
    </ErrorBoundry>
  );
}}

export default App;
