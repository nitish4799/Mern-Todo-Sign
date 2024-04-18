import React from 'react'

const Update = ({ display }) => {
  return (
    <div>
      <h1>Update your task</h1>
      <input type='text' placeholder='title'/>
      <textarea placeholder='body'/>
      <div>
        <button>UPDATE</button>
        <button
        onClick={()=> display("none")}>CLOSE</button>
      </div>
    </div>
  )
}

export default Update
