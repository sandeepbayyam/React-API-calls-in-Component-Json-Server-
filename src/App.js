import React from "react";
import "./style.css";

export default function App() {
  const [newPost,setNewPost] = React.useState({})
  const [allPosts,setAllPost]=React.useState([])
  const getPosts = ()=>{
      fetch('http://localhost:4000/posts')
      .then((res)=>res.json())
      .then((data)=>{
        setAllPost([...data])
      })
  }
  React.useEffect(()=>{getPosts()},[])
  const addPosts = ()=>{
  
      fetch('http://localhost:4000/posts', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        getPosts()
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }
  const deletePost = (id)=>{
  
    fetch('http://localhost:4000/posts/'+id, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      getPosts()
    })
    .catch((error) => {
      console.error('Error:', error);
    })
}

  return (
    <div>
      <h1>API Calls in Component using Json-Server!</h1>
      <input type='text' placeholder='Enter Title'onChange={(e)=>{setNewPost({...newPost,title:e.target.value})}}/>
      <br/><br/>
      <input type='text' placeholder='Enter Author'onChange={(e)=>{setNewPost({...newPost,author:e.target.value})}}/>
      <hr/>
      <button onClick={getPosts}>Get Posts</button>
      &nbsp;&nbsp;
      <button onClick={addPosts}>Add Posts</button>
      <hr/>
      <table border='2'>
        <thead>
          <tr>
          <th>Id</th>
          <th>Title</th>
         <th>Author</th>
          </tr>
        </thead>
              <tbody>
      {
        allPosts && allPosts.map((p,i)=>{
          return(
            <>
            <tr key={i}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.author}</td>
            <button onClick={()=>{
                deletePost(p.id)
              }}>Delete</button>
           </tr>
           </>
          )
        })
      }
       </tbody>
            </table>
    </div>
  );
}
