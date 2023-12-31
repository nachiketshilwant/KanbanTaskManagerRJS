import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./model.css"
import { useDispatch, useSelector } from 'react-redux'
import { edtbrd } from "../../redux/slice"

const AddColl = (props) => {
    const dt1 = useSelector(state => state.task.boards)
    const dispatch = useDispatch();
    const [clnmid, setClnmid] = useState(1)
    const [clnm, setClnm] = useState([])
    const [data, setData] = useState([])
    const [nmmp, setnmmp] = useState([1])
    const [clm, setClm] = useState([])
    const [clnme, setClnme] = useState([])


    const ad = () => {
        setClnm([
            ...clnm,
            { id: clnmid }
        ])
        setClnmid(clnmid + 1)
    }
    const sbmt = () => {
        for (let i = 0; i < document.getElementsByClassName("subtasksipdf1").length; i++) {
            for (let j = 0; j < dt1[props.act].columns.length; j++) {
                if (document.getElementsByClassName("subtasksipdf1")[i].placeholder == dt1[props.act].columns[j].name) {
                    setClm(clnme.push({
                        "name": document.getElementsByClassName("subtasksipdf1")[i].value,
                        "tasks": dt1[props.act].columns[j].tasks
                    }))
                }
            }
        }
        for (let i = 0; i < document.getElementsByClassName("subtasksip1").length; i++) {
            if (document.getElementsByClassName("subtasksip1")[i].value == "") continue;
            setClnme(clnme.push({
                "name": document.getElementsByClassName("subtasksip1")[i].value,
                "tasks": []
            }))
        }

        let nm = document.getElementById("tsknm").value || document.getElementById("tsknm").placeholder
        setData(data.push(
            {
                "name": nm,
                "isActive": true,
                "columns": clnme
            }
        )
        )
        setClnme([])
        dispatch(edtbrd(data))
        // console.log(data)
        setData([])
        props.shwTask(false)
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
                className='taskmodel w-[30vw] bg-slate-900 h-[60vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden text-white'
            >
                <p className=' text-2xl text-center'>Add New Board</p>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="tsknm">Board Name</label>
                    {nmmp.map(e => {
                        return (<input
                            type="text"
                            className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                            name="taskname"
                            id="tsknm"
                            placeholder={dt1[props.act].name}
                            value={dt1[props.act].name}
                        />)
                    })}
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label>Board Column</label>
                    {dt1[props.act].columns.map((e) => {
                        return (
                            <div className='w-screen mb-1 subtasks'>
                                <input
                                    key={e.name}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] subtasksipdf1'
                                    name="columnname"
                                    placeholder={e.name}
                                    Value={e.name}
                                />
                            </div>
                        )
                    })}
                    {clnm.map(e => {
                        return (
                            <div className='w-screen mb-1 subtasks'>
                                <input
                                    key={e.id}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] subtasksip1'
                                    name="columnname"
                                />
                                <FontAwesomeIcon
                                    id={e.id}
                                    key={`btnclnme-${e.id}`}
                                    icon={faXmark}
                                    className='btnclnme ml-1 cursor-pointer text-xl'
                                    onClick={(e) => e.target.parentElement.closest('div').remove()}
                                />
                            </div>
                        )
                    })}
                    <button className='bg-white mt-3 rounded-full text-[#635fc7] font-bold' onClick={ad}>
                        <FontAwesomeIcon icon={faPlus} /> <p className='inline'>Add New Column</p>
                    </button>
                </div>
                <div className='flex flex-col mt-4 mx-5'>

                    <button
                        className='bg-[#735fc7] mt-3 rounded-full text-white font-bold'
                        onClick={sbmt}
                    >
                        Create New Board
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddColl
