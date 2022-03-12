import React,{useState} from 'react';
import './AddTaskForm.css';

const AddTaskForm = (props) => {
    const [editing,setediting] = useState (false)
    const [value,setValue] = useState("")

      const handleChange = (e) => {
        setValue(e.target.value)
      }
      const  clickSubmit=(event)=> {
        event.preventDefault();
        const taskText = value.trim();
        const listNumber = props.formNum;
        if (taskText && props.onAdd) {
          props.onAdd(taskText, listNumber);
        }
        setValue("")
      }
    
     const setEditing = (editing) => {
         setediting(editing);
      }
      console.log("propsprops",props)

      const deleteTaskk = (id) => {
         props.deleteTask(id)
      }

    return (
        <>
            <form className="card add-task-form">
                <input type="text" class="task-input" value={value} name="textValue" onChange={(e) => handleChange(e)} placeholder="Add a task" />
                <div>
                  {
                    value.length > 0 &&
                    <button className="button add-button" onClick={(e) => clickSubmit(e)} >Submit Task</button>
                  }
                   
                </div>
            </form>
            <button className="button add-button" onClick={() => deleteTaskk(props.formNum)} >Delete List</button>

        </>
    );
};

export default AddTaskForm;