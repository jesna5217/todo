import { createSlice } from "@reduxjs/toolkit";

const toDoSlice=createSlice({
    name:'todo',
    initialState:[],
    reducers:{
 addToDo:(state,action)=>{
  state.push(action.payload)
 },
deleteToDo:(state,action)=>{
    return state.filter(item=>item.id!==action.payload)
},
toggleToDo:(state,action)=>{
    const item=state.find(item=>item.id===action.payload);
    if(item){
        item.completed=!item.completed;
    }
},
updateToDo:(state,action)=>{
    const editItem=state.find(item=>item.id===action.payload.id)
    if(editItem){
        editItem.value=action.payload.value;
    }
},
deleteAllToDo:(state)=>{
    return state=[];
},
initialToDo:(state,action)=>{
    return [...state,...action.payload]
  
}
 
}
    
})
export default toDoSlice.reducer;
export const {addToDo,deleteToDo,toggleToDo,updateToDo,deleteAllToDo,initialToDo}=toDoSlice.actions;