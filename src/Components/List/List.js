import React from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TaskCard from '../TaskCard/TaskCard';
import './List.css';

const List = (props) => {

    const cards = props.cards.map((card, index) => {
        return ( 
          <li key={index}>
            <TaskCard {...card} onDragStart={props.onDragStart} />
          </li>
        );
      })

    return (
         <div>
        <h2 className={`name-header name-${props.id}`}>{props.title}</h2>
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