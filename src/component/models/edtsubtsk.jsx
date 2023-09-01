import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { edtsbtsk, chnstas } from '../../redux/slice'
import Tskellipsis from './tskellipsis'
import Edttsk from './edttsk'


const Edtsubtsk = (props) => {
    const dt = useSelector(state => state.task.boards[props.act].columns)
    const [chk1, setChk] = useState()
    const [actn, setActn] = useState([])
    const [stat, setStat] = useState([])
    const [edtt,setEdtt] = useState(false)
    const [edsk,setEdsk] = useState(false)
    const dispatch = useDispatch()

    let chk = 0;
    let ind, idx;
    for (let i = 0; i < dt.length; i++) {
        if (dt[i].name == props.ac) {
            ind = i;
            break;
        }
    }
    // setInd(idx)
    for (let i = 0; i < dt[ind].tasks.length; i++) {
        if (dt[ind].tasks[i].title == props.title) {
            idx = i;
        }
    }
    useEffect(() => {
        dt[ind].tasks[idx].subtasks.map(e => {
            if (e.isCompleted == true) {
                chk++;
            }
        })
        setChk(chk / 2)
    }, [])

    const [e,setE]=useState(0)
    const edtts = () =>{
        if(e==0){ 
            setEdtt(true)
            setE(1)
        }else{ 
            setEdtt(false)
            setE(0)
        }
    }

    const chked = (ele) => {
        dt[ind].tasks[idx].subtasks.map(e => {
            if (e.title == ele) {
                setActn(actn.push(props.act))
                setActn(actn.push(ind))
                setActn(actn.push(idx))
                setActn(actn.push(ele))
                if (e.isCompleted == true) {
                    setActn(actn.push({
                        ...e,
                        "isCompleted": false
                    }))
                    setChk(chk1 - 1);
                } else {
                    setActn(actn.push({
                        ...e,
                        "isCompleted": true
                    }))
                    setChk(chk1 + 1)
                }
            }
        })
        dispatch(edtsbtsk(actn));


        setActn([])
    }

    const chsts = (ele) => {
        setStat(stat.push(props.act))
        setStat(stat.push(ind))
        setStat(stat.push(idx))
        setStat(stat.push(ele))
        setStat(stat.push({
            ...dt[ind].tasks[idx],
            "status": ele
        }))
        dispatch(chnstas(stat))
        setStat([])
        props.shwTask(false)
        // console.log(idx)
    }

    return (
        <>
        <div
            className='flex items-center justify-center min-h-screen absolute top-0 left-0 backdrop-blur-[1rem] w-screen'>
            <div
                className=' absolute top-[5%] left-[80%] text-4xl cursor-pointer'
                onClick={() => props.shwTask(false)}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                />
            </div>
            <div
                className='taskmodel w-[40vw] bg-slate-900 h-[60vh] p-2 rounded-xl overflow-y-auto overflow-x-hidden text-white'
            >
                <div className="flex">
                    <p className=' flex text-xl w-[90%] mt-[0.5rem] font-medium'>{props.title}  </p>
                    <div className='flex text-3xl relative ml-[1.5rem] mt-[0.6rem] cursor-pointer '> 
                        <FontAwesomeIcon icon={faEllipsisVertical} onClick={edtts} />
                       { edtt && <div className="absolute right-[1rem] bg-slate-950 w-[8vw] text-sm rounded-xl p-2 " >
                            <Tskellipsis ac={ind} act={props.act} idx={idx} title={props.title} shw={setEdtt} shw1={props.shwTask} eedsk={setEdsk}/>
                        </div>}
                    </div>
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <p className=' font-medium text-[1rem]  text-gray-300'>SubTasks ( {chk1} of {dt[ind].tasks[idx].subtasks.length} ) </p>

                    {dt[ind].tasks[idx].subtasks.map(e => {
                        if (e.isCompleted) {
                            return (
                                <div className=' bg-slate-950 min-h-[2.5rem] rounded-lg mt-3 flex justify-start items-center '>
                                    <input type="checkbox" name="check" className='dnsbtsk mx-4 ' defaultChecked
                                        onChange={() => chked(e.title)}
                                    />
                                    <p>{e.title}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div className=' bg-slate-950 min-h-[2.5rem] rounded-lg mt-3 flex justify-start items-center '>
                                    <input type="checkbox" name="check" className='dnsbtsk mx-4 '
                                        onChange={() => chked(e.title)} />
                                    <p>{e.title}</p>
                                </div>
                            )
                        }
                    })}
                    {/* <div className=' bg-slate-950 min-h-[2.5rem] rounded-lg mt-3 flex justify-start items-center '>
                        <input type="checkbox" name="check" className='dnsbtsk mx-4 ' />
                        <p>Add search endpoint </p>
                    </div> */}
                </div>
                <div className='flex flex-col mt-4 mx-5'>
                    <p className=' font-medium '>Current Status</p>
                    <select name="status" className='bg-transparent w-[100%] border-white border-[0.1rem] rounded-md' id="sts"
                        onChange={() => chsts(document.getElementById("sts").value)}>
                        {dt.map(e => {
                            if (dt[ind].tasks[idx].status == e.name) {
                                return (
                                    < option value={e.name} className='text-slate-950' selected > {e.name}</option>
                                )
                            } else {
                                return (
                                    <option value={e.name} className=' text-slate-950 '>{e.name}</option>
                                )
                            }
                        })}
                    </select>
                </div>
            </div>

        { edsk && <Edttsk edsk={setEdsk} title={props.title} ac={props.ac} act={props.act} ind={ind} idx={idx}  />}
        </div>
        </>
    )
}

export default Edtsubtsk
