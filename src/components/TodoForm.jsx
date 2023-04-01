import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useCookies} from 'react-cookie'
import {PlusIcon} from '@heroicons/react/24/outline'


const TodoForm = ({refetch}) => {
    const [task, setTask] = useState("")
    const [cookies , setCookies] = useCookies(["access_token"])
    let currentUser = localStorage.getItem("userID")
    
    const handleTaskSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:3000/todo/create", {
                description: task,
                parent: currentUser
            })
            refetch()
        }catch(err){
            console.log(err)
        }finally{
            setTask("")
        }
    }

  return (
    <form className="todo" onSubmit={handleTaskSubmit}>
            <button 
            className="submit-task"
            type="submit"
            aria-label="add task" >
            <PlusIcon color="white" strokeWidth={2.50} />
            </button>

            <input 
            type="text" 
            id="task" className="add-task" 
            placeholder="what is it that you must do?" 
            required
            autoFocus
            value={task}
            onInput={(e)=>setTask(e.target.value)}
            />
    </form>
  );
}

export default TodoForm;
