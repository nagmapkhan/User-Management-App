import React from 'react'

const  UserList = ({users,deleteUser,selectUser})=> {
  return (
    <div>
        <h2>User List</h2>
        <ul>{users.map((user)=>{
            <li key = {user.id}> {user.id} - {user.name} - {user.email} - {user.department || "N/A"} 
            <button onClick={()=> deleteUser(user.id)} >Delete</button> 
            <button onClick = {()=> selectUser(user)}>Edit</button>
            </li>
           
        })} 
        
        </ul>
      
    </div>
  )
}

export default UserList
