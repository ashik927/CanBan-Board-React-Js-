import React , {useState , useEffect} from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TaskCard from '../TaskCard/TaskCard';
import './List.css';

const List = (props) => {
  const [checkDisable , setCheckDisable] = useState(false)
  const [renameValue , setRenameValue] = useState()

  useEffect(() => {
    setRenameValue(props.title)
  }, [props.title])

  const cards = props.cards.map((card, index) => {
    return (
      <li key={index}>
        <TaskCard {...card} formNum={props.id}  deleteTaskList={props.deleteTaskList} renameCard={props.renameCard} unLockTaskList={props.unLockTaskList} lockTaskList={props.lockTaskList} onDragStart={props.onDragStart} />
      </li>
    );
  })

   const handleDoubleClick = () => {
    setCheckDisable(true)
   }

   const handleRenameValue = (e) => {
    setRenameValue(e.target.value)
   }
 
  const handleRename =(id) => {
      props.renameTitle(id,renameValue)
      setCheckDisable(false)
  }

  return (
    <div>
      {
        checkDisable ?
        <>
        <input value={renameValue ? renameValue : props.title} onChange={(e)=>handleRenameValue(e)} disabled={checkDisable ? false :true}></input>
        <button onClick={()=>handleRename(props.id)}>Rename</button>
        </>
         :
        <h2 onDoubleClick={()=>handleDoubleClick()} className={`name-header name-${props.id}`}>{props.title}</h2>
      }
      <ul className="list" onDragOver={props.onDragOver} onDrop={props.onDrop}>
        {cards}
        <li className="add-list-wrapper">
          <AddTaskForm formNum={props.id} onAdd={props.onAdd} deleteTask={props.deleteTask} />
        </li>
      </ul>
    </div>
  );
};

export default List;