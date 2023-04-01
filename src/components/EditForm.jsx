import React from 'react';
import {useState, useEffect} from 'react';
import {CheckIcon} from '@heroicons/react/24/outline'


const EditForm = ({editedTask, updateTask, closeEdit}) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.description)

    useEffect(()=>{
        const closeModalOnEsc = (e) => {
            e.key == "Escape"? closeEdit(): ""
        }
        window.addEventListener('keydown', closeModalOnEsc)
        return()=> {
            window.removeEventListener('keydown', closeModalOnEsc)
        }
    }, [closeEdit])

    const handleTaskSubmit = (e) =>{
        e.preventDefault()
        updateTask(editedTask._id, updatedTaskName)
    }
    
  return (
      <div className="update-wrapper">
        <form className="todo editor" onSubmit={handleTaskSubmit}>
            <button 
            className="submit-task"
            type="submit"
            aria-label="edit task" >
            <CheckIcon color="white" strokeWidth={2.50} />
            </button>

            <input 
            type="text" 
            id="editTask" className="add-task" 
            placeholder="update task" 
            required
            autoFocus
            value={updatedTaskName}
            onInput={(e)=>setUpdatedTaskName(e.target.value)}
            />
        </form>
        <h5 className="close-edit">Press esc to undo and close the window</h5>

      </div>

  );
}

export default EditForm;
