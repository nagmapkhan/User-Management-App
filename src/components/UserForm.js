import React,{useState,useEffect} from 'react'

const UserForm =({editUser,addUser,selectedUser})=> {
    const [user,setUser] = useState();

    useEffect(()=>{
        if(selectedUser){
            setUser(selectedUser)
        }

    },[selectedUser])

    const handleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value});

    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!user.id||!user.name||!user.email||!user.department){
            alert(" All field are required!")
            return 
        }
        if (selectedUser){
            editUser(user);
        }
        else{
            addUser(user);
        }
        setUser({id:"", name:"", email:"",department:"" });

    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input name='id' value={user.id} placeholder='Id' onChange={handleChange} required/>
            <input name='name' value={user.name} placeholder='Name' onChange={handleChange} required/>
            <input name='email' value={user.email} placeholder='Email' onChange={handleChange} required/>
            <input name='department' value={user.department} placeholder='Department' onChange={handleChange} required/>
            <button type='submit'>{selectedUser?"Update User":"AddUser"}</button>

        </form>
      
    </div>
  )
}

export default UserForm
