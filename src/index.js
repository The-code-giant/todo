import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faRedoAlt,
  faWindowClose,
  faBars
} from "@fortawesome/free-solid-svg-icons";

import "bulma/css/bulma.css";
import "./styles.css";

import TaskList from "./task-list";
import TodoForm from "./todo-form";

library.add(faCheck, faRedoAlt, faWindowClose, faBars);

const selectedItems = {};

function App() {

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {

    const localData = getData();

    if (localData && localData.length && Array.isArray(localData)) {

      setTasks(localData.filter(el => el != null));
      
    }

  }, []);

  const getData = () => {
    try {

      if (typeof (Storage) !== "undefined") {
        if (localStorage.tasksData)
          return JSON.parse(localStorage.tasksData);
      }

      return false;
    } catch (err) {
      console.log("ERROR in persistData: ", err);
      return false;
    }
  };

  const persistData = (theTasks) => {
    try {
      if (typeof (Storage) !== "undefined") {
        localStorage.tasksData = JSON.stringify(theTasks);
      } else {

        alert("Sorry no local storage support")
      }
    } catch (err) {
      console.log("ERROR in persistData: ", err)
    }
  };


  const removeTasks = () => {
    const newTasks = tasks.filter(item => typeof selectedItems[`id${item.id}`] === "undefined");
    setTasks(newTasks); persistData(newTasks);
  };

  const completeTasks = () => {
    const newTasks = tasks.map(item => {
      if (typeof selectedItems[`id${item.id}`] !== "undefined") {
        item.complete = true;
      }

      return item;
    });
    setTasks(newTasks);
    persistData(newTasks);
  };

  const onMultiSelect = (item, status) => {

    if (status === true) selectedItems[`id${item.id}`] = 1;
    else if (selectedItems[`id${item.id}`]) delete selectedItems[`id${item.id}`];

  }

  const handleAddTask = () => {

    if(!currentTask) return;

    const newTasks = [...tasks, currentTask];
    setTasks(newTasks);
    setCurrentTask(null);
    persistData(newTasks);

  };

  const handleRemoveTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    persistData(newTasks);
  };

  const handleCompleteTask = index => {
    const newTasks = [...tasks];
    newTasks[index].complete = !newTasks[index].complete;
    setTasks(newTasks); persistData(newTasks);
  };

  return (
    <div className="App content">
      <h1 className="title">To Do List</h1>
      <TodoForm
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleAddTask={handleAddTask}
        removeTasks={removeTasks}
        completeTasks={completeTasks}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onMultiSelect={onMultiSelect}
        handleRemoveTask={handleRemoveTask}
        handleCompleteTask={handleCompleteTask}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
