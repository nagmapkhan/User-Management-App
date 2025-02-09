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
    error:null,
    currentPage:1,
    userPerPage:5,

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
    const response = await axios.post("https://jsonplaceholder.typicode.com/users",user)
    this.setState({users:[...this.state.users, response.data]})
  }catch(error){
    this.setState({error:"Failed to add User"})
  }
}



  editUser = async(updatedUser)=>{
    try{
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,updatedUser);
      const updatedUsers = this.state.users.map((user)=>
         user.id === updatedUser.id ? updatedUser: user

      );
      this.setState({users:updatedUsers,selectedUser:null});

    }catch(error){
      this.setState({error:"Failed to update user"})

    }

  }
  changePage = (step) => {
    this.setState((prevState)=>({
      currentPage:prevState.currentPage + step,
    }));
  };

    
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
    const {users,error,currentPage,userPerPage} = this.state;
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUsers = users.slice(indexOfFirstUser,indexOfLastUser);

  return (
    <ErrorBoundry>
    <div className="App">
      <h1>Management App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
     <UserList users={currentUsers} deleteUser={this.deleteUser} selectUser={this.selectUser}/>
     <UserForm addUser={this.addUser} editUser={this.editUser} selectedUser={this.state.selectedUser}/>

     <div className="pagination"> 
      <button onClick={()=>this.changePage(-1)} disabled={currentPage===1} >Previous</button>
      <button onClick={()=>this.changePage(1)} disabled={indexOfLastUser>=users.length} >Next</button>
     </div>
    
    </div>
    </ErrorBoundry>
  );
}}

export default App;
