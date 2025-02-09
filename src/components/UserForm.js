import React,{useState,useEffect} from 'react'

const UserForm =({editUser,addUser,selectedUser})=> {
    const [user,setUser] = useState({ id: "", name: "",username:"", email: "", department: "" });

    

    useEffect(()=>{
        if (selectedUser) {
            setUser(selectedUser);

          } else {
            setUser({ id: "", name: "",username:"", email: "", department: "" });
          }
    },[selectedUser])

    

    const handleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value});

    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!user.id||!user.name||!user.username||!user.email||!user.department){
            alert(" All field are required!")
            return 
        }
        if (selectedUser){
            editUser(user);
        }
        else{
            addUser(user);
        }
        setUser({id:"", name:"",username:"", email:"",department:"" });

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' name='id' value={user.id} placeholder='Id' onChange={handleChange} required/>
            <input type='text'name='name' value={user.name} placeholder='FirstName' onChange={handleChange} required/>
            <input type='text' name='username' value={user.username} placeholder='UserName' onChange={handleChange} required/>
            <input type='email'name='email' value={user.email} placeholder='Email' onChange={handleChange} required/>
            <input type='text' name='department' value={user.department} placeholder='Department' onChange={handleChange} required/>
            <button type='submit'>{selectedUser?"Update User":"Add User"}</button>

        </form>
      
    </div>
  )
}

export default UserForm
