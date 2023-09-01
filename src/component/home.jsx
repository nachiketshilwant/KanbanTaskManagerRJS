import React, { useState } from 'react'
import Boardside from './boardside'
import Column from './column'

const Home = (props) => {
  return (
    <div className='flex h-[85vh]'>
        <Boardside  />
        <Column act={props.act} />
    </div>
  )
}

export default Home
