import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [task, setTask] = useState("");
  const [taskList, settaskList] = useState([]);
  const [editingTaskid, setEditingTaskid] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(task);
    const task_Obj = {
      id: uuidv4(),
      task: task,
      isEditable: true,
      isTaskcompleted: false,
    };
    settaskList((previous_task) => [...previous_task, task_Obj]);
    console.log("task_Obj", task_Obj);
    setTask(""); // Clear input after adding task
  };

  const deleteTaks = (id) => {
    settaskList(taskList.filter((selectedTask) => selectedTask.id !== id));
  };
  const editTask = (task) => {
    setEditingTaskid(task.id);
    setEditingTaskText(task.task);
  };

  const saveTask = (id) => {
    settaskList((taskList) =>
      taskList.map((task) =>
        task.id === id ? { ...task, task: editingTaskText } : task
      )
    );
    setEditingTaskid(null);
  };

  return (
    <div>
      <div className="save-dev">
        <form onSubmit={handleForm}>
          <input
            className="input-task"
            type="text"
            placeholder="Please Eneter your Task"
            name="task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button type="submit" className="btn-add">
            AddTask
          </button>
        </form>

        <div className="task-list">
          {taskList.length > 0 && (
            <ul>
              {taskList.map((item) => (
                <li key={item.id}>
                  {editingTaskid === item.id ? (
                    <div>
                      <input
                        type="text"
                        className="input-task-edit"
                        placeholder="Please Change your Task"
                        name="task"
                        value={editingTaskText}
                        onChange={(e) => setEditingTaskText(e.target.value)}
                      />

                      <button
                        onClick={() => saveTask(item.id)}
                        className="btn-add-edit"
                      >
                        update-Task
                      </button>
                    </div>
                  ) : (
                    <div className="tasklist">
                      <span className="task-text">{item.task}</span>
                      <div className="buttons">
                        <button onClick={() => deleteTaks(item.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "red" }}
                          />
                        </button>
                        <button onClick={() => editTask(item)}>
                          <FontAwesomeIcon
                            icon={faPencil}
                            style={{ color: "blue" }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
