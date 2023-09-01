import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { edttsk } from '../../redux/slice'


const Edttsk = (props) => {
    const dta = useSelector(state => state.task.boards[props.act].columns[props.ind].tasks[props.idx])
    const dispatch = useDispatch()

    const [sbt, setSbt] = useState([])
    const [idsb, setIdsb] = useState(1)
    const [task,setTask] = useState([])

    const addsbtask = () => {
        setSbt([
            ...sbt,
            {"id":idsb}
        ])
        setIdsb(idsb + 1)
    }
    const sbmt = () => {
        for(let i=0;i<document.getElementsByClassName("edtsbtsk1").length;i++){
            for(let j=0;j<dta.subtasks.length;j++){
                if(document.getElementsByClassName("edtsbtsk1")[i].placeholder==dta.subtasks[j].title){
                    setTask(task.push({
                        "title":document.getElementsByClassName("edtsbtsk1")[i].value,
                        "isCompleted":dta.subtasks[j].isCompleted
                    }))
                }
            }
        }
        for(let i=0;i<document.getElementsByClassName("edtsbtsk").length;i++){
            setTask(task.push({
                "title":document.getElementsByClassName("edtsbtsk")[i].value,
                "isCompleted":false
            }))
        }
        dispatch(edttsk([
            props.act,
            props.ind,
            props.idx,
            {
                "title":document.getElementById("tsknm").value,
                "description":document.getElementById("taskdescription").value,
                "status":props.ac,
                "subtasks":task,
            }
        ]))
        setTask([])
        props.edsk(false)
    }

    return (
        <div
            className='flex items-center justify-center min-h-screen absolute top-0 left-0 backdrop-blur-[1rem] w-screen'
        >
            <div
                className=' absolute top-[5%] left-[80%] text-4xl cursor-pointer'
                onClick={() => props.edsk(false)}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                />
            </div>
            <div
                className='taskmodel w-[30vw] text-white bg-slate-900 h-[80vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden'
            >
                <p className=' text-2xl text-center'>Edit Task</p>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="taskname">Task Name</label>
                    <input
                        type="text"
                        className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                        name="taskname"
                        id="tsknm"
                        placeholder={dta.title}
                        defaultValue={dta.title}
                    />
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="taskname">Description</label>
                    <textarea
                        className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                        name="taskdescription"
                        id="taskdescription"
                        cols="30" rows="5"
                        placeholder={dta.description}
                    />
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label>Subtasks</label>


                    {dta.subtasks.map(e => {
                        return (
                            <div className='w-screen mb-1 subtasks' id={`sbtsk-1`}>
                                <input
                                    key={e.title}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] edtsbtsk1'
                                    name="taskname"
                                    placeholder={e.title}
                                    defaultValue={e.title}
                                />
                                <FontAwesomeIcon
                                    id={e.title}
                                    key={e.title}
                                    icon={faXmark}
                                    className='btnedtsbtsk ml-1 cursor-pointer text-xl'
                                    onClick={(e) => e.target.parentElement.closest('div').remove()}
                                />

                            </div>
                        )
                    })}

                    {sbt.map(e => {
                        return (
                            <div className='w-screen mb-1 subtasks' id={`sbtsk-1`}>
                                <input
                                    key={e.id}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] edtsbtsk'
                                    name="taskname"
                                    placeholder="new subtask"
                                />
                                <FontAwesomeIcon
                                    id={e.id}
                                    key={e.id}
                                    icon={faXmark}
                                    className='btnedtsbtsk ml-1 cursor-pointer text-xl'
                                    onClick={(e) => e.target.parentElement.closest('div').remove()}
                                />
                            </div>
                        )
                    })}



                    <button className='bg-white mt-3 rounded-full text-[#635fc7] font-bold'
                    onClick={addsbtask}
                    >
                        <FontAwesomeIcon icon={faPlus} /> <p className='inline'>Add New Task</p>
                    </button>
                </div>
                <div className='flex flex-col mt-4 mx-5'>

                    <button
                        className='bg-[#735fc7] mt-3 rounded-full text-white font-bold'
                    onClick={() => sbmt()}
                    >
                        Update Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Edttsk
