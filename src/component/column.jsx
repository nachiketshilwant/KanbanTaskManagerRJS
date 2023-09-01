import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddColl from './models/addcoll'
import Edtsubtsk from './models/edtsubtsk'


const Column = (props) => {
  const [addMode,setAddMode] = useState(false)
  const [tk,setTk] = useState(false)
  const [ttl,setTl] = useState()
  const [ac,setAc] = useState()
  const tsk = useSelector(state => state.task.boards);
  let tsk1;
  for (let i = 0; i < tsk.length; i++) {
    if (tsk[i].isActive == true) tsk1 = i;
  }
  const column = tsk[tsk1].columns;

  const shwAdcol = (e) => {
      setAddMode(e)
  }
  const shwTsk = (e, tl, ac) =>{
    setAc(ac)
    setTl(tl)
    setTk(e)
  }

  return (

    <div className='flex overflow-auto column'>
      {column.map((e) => {
        return (
          <div >
            <div className=' w-[25vw] flex flex-col items-center text-white '>
              <h2 className='flex items-center my-5'>
                <p className=' rounded-full h-4 w-4 bg-red-500'></p> <span>{e.name} ( {e.tasks.length} )</span>
              </h2>
              {e.tasks.map(ele => {
                let cmpsbtsk = 0;
                ele.subtasks.map(elem => {
                  if (elem.isCompleted == true) cmpsbtsk++;
                })

                return (
                  <div 
                  className='bg-[#2b2c37] min-h-min p-7 rounded-lg w-[20vw] my-[2%] cursor-pointer'
                  onClick={()=>shwTsk(true, ele.title,e.name)}>
                    <p className=' font-bold hover:text-[#635fc7] '>{ele.title}</p>
                    <p className=' text-xs text-gray-400 '>{cmpsbtsk} of {ele.subtasks.length} completed tasks</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className=' my-[7%] mx-[5%]  text-gray-500'
      onClick={()=>shwAdcol(true)}>
        <p className='bg-[#2b2c37] w-[20vw] rounded-lg flex justify-center items-center h-[80vh] cursor-pointer '>
          <FontAwesomeIcon icon={faPlus} /> New Column
        </p>
      </div>

        {addMode && <AddColl shwTask={shwAdcol} act={props.act} />}
        {tk && <Edtsubtsk shwTask={shwTsk} title={ttl} act={props.act} ac={ac} /> }
    </div>

  )
}

export default Column
