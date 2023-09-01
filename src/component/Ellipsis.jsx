import React, { useState } from 'react'

const Ellipsis = (props) => {
  return (
    <>
    <div>
      <p className=' cursor-pointer '
      onClick={()=>props.shwEdt(true)}>Edit Board</p>
      <p className=' cursor-pointer text-red-600'
      onClick={()=>props.shwDlt(true)}>
      Delete Board</p>
    </div>
    </>
  )
}

export default Ellipsis
