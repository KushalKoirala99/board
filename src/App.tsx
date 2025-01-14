import { useState } from "react";
import Todo from "./component/Todo";



function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [columns, setColumns] = useState<string[]>(["Todo 1", "In Progress", "Done"]);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() === "") return;
    setColumns((prevColumns) => [...prevColumns, newColumnTitle]);
    setNewColumnTitle("");
  };
  
  const handleDeleteColumn = (title: string) => {
    setColumns((prevColumns) => prevColumns.filter((column) => column !== title));
    localStorage.removeItem(`tasks_${title}}`);
  };

  return (
    <div className="flex-col h-screen overflow-hidden">
    <div className="p-6 flex  justify-end gap-5">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks across all Todo lists..."
          className="w-[300px] p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Add New Column */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="New column title..."
          className="w-auto p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddColumn}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Column
        </button>
      </div>
      </div>

      {/* Render Todo Components */}
      <div
        className="flex gap-6 overflow-x-auto px-6 pb-6"
        style={{ scrollBehavior: "smooth" }}
      >
        {columns.map((title, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative"
            
          >
            <div className="absolute top-2 right-4">
              <button
                onClick={() => handleDeleteColumn(title)}
                className="text-red-500 hover:text-red-700"
                title="Delete Column"
              >
                ✕
              </button>
            </div>
            <Todo title={title} searchQuery={searchQuery} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
