import React from 'react'

const  UserList = ({users,deleteUser,selectUser})=> {
  return (
    <div>
        <h2>User List</h2>
        <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>DEPARTMENT</th>
            <th>ACTIONS</th>
            
          </tr>
        </thead>
        <tbody>
        {users.map((user)=>(
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td> {user.department || "N/A"}</td>
            <td>
            <button onClick={()=> deleteUser(user.id)} >Delete</button> 
            <button onClick = {()=> selectUser(user)}> Edit </button>
            </td>
            </tr>
           
        ))} 
       
        </tbody>
        </table>
      
    </div>
  )
}

export default UserList
