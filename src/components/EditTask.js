import React, { useState } from "react";

const EditTask = () => {
  const [task, setTask] = useState("");
  return (
    <div>
      <form onsubmit="handleForm">
        <input
          type="text"
          placeholder="Please Eneter your Task"
          name="task"
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default EditTask;
