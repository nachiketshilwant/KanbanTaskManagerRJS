import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisVertical, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Ellipsis from './Ellipsis'
import TaskModel from './models/taskModel'
import DltBoardModel from './models/dltboardModel'
import EdtBoardModel from './models/edtboardModel'
import { useSelector } from 'react-redux'

const Nav = (props) => {
  const data = useSelector(state => state.task.boards)

  const [ellps, setEllps] = useState(false);
  const [edt, setEdt] = useState(false);
  const [dlt, setDlt] = useState(false);
  const [task, setTask] = useState(false);

  //
  const [ellipsiscnt, setEllipsiscnt] = useState(0)
  const shwEllipsis = () => {
    ellipsiscnt % 2 == 0 ? document.getElementsByClassName('ellipsis')[0].style.display = "inline" : document.getElementsByClassName('ellipsis')[0].style.display = "none"
    setEllipsiscnt(ellipsiscnt + 1)
    ellipsiscnt % 2 == 0 ? setEllps(true) : setEllps(false)
  }
  //
  const shwTask = (e) => {
    setTask(e);
  }
  const shwDlt = (e) => {
    setDlt(e);
  }
  const shwEdt = (e) => {
    setEdt(e);
  }
  return (
    <div className=' bg-[#2b2c37] h-[12.5vh] flex text-white items-center justify-between'>
      <ul className='list-none flex items-center sm:justify-between sm:w-[30vw] mx-8'>
        <li className=' text-4xl font-extrabold hidden sm:block'>Taskrr...</li>
        <li className=' text-xl font-semibold sm:fonbt-bold'>{data[props.act].name}</li>
        <li className='font-bold m-[0.2rem] cursor-pointer sm:hidden'><FontAwesomeIcon icon={faCaretDown} /></li>

      </ul>
      <ul className='list-none flex items-center justify-between w-1/6 mx-14'>
        <li
          onClick={() => shwTask(true)}
        >
          <button
            className='bg-[#635fc7] py-2 px-4 rounded-full text-white text-lg font-semibold hover:opacity-80 duration-200 md:text-sm '
          >
            <FontAwesomeIcon icon={faPlus} /> <p className='hidden sm:inline'>Add New Task</p>
          </button>
        </li>

        <li className=' text-3xl cursor-pointer'
          onClick={shwEllipsis}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
          <div className="ellipsis absolute top-[10vh] left-[84vw] bg-slate-900 w-[15vw] text-lg rounded-xl p-2 hidden   " >
            {ellps && <Ellipsis shwDlt={shwDlt} shwEdt={shwEdt} />}
          </div>
        </li>
      </ul>
      {/*  */}
      {task && <TaskModel shwTask={shwTask} />}

      {edt && <EdtBoardModel shwTask={shwEdt} act={props.act} />}

      {dlt && <DltBoardModel shwTask={shwDlt} />}
    </div>
  )
}

export default Nav
