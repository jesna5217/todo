import React, { useEffect, useState } from 'react'
import './box.css'
import pic from '../assets/bgm3.avif'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import { Link } from 'react-router-dom';
import { addToDo, deleteToDo, toggleToDo, updateToDo,initialToDo,deleteAllToDo } from '../Redux/todoSlice'
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import black from "../assets/black2.avif"

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Home() {
  
    const [input,setInput]=useState('');
    const toDoList=useSelector((state)=>state.todoReducer);
    const [editId,setEditId]=useState(null);
    const [editValue,setEditValue]=useState('')
   
    const dispatch=useDispatch()

    const handleToDoList=()=>{
if(input.trim()){
    const date=new Date();
    const index=date.getTime()
const data={
    id:index,
    value:input,
    completed:false,
   
}
    dispatch(addToDo(data));
    setInput('')
}
console.log('to do list',toDoList)  
    }

    const handleEdit=(item)=>{
        setEditId(item.id);
      setEditValue(item.value);//set old as default
    }

    const handleSave=(id)=>{
        dispatch(updateToDo({id:id,value:editValue}));
        setEditId(null)
    }


    useEffect(()=>{
        const savedTodo=localStorage.getItem('todos');
        if(savedTodo){
           const parseTodo=JSON.parse(savedTodo);
           dispatch(initialToDo(parseTodo))
        }
   
     },[dispatch])
       
    useEffect(()=>{
        const uniqueToDo=Array.from(new Map(toDoList.map(item=>[item.id,item])).values());
       localStorage.setItem('todos',JSON.stringify(uniqueToDo)) 
    },[toDoList])

 const uniqueToDo=Array.from(new Map(toDoList.map(item=>[item.id,item])).values());

 const [show, setShow] = useState(false);
const [darkMode,setDarkMode]=useState(false)

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const handleModal=()=>{
    dispatch(deleteAllToDo());
    handleClose();
    setInput('')
 }


  return (
   <>
   <div className={`row ${darkMode ? 'dark-mode' : ''}`}>
  
  <div className="col-md-4 "></div>
  <div className={`col-md-4 box ${darkMode ? 'bg-black text-white' : ''}`}>
    <div className='ash text-center d-flex justify-content-between align-items-center'>
    <Menu menuButton={<i class="fa-solid fa-sort sort"></i>} transition>


 <Link to={'/done'} style={{textDecoration:'none',color:'black'}}> <MenuItem>COMPLETED</MenuItem></Link>
  
<Link to={'/not'} style={{textDecoration:'none',color:'black'}}><MenuItem>NOT COMPLETED</MenuItem></Link>


 </Menu>
        <h1>TO DO LIST</h1>
        <div className="d-flex options" >
<i className='fa-solid fa-trash  delete me-3' style={{color:'rgb(172, 35, 35)'}} onClick={handleShow}></i>

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
         ARE YOU SURE YOU WANTED TO DELETE ALL DATA?
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="warning" onClick={handleModal}>CONFIRM</Button>
        </Modal.Footer>
      </Modal>

      <i 
                className="fa-solid fa-moon ms-2" 
                style={{ color: darkMode ? 'black' : 'white' ,cursor:'pointer'}} // Change home button color based on dark mode
                onClick={() => setDarkMode(!darkMode)} 
              ></i> 

</div>
    </div>
    <div className='mt-4 text-center input-column'><input type="text" placeholder='Enter a quick task here' value={input} onChange={(e)=>setInput(e.target.value)}/>
    <button onClick={handleToDoList} className=' add' ><i class="fa-solid fa-plus"></i></button>
    </div>


    <div className='folder'>
        {
    uniqueToDo.length>0?(

    <ul style={{listStyle:'none'}}>
        {
    uniqueToDo.map(item=>(
        <div className='list shadow '> 
               <Checkbox {...label} checked={item.completed} color="default"  onClick={()=>dispatch(toggleToDo(item.id))}/>
{
editId===item.id?<div>
<input placeholder='' onChange={(e)=>setEditValue(e.target.value)} value={editValue} className='edit-input'/> 
</div>:
  <div className='text-box'>  <li className='text'>{item.value}</li></div>

}
{
editId===item.id?
<button className='edit btn'><i class="fa-solid fa-check" onClick={()=>handleSave(item.id)}></i></button>:
<button className='edit pen btn'><i class="fa-regular fa-pen-to-square" onClick={()=>handleEdit(item)}></i></button>



}


    <button className='trash btn' onClick={()=>dispatch(deleteToDo(item.id))} > <i class="fa-solid fa-trash"></i></button>



 <div
    >
   
  </div>


    </div>
    
 ))
}

    </ul>


    ):<div ><img src="" alt="" className='image'/>
<p  className='your'>Your List Is Empty!📃</p>
</div>

}
</div>



{!darkMode ? <div><img src={pic} alt="" height='200px' width='100%' className='image'/></div> :<div>
 <img src={black} alt="" height='200px' width='100%' className='image'/>
 </div>}

   </div>
   <div className="col-md-4 folder">
 
     
    </div>
    </div>



   

   </>
  )
}

export default Home