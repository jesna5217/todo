import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import { deleteToDo, toggleToDo } from '../Redux/todoSlice';
import empty from '../assets/man.avif'
import './Done.css'
import { Link } from 'react-router-dom';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function Done() {
    const dispatch=useDispatch()
    const list=useSelector((state)=>state.todoReducer);
    console.log(list);
    const completedList=list.filter(item=>item.completed===true)
  return (
    <>
<div className="row">
  <div className="col-md-4"></div>
   <div className="col-md-4 box">
    <div className="ash text-center d-flex justify-content-center align-items-center">
        <h2 className='me-5'>DONE</h2>
<Link to={'/'}><i class="fa-solid fa-house house ms-5" style={{color:'white'}}></i></Link>

    </div>
    {completedList.length>0?
        
        <ul style={{listStyle:'none'}}>
      {
        completedList.map((item)=>(
            <div className="list two">
                <Checkbox className='pink'
        {...label}
    
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }} onChange ={()=>dispatch(toggleToDo(item.id))} checked={item.completed}
      />
            <li className='text '>{item.value}</li>
    <button className='trash' onClick={()=>dispatch(deleteToDo(item.id))} > <i class="fa-solid fa-trash"></i></button>

            </div>
        ))
      }            
        </ul>:
        <div className='text-center empty'>
            <img src={empty} alt="" height='200px' />
            <p style={{fontWeight:500}}>Your list is empty!!!</p>
        </div>
    }
<div className="col-md-4"></div>
</div>
</div>

    </>
  )
}

export default Done