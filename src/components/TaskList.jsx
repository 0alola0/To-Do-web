import React from 'react';
import TaskItem from './TaskItem';
import { useState, useEffect, useRef } from 'react';


const TaskList = ({data, toggleCheckmark, deleteTask, enterEdit, currentFilter}) => {
    const [tasks, setTasks] = useState(data,[])
    const dragItem = useRef()
    const dragOverItem = useRef()
    
   useEffect(() => {
     setTasks(data)
   }, [data]);
    console.log(data, "log from tasklist")
    const dragStart = (e, position) => {
      dragItem.current = position
      console.log(position, "pos")
    }
    const dragEnter = (e, position) => {
      dragOverItem.current = position
      console.log(position, "pos2")
    }
    
    const drop = (e) => {
      var temporaryTasksReorder = [...tasks]
      const dragItemContent = temporaryTasksReorder[dragItem.current]
      temporaryTasksReorder.splice(dragItem.current, 1)
      temporaryTasksReorder.splice(dragOverItem.current,0,dragItemContent)
      dragItem.current = null
      dragOverItem.current = null
      setTasks(temporaryTasksReorder)
    }
    console.log( "hhhhhh")

  return (
    <ul className="tasks">
        { 
            tasks?.filter(t => t.checked != currentFilter).map( (task, index) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    enterEdit={enterEdit}
                    deleteTask={deleteTask}
                    toggleCheckmark={toggleCheckmark}
                    index={index}
                    dragStart = {dragStart}
                    dragEnter = {dragEnter}
                    drop = {drop}
                />
            ))
        }
    </ul>
  );
}

export default TaskList;
