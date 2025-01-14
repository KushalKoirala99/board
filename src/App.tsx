import { useState } from "react";
import Todo from "./component/Todo";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const todoInstances = 3;

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks across all Todo lists..."
          className="w-[40%] p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Render Todo Components */}
      <div className="flex flex-wrap gap-6">
        {Array.from({ length: todoInstances }, (_, index) => (
          <Todo key={index} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
}

export default App;
