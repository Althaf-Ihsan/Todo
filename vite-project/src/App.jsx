import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [todo, setTodo] = useState(()=>
   JSON.parse(localStorage.getItem("task"))
  )
  const [Textvalue, setValue] = useState('')
  useEffect(()=>{
    localStorage.setItem("task",JSON.stringify(todo))
  },[todo])
  //input text
  const addText = (e) => {
    setValue(e.target.value)
  }
  //addTask
  const addTask = () => {
    setTodo([...todo, { id: Date.now(), task: Textvalue, checked: false }])
    console.log(todo)
    setValue('')
  }
  //checkTask
  const checkTask = (index) => {
   const updateTodo=[...todo]
   updateTodo[index].checked=!updateTodo[index].checked
   setTodo([...updateTodo])
  }
  //deleteTask
  const deleteTask=(e)=>{
  let index=  todo.findIndex((elem)=>{
      return e.id==elem.id
    })
    if(index!=-1)
    {
      todo.splice(index,1)
      setTodo([...todo])
    }
    localStorage.removeItem("task")
  }
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
      </div>
      <div className="input">
        <input type="text" placeholder=" Add item..." value={Textvalue} onChange={addText} />
        <i className="fas fa-plus" onClick={addTask}></i>
      </div>
      <div className="todos">
        {todo.map((e,index) => {
          if (e.task !== '') {
            return <div className="todo">
              <div className="left">
                <input type="checkbox" checked={e.checked} onChange={() => checkTask(index)} />
                <p key={index} style={{
                  textDecoration: e.checked ? 'line-through' : 'none',
                }}>{e.task}</p>
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={()=>deleteTask(e)}></i>
              </div>
            </div>
          }
        })}
      </div>
    </div>
  );
}

export default App
