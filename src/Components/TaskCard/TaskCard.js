import React,{useState ,useEffect} from 'react';
import './TaskCard.css';

const TaskCard = (props) => { 
    const [checkDisable , setCheckDisable] = useState(false)
    const [renameValue , setRenameValue] = useState()

    const handleDoubleClick = () => {
        setCheckDisable(true)
    }
    
    useEffect(() => {
        setRenameValue(props.taskText)
    }, [props.taskText])

    const handleRename = (id,timeId) => {
        setCheckDisable(false)
        props.renameCard(id,timeId,renameValue)
    }

    const handleRenameValue = (e) => {
        setRenameValue(e.target.value)
    }

    return (
        <div className="task-card" draggable={props.lock ? false : true} id={[props.timeId]} onDragStart={props.onDragStart}>
          { 
           !checkDisable ?
            <div onDoubleClick={handleDoubleClick}>
                 {props.taskText}
            </div>
          :
           <div onDoubleClick={handleDoubleClick}>
                 <input value={renameValue ? renameValue : props.taskText} onChange={(e)=>handleRenameValue(e)} disabled={checkDisable ? false :true}></input>
                 <button onClick={()=>handleRename(props.formNum , props.timeId )}>Rename</button>
            </div>}
            <button onClick={()=>props.deleteTaskList(props.formNum ,props.timeId )}> Delete</button>
              {
              !props.lock ?
              <button onClick={()=>props.lockTaskList(props.formNum ,props.timeId )}> Lock</button>
               :
              <button onClick={()=>props.unLockTaskList(props.formNum ,props.timeId )}> Locked</button>
              }
       </div>
    );
};

export default TaskCard;