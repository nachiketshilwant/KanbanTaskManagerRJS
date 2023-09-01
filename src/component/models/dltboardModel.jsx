import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./model.css"
import { useDispatch } from 'react-redux'
import { dltbrd } from '../../redux/slice'

const DltBoardModel = (props) => {

    const dispatch=useDispatch();

    const dlt=()=>{
        dispatch(dltbrd());
        props.shwTask(false);
    }

    return (
        <div
            className='flex items-center justify-center min-h-screen absolute top-0 left-0 backdrop-blur-[1rem] w-screen'
        >
            <div
                className=' absolute top-[5%] left-[80%] text-4xl cursor-pointer'
                onClick={() => props.shwTask(false)}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                />
            </div>
            <div
                className='taskmodel w-[30vw] bg-slate-900 h-[30vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden text-white'
            >

                <h1 className=' text-center text-red-600 text-4xl '>Delete this board</h1>
                <p className=' text-xs my-5 '>Are you sure you want to delete the "Platform Launch" board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="flex m-2 justify-evenly">
                    <button
                        className='bg-red-600 hover:bg-red-500 rounded-full w-[40%] p-2'
                        onClick={dlt}
                    >Delete</button>
                    <button className=' bg-gray-50 hover:bg-gray-200 rounded-full w-[40%] p-2 text-[#735fc7] '
                        onClick={() => props.shwTask("none")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DltBoardModel
