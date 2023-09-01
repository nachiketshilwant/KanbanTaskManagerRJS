import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./model.css"
import { useDispatch, useSelector } from 'react-redux'
import { crtsk } from '../../redux/slice'

const TaskModel = (props) => {
    const data = useSelector(state => state.task.boards)
    const dispatch = useDispatch();
    let tsk1;
    for (let i = 0; i < data.length; i++) {
        if (data[i].isActive == true) tsk1 = i;
    }
    const column = data[tsk1].columns;
    const [tsk, setTsk] = useState([]);
    const [sbnm, setSbnm] = useState([]);
    const [sbtskid, setSbtskid] = useState(3);
    const [sbtsk, setSbtsk] = useState([
        { id: 1 },
        { id: 2 }
    ])

    const addsbtsk = () => {
        setSbtsk(
            [
                ...sbtsk,
                { id: sbtskid }
            ]
        )
        setSbtskid(sbtskid + 1)
    }
    const sbmt = (e) => {

        [...document.getElementsByClassName("sbtsk")].forEach(ele => {
            setSbnm(sbnm.push({
                "title": ele.value,
                "isCompleted": false
            }))
        })

        setTsk(tsk.push({
            "title": document.getElementById("taskname").value,
            "description": document.getElementById("taskdescription").value,
            "status": document.getElementById("status").value,
            "subtasks": sbnm
        })
        )

        dispatch(crtsk(tsk))
        setSbnm([])
        setTsk([])
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
                className='taskmodel w-[30vw] bg-slate-900 h-[80vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden'
            >
                <p className=' text-2xl text-center'>Add New Task</p>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="taskname">Task Name</label>
                    <input
                        type="text"
                        className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                        name="taskname"
                        id="taskname"
                        placeholder='e.g Coursework Project'
                    />
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="taskname">Description</label>
                    <textarea
                        className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                        name="taskdescription"
                        id="taskdescription"
                        cols="30" rows="5"
                        placeholder='e.g This is the coursework project for our college that will help us to explain better the course i.e subject'
                    />
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label>Subtasks</label>

                    {sbtsk.map((e) => {
                        return (
                            <div className='w-screen mb-1 subtasks' id={`sbtsk-${e.id}`}>
                                <input
                                    key={e.id}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] sbtsk'
                                    name="taskname"
                                    placeholder='e.g Coursework Project'
                                />
                                <FontAwesomeIcon
                                    id={e.id}
                                    key={`btn-${e.id}`}
                                    icon={faXmark}
                                    className='btnsbtsk ml-1 cursor-pointer text-xl'
                                    onClick={(e)=>e.target.parentElement.closest('div').remove()}
                                />
                            </div>
                        )
                    })}


                    <button className='bg-white mt-3 rounded-full text-[#635fc7] font-bold' onClick={addsbtsk}>
                        <FontAwesomeIcon icon={faPlus} /> <p className='inline'>Add New Task</p>
                    </button>
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label>Current Status</label>
                    <div>
                        <select name="status" className='bg-transparent w-[100%] border-white border-[0.1rem] rounded-md' id="status">
                            {column.map(e => {
                                return (
                                    <option value={e.name} className=' text-slate-950 '>{e.name}</option>
                                )
                            })}
                        </select>

                    </div>
                    <button
                        className='bg-[#735fc7] mt-3 rounded-full text-white font-bold'
                        onClick={() => sbmt(tsk)}
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskModel
