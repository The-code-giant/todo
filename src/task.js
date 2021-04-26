import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from '@material-ui/core/Checkbox';

const Task = ({ task, taskIndex, addSelection, handleRemoveTask, handleCompleteTask }) => {

  const [selected, setSelected] = useState(false);

  const handleChange = ({target: { checked }}) => {
    addSelection(checked);
    setSelected(checked);
  };

  return (
    <>
      <Checkbox
        size="small"
        checked={selected}
        onChange={handleChange}
        className="icon has-text-info"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        style={{ marginBottom: 7 }}
      />

      <span className="icon has-text-info">
        <FontAwesomeIcon
          icon="window-close"
          onClick={() => handleRemoveTask(taskIndex)}
          style={{ cursor: "pointer" }}
        />
      </span>
      <span className="icon has-text-info">
        <FontAwesomeIcon
          icon={task.complete ? "redo-alt" : "check"}
          onClick={() => handleCompleteTask(taskIndex)}
          style={{ cursor: "pointer", color: task.complete ? "#f00" : "" }}
        />
      </span>
      <span
        style={{
          textDecoration: task.complete ? "line-through" : "none",
          paddingLeft: "8px",
          textTransform: "uppercase"
        }}
      >
        {task.description}
      </span>
      <span className="icon has-text-info bars-right">
        <FontAwesomeIcon icon="bars" style={{ color: "#ddd" }} />
      </span>
    </>
  );
};

export default Task;
