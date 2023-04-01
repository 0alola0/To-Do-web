import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import { useState, useEffect, useRef } from 'react';
import TaskList from './TaskList';
import getData from './hooks/getData';
import StatusContainerDesktop from './StatusContainerDesktop'
import StatusContainerMobile from './StatusContainerMobile'
import axios from 'axios';
import TodoForm from './TodoForm';
import EditForm from './EditForm';




const Landing = () => {
    const [cookies , setCookies] = useCookies(["access_token"])
    const [currentFilter, setCurrentFilter] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState(null)


    const navigate = useNavigate()
    !cookies.access_token&& navigate("/login")

    let currentUser = localStorage.getItem("userID")

    const {data, loading, error, refetch} = getData(`http://localhost:3000/todo/${currentUser}`)

    
    data?.map(item => console.log(item.description))

    const handleFilterClick = (action) => {
        setCurrentFilter(action)
        console.log(currentFilter)
    }

    const deleteTask = async (id) => {
        console.log("tried to delete", id)
        await axios.delete(`http://localhost:3000/todo/delete/${id}`)
        refetch()
    }

    const updateTask = async (id, text) => {
        try{
            const res = await axios.put("http://localhost:3000/todo/edit", {
                id: id,
                description: text
            })
            refetch()
        }catch(err){
            console.log(err)
        }
        closeEdit()
    }
    const toggleCheckmark = async (id, bool) => {
        try{
            const res = await axios.put(`http://localhost:3000/todo/toggle/${id}/${bool}`)
            refetch()
        }catch(err){
            console.log(err)
        }
    }
    const deleteComplete = async () =>{
        try{
            const res = await axios.delete("http://localhost:3000/todo/filter")
            refetch()
        }catch(err){
            console.log(err)
        }
    }
    
    const enterEdit = (task) => {
        setEditedTask(task)
        setIsEditing(true)
    }
    const closeEdit = () => {
        setIsEditing(false)
    }


    let currentScreen = window.innerWidth    

    console.log(data, "kkkkkkkkkk")

  return (
    <div>
        <div className="app-container">
        {
            isEditing?(<EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEdit={closeEdit}
            />) : ""
        }
            <TodoForm refetch={refetch}/>
            {/* <TaskForm addTask={addTask}/> */}
            <div className="tasks-container">
              {/* პირველ რიგში უნდა შევამოწმოთ გვაქვს თუ არა თასქები და მხოლოდ შემდეგ დავამატოთ ისინი დომში, ამისთვის ვიყენებთ && ოპერატორს. შემდეგ კი უნდა გავატანოთ ჩვენი თასქები პროფსებად  რომ პირდაპირ მათ სთეითთან ჰქონდეთ წვდომა*/}
              {data? <TaskList
               data={data}
               deleteTask={deleteTask}
               enterEdit={enterEdit}
               toggleCheckmark={toggleCheckmark}
               currentFilter={currentFilter}
              
              /> : ""}  
            </div>
    
            {
              currentScreen > 650? <StatusContainerDesktop taskAmount={data?.length} handleFilterClick={handleFilterClick} deleteComplete={deleteComplete} /> : <StatusContainerMobile taskAmount={data?.length} handleFilterClick={handleFilterClick} deleteComplete={deleteComplete}/>
            }

    
            <div className="hint">
              <h4>hint: you can drag tasks to reorder</h4>
            </div>

        </div>
       
    </div>
  );
}

export default Landing;
