import { useState, useEffect } from "react";

type TodoProps = {
  searchQuery: string; // Search query passed from parent
};

type Todo = {
  id: number;
  text: string;
};

const Todo = ({ searchQuery }: TodoProps) => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length === 0) {
      return localStorage.removeItem("tasks");
    }
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj: Todo = {
      id: Date.now(),
      text: newTask,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, text: string) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editText } : task
      )
    );
    setEditTaskId(null);
    setEditText("");
  };

  // Filter tasks based on searchQuery from parent
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md h-[600px] p-4 bg-white shadow-lg rounded-lg">
        {/* {title} */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm"
          >
            {editTaskId === task.id ? (
              <div className="flex items-center space-x-2 w-full">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTaskId(null)}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span>{task.text}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditTask(task.id, task.text)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
