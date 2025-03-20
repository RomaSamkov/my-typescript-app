type Props = {};

const Todo = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="p-4">Add a task to your TODO list:</h2>
      <div className="flex items-center px-8">
        <form className="">
          <label htmlFor="todo"></label>
          <input
            type="text"
            id="todo"
            name="todo"
            placeholder="your task ..."
            className="border rounded-2xl px-4 py-2"
          />
        </form>
        <button className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-300 hover:text-gray-800 hover:border-white">
          Add task
        </button>
      </div>
    </div>
  );
};

export default Todo;
