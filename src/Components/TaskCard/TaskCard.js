import React from 'react';
import './TaskCard.css';

const TaskCard = (props) => {
    return (
        <div className="task-card" draggable="true" id={[props.timeId]} onDragStart={props.onDragStart}>
              {props.taskText}
    </div>
    );
};

export default TaskCard;