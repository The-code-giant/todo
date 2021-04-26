import React from "react";

const TodoForm = ({ currentTask, setCurrentTask, handleAddTask, completeTasks, removeTasks }) => {
  return (
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field has-addons has-addons-centered">
          <p className="control">
            <input
              className="input is-primary"
              type="text"
              placeholder="task description"
              value={currentTask ? currentTask.description : ""}
              onChange={event =>
                setCurrentTask({
                  complete: false,
                  description: event.target.value,
                  id: Math.round(Math.random() * 9999999999)
                })
              }
            />
          </p>
          <p className="control">
            <button
              className="button is-info"
              onClick={handleAddTask}
            >
              Add Task
              </button>
          </p>
          <p className="control">
            <button
              className="button is-info"
              onClick={removeTasks}
            >
              Remove Tasks
              </button>
          </p>
          <p className="control">
            <button
              className="button is-info"
              onClick={completeTasks}
            >
              Complete Tasks
              </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
