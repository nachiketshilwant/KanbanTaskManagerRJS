import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dlttsk } from '../../redux/slice'

const Tskellipsis = (props) => {
    const dispatch=useDispatch()
    const [dlt,setDlt] = useState([])

    const dlttask = () => {
        setDlt(dlt.push(props.act))
        setDlt(dlt.push(props.ac))
        setDlt(dlt.push(props.idx))
        dispatch(dlttsk(dlt))
        setDlt([])
        props.shw(false)
        props.shw1(false)
    }
    const edtask = () => {
        props.shw(false)
        props.eedsk(true)
    }

    return (
        <>
            <div>
                <p className=' cursor-pointer'
                onClick={edtask}>Edit Task</p>
                <p className=' cursor-pointer text-red-600'
                onClick={dlttask}
                >Delete Task</p>
            </div>
        </>

    )
}

export default Tskellipsis
