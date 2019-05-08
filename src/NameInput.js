import React from 'react'

const nameInput = (props) => {
  return(
    <div onClick={props.click}>
      <p>{props.value_2}</p>
      <p>{props.value_1}</p>
      <input type="text" onChange={props.change}/> 
    </div>
  )
}

export default nameInput;