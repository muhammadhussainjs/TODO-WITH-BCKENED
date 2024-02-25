import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const App = () => {

  const inputvalue = useRef(null)
  const [data , setData] = useState([])
  const param = useParams()
  

  useEffect(()=>{
  
    axios.get("http://localhost:3000/")
    .then((res)=>{
      console.log(res.data);
    
      setData(res.data)
    })
    .catch((err)=>{
      console.log(err);
    }
    
    )
    setData([...data]);
    console.log(data);
    
  } , [])
  
  const submit = async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users', {
        title: inputvalue.current.value
      });
      console.log(response.data);
      console.log(data);
      inputvalue.current.value = ''
      // Do something with the response if needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const deletedTodo =async (id)=>{
    try{
    const response = await axios.delete(`http://localhost:3000/api/v1/users/${id}`)
    console.log(response.data);

    }
    catch(error){
      console.log(error);
    }
    
  }
  
  const editTodo =async (id)=>{
    const newvalue =prompt('enter new todo')
    try{
    const response = await axios.put(`http://localhost:3000/api/v1/users/${id}`, {
      title : newvalue
    })
    console.log(response.data);

    }
    catch(error){
      console.log(error);
    }
    
  }
  

  
  
  

  



  return (
    <>
    <h1>TODO APP WITH CATCH API WITH BACKENED</h1>
  <form onSubmit={submit}>
    <input type="text" ref={inputvalue} placeholder='enter todo'/>
    <button type='submit'>submit</button>
  </form>
  <ul>
  {data.length > 0 ? data.map((item , index)=>{
  return  <li key={index}>{item.title}
  <button onClick={()=>deletedTodo(item.id)}>delete</button>
  <button onClick={()=>editTodo(item.id)}>edit</button>
  </li>

  }): <li>loading...</li>
}
  </ul>
  
    </>
    
  )
}

export default App