import React, { useState } from 'react';
import { CheckIcon, PencilSquareIcon, XMarkIcon  } from '@heroicons/react/24/outline';


const TaskItem = ({task, dragStart, dragEnter, drop, index, enterEdit, deleteTask, toggleCheckmark}) => {
  const [isChecked, setIsChecked] = useState(task.checked)

  const handleCheckox = (e) => {
    setIsChecked(!isChecked)
    toggleCheckmark(task._id, !task.checked)
  }

  return (
    <li className="task drag" id="draggable" 
    onDragStart={(e) => dragStart(e, index)}
    onDragEnter={(e) => dragEnter(e, index)}
    onDragEnd={drop}
    draggable="true"
    >
        <input checked={isChecked} type="checkbox" className={isChecked? "completor checked" : "completor"}  onChange={handleCheckox}/>
        <label htmlFor={task.id} className={isChecked? "label-container crossed" : "label-container"}><span className={isChecked? "custom-checkbox checked" : "custom-checkbox"} onClick={handleCheckox}>{isChecked&&<CheckIcon width={15} height={15}  strokeWidth={3.00}/>}</span>{task.description}</label>
        <button className="delete-single" onClick={() => enterEdit(task)}>
            <PencilSquareIcon  width={26} height={26}/>
        </button>
        {/* ღილაკს ვატანთ წაშლის ფუნქციას რომელიც გადმოვიტანეთ app.jsx-იდან მაგრამ აუცილებლად უნდა იყოს ქოლბექ ფუნქცია, რომ მიხოლოდ დაჭერისას განხორციელდეს */}
        <button className="delete-single" onClick={() => deleteTask(task._id)}>
            <XMarkIcon width={26} height={26}/>
        </button>
    </li>
  );
}

export default TaskItem;
//onClick={() => enterEdit(task)}      buttonze    onClick={() => deleteTask(task.id)}
// toggleCheckmark, deleteTask, enterEdit, 