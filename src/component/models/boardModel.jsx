import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import "./model.css"
import { useDispatch } from 'react-redux'
import {crtbrd} from "../../redux/slice"

const BoardModel = (props) => {
    const [data, setData] = useState({
        "name": "",
        "isActive": false,
        "columns":[]
    })
    const [clm,setClm]=useState([])
    const [clnmeid, setClnmeid] = useState(3);
    const dispatch = useDispatch()
    const [clnme, setClnme] = useState([
        { id: 1 },
        { id: 2 }
    ])


    const addclmn = () => {
        setClnme(
            [
                ...clnme,
                { id: clnmeid }
            ]
        )
        setClnmeid(clnmeid + 1)
    }
    const stnm = (e) => {
        console.log(document.getElementById("brdnm").value);
        setData(data => {
            return {
                ...data,
                "name": document.getElementById("brdnm").value,
                "columns": clm
            }
        })
    }
    const sbmt = (e) =>{
        for(let i=0;i<document.getElementsByClassName("subtasksipbrd").length;i++){
            if(document.getElementsByClassName("subtasksipbrd")[i].value=="") continue;
            setClm(clm.push({
                "name":document.getElementsByClassName("subtasksipbrd")[i].value,
                "tasks":[]
            }))
        }
        setData(data => {
            return{
                ...data,
                "columns":clm
            }
        })
        setClm([])
        dispatch(crtbrd(e));
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
                className='taskmodel w-[30vw] bg-slate-900 h-[60vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden text-white'
            >
                <p className=' text-2xl text-center'>Add New Board</p>
                <div className='flex flex-col mt-4 mx-5'>
                    <label htmlFor="tsknm">Board Name</label>
                    <input
                        type="text"
                        className='bg-transparent border-white border-[0.1rem] px-3 rounded-md'
                        name="taskname"
                        id="brdnm"
                        placeholder='e.g Web Design'
                        onChange={stnm}
                    />
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <label>Board Column</label>

                    {clnme.map((e) => {
                        return (
                            <div className='w-screen mb-1 subtasks' id={`clnme-${e.id}`}>
                                <input
                                    key={e.id}
                                    type="text"
                                    className='bg-transparent border-white border-[0.1rem] px-3 rounded-md w-[23%] subtasksipbrd'
                                    name="columnname"
                                    placeholder='Doing'
                                />
                                <FontAwesomeIcon
                                    id={e.id}
                                    key={`btnclnme-${e.id}`}
                                    icon={faXmark}
                                    className='btncls ml-1 cursor-pointer text-xl'
                                    onClick={(e)=>e.target.parentElement.closest('div').remove()}
                                />
                            </div>
                        )
                    })}


                    <button className='bg-white mt-3 rounded-full text-[#635fc7] font-bold' onClick={addclmn}>
                        <FontAwesomeIcon icon={faPlus} /> <p className='inline'>Add New Column</p>
                    </button>
                </div>
                <div className='flex flex-col mt-4 mx-5'>

                    <button
                        className='bg-[#735fc7] mt-3 rounded-full text-white font-bold'
                        onClick={()=>sbmt(data)}
                        >
                        Create New Board
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoardModel
