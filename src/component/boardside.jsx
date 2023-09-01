import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import BoardModel from './models/boardModel';
import { useSelector, useDispatch } from 'react-redux';
import { actvbrd } from '../redux/slice';


const Boardside = () => {
  const boardname = useSelector(state => state.task.boards);
  const [board, setBoard] = useState(false)
  const dispatach=useDispatch();

  const hide = () => {
    document.getElementsByClassName('board')[0].style.display = "none";
    document.getElementsByClassName("bttnhd")[0].style.display = "flex";
  }
  const shw = () => {
    document.getElementsByClassName('board')[0].style.display = "flex";
    document.getElementsByClassName('bttnhd')[0].style.display = "none";
  }
  const shwBoard = (e) => {
    setBoard(e);
  }


  return (
    <div>
      <div>
        <div className='board w-[19vw] min-h-[87.5vh]  bg-[#2b2c37] hidden sm:flex sm:flex-col'>
          <h3 className=' text-gray-300 font-semibold p-6'>ALL BOARDS ({boardname.length})</h3>
          {boardname.map((e) => {
            let cls;
            if(e.isActive==true) cls='p-2 bg-[#635fc7] w-[80%] h-14 flex items-center rounded-e-full text-white hover:bg-white hover:text-[#635fc7] cursor-pointer';
            else cls='p-2  w-[80%] h-14 flex items-center rounded-e-full text-white hover:bg-white hover:text-[#635fc7] cursor-pointer'
            return (
              <div
                className={cls}
                onClick={()=>dispatach(actvbrd(e.name))}
                >
                <FontAwesomeIcon icon={faServer} /> <span className='ms-2 font-black'>{e.name}</span>
              </div>
            )
          })}

          <div
            className='p-2 w-[80%] h-14 flex items-center rounded-e-full hover:bg-white text-[#635fc7] cursor-pointer'
            onClick={() => shwBoard(true)}
          >
            <FontAwesomeIcon icon={faServer} /> <span className='ms-2 font-black'>Create New Board</span>
          </div>


          <div
            className='p-2 w-[15%] h-14 flex absolute bottom-6 items-center text-2xl rounded-e-full text-gray-500 hover:bg-white hover:text-[#635fc7] cursor-pointer'
            onClick={hide}
          >
            <FontAwesomeIcon icon={faEyeSlash} /><span className='ms-4 text-xl font-black'>Hide Sidebar</span>
          </div>
        </div>
        <div
          className='bttnhd p-2 w-[3vw] h-14 absolute flex bottom-6 items-center text-2xl rounded-e-full text-gray-500 hover:bg-white hover:text-[#635fc7] cursor-pointer'
          onClick={shw}
        >
          <FontAwesomeIcon icon={faEye} />
        </div>
      </div>

        {board && <BoardModel shwTask={shwBoard} />}
    </div>
  )
}

export default Boardside
