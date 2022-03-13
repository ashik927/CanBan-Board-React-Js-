import React, { useState, useEffect } from 'react';
import List from '../List/List';
import './Board.css';

const Board = () => {

    const [lists, setLists] = useState([])
    const [load, setLoad] = useState(false)
    const [value,setValue] = useState("")

    useEffect(() => {
        setLoad(false)
    }, [load])
    const onDragStart = (e, fromList) => {
        const dragInfo = {
            taskId: e.currentTarget.id,
            fromList: fromList
        }
        localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDrop = (e, listNum) => {
        const droppedTask = localStorage.getItem('dragInfo');
        const parsedLS = lists;
        const parsedDragInfo = JSON.parse(droppedTask)
        const cardsArray = parsedLS[parsedDragInfo.fromList].cards
        const taskCard = cardsArray.find(card => card.timeId == parsedDragInfo.taskId)
        const indexOfCard = cardsArray.findIndex(card => card.timeId == parsedDragInfo.taskId)
        parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1)
        parsedLS[listNum].cards.push({ ...taskCard, listNumber: parseInt(listNum) })
        setLists(parsedLS);
        setLoad(true)
    }

    //add some new task cards
    const addTaskCard = (taskText, listNumber) => {
        let parsedLS = lists;
        const newTask = {
            taskText,
            listNumber,
            timeId: new Date().valueOf()
        }
        parsedLS[listNumber].cards.push(newTask)
        setLists(parsedLS)
        setLoad(true)
    }

    var listsAll = lists && lists.length > 0 && lists.map((list, index) => (
        <li className="list-wrapper" key={index}>
            <List {...list}
                onAdd={(taskText, listNumber) => addTaskCard(taskText, listNumber)}
                onDragStart={(e, fromList) => onDragStart(e, `${list.id}`)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e, listNum) => { onDrop(e, `${list.id}`) }}
                deleteTask={(id)=>deleteTask(id)}
                lockTaskList={(id,timeId)=>lockTaskList(id,timeId)}
                unLockTaskList={(id,timeId)=>unLockTaskList(id,timeId)}
                renameCard={(id,timeId,name)=>renameCard(id,timeId,name)}
                deleteTaskList={(id,timeId,name)=>deleteTaskList(id,timeId,name)}
                renameTitle={(id,name)=>renameTitle(id,name)}
            />
        </li>
    ));

    const handleChange = (e) => {
        setValue(e.target.value)
      }

    const  clickSubmit=(event)=> {
    event.preventDefault();
        let parsedLS = lists;
        let addTitle = {
            title: value,
            id: lists.length ?? 0,
            cards: []
        }
        parsedLS.push(addTitle)
        setValue("")
        setLists(parsedLS)
        setLoad(true)
    }

    const deleteTask = (id) =>{
        const confirm = window.confirm('Are you sure you want to delete')
        if(confirm){
        const filterData = lists && lists.filter(singleList=>singleList.id != id)
        setLists(filterData)
        setLoad(true)
        }   
    }

    const lockTaskList = (id , timeid) =>{
        const newList = lists
        const filterList = lists && lists.find(singleList=>singleList.id == id)
        const filterTask = filterList && filterList?.cards?.find(value=>value.timeId == timeid)
        const filterTaskIndex = filterList && filterList?.cards?.findIndex(value=>value.timeId == timeid)
        filterTask.lock = true
        newList[id].cards.splice(filterTaskIndex,1,filterTask)
        setLoad(true)
        setLists(newList)
    }

    const unLockTaskList = (id , timeid) =>{
        const newList = lists
        const filterList = lists && lists.find(singleList=>singleList.id == id)
        const filterTask = filterList && filterList?.cards?.find(value=>value.timeId == timeid)
        const filterTaskIndex = filterList && filterList?.cards?.findIndex(value=>value.timeId == timeid)
        filterTask.lock = false
        newList[id].cards.splice(filterTaskIndex,1,filterTask)
        setLoad(true)
        setLists(newList)
    }

    const renameCard = (id , timeid , name) =>{
        const newList = lists
        const filterList = lists && lists.find(singleList=>singleList.id == id)
        const filterTask = filterList && filterList?.cards?.find(value=>value.timeId == timeid)
        const filterTaskIndex = filterList && filterList?.cards?.findIndex(value=>value.timeId == timeid)
        filterTask.taskText = name
        newList[id].cards.splice(filterTaskIndex,1,filterTask)
        setLoad(true)
        setLists(newList)
    }

   const renameTitle = (id,name) => {
    const newList = lists
    newList[id].title = name
    setLists(newList)
    setLoad(true)
   }
   
   const deleteTaskList = (id , timeid) =>{
       let confirm = window.confirm('Are you sure you want to delete?')
       if(confirm){
        const newList = lists
        const filterList = lists && lists.find(singleList=>singleList.id == id)
        const filterTask = filterList && filterList?.cards?.find(value=>value.timeId == timeid)
        const filterTaskIndex = filterList && filterList?.cards?.findIndex(value=>value.timeId == timeid)
        filterTask.lock = true
        newList[id].cards.splice(filterTaskIndex,1)
        setLoad(true)
        setLists(newList)
       }   
   }

    return (
        <div className="board">
            <ul className="lists">
                {
                    listsAll && listsAll.length > 0 ?
                       <>
                        {listsAll}
                        <form className="card add-task-form">
                        <input style={{ border:'1px solid red' }}  value={value} type="text" class="task-input"  name="textValue" onChange={(e) => handleChange(e)} placeholder="Add a Title" />
                        {
                           value.trim().length > 0 &&
                            <div>
                                <button className="button add-button" onClick={(e) => clickSubmit(e)} >Add a List</button>
                            </div>
                        }
                        </form>
                       </>
                        :
                        <form className="card add-task-form">

                            <input style={{ border:'1px solid red' }} value={value} type="text" class="task-input"   onChange={(e) => handleChange(e)} placeholder="Add a Title" />
                           
                           {
                           value.trim().length > 0 &&
                           <div>
                                <button className="button add-button" onClick={(e) => clickSubmit(e)} >Add a List</button>
                            </div>}
                        </form>
                }
            </ul>
        </div>
    );
};

export default Board;