import React from "react";
import Task from "./Task";
import PropTypes from "prop-types";
import { useDispatch, useSelector} from "react-redux";
import { updateTaskState } from "../lib/store";

export default function TaskList() {
   //Retrieve state from store
    const tasks = useSelector((state)=>{
      const tasksInOrder = [
        ...state.taskbox.tasks.filter((t)=>t.state === 'TASK_PINNED'),
        ...state.taskbox.tasks.filter((t)=>t.state !== 'TASK_PINNED'),
      ];

      return tasksInOrder;
      
      /*Specify how you want to display archived task look like*/
      // const filteredTasks = tasksInOrder.filter((t)=>t.state === 'TASK_PINNED' || t.state === 'TASK_INBOX');
      // return filteredTasks;
    })

    const { status } = useSelector((state)=>state.taskbox);

    //dispatch action to handle with data changes for store
    const dispatch = useDispatch();

    const pinTask = (value)=>{
      dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED'}));
    }

     const archiveTask = (value) => {
       dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
     };

    const LoadingRow = (
        <div className="loading-items">
            <span className="glow-checkbox"/>
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    )
  
    /*Loading Tasks*/
    if (status === 'loading') {
        return (
        <div className="list-items" data-testid="loading" key={"loading"}>
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
        </div>
        );
    }

    /*No Tasks*/
    if (tasks.length === 0) {
      return (
        <div className="list-items" key={"empty"} data-testid="empty">
          <div className="wrapper-message">
            <span className="icon-check" />
            <p className="title-message">You have no tasks</p>
            <p className="subtitle-message">Sit back and relax</p>
          </div>
        </div>
      );
    }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          task={task} 
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task)=>archiveTask(task)}
        />
      ))}
    </div>
  );
}

