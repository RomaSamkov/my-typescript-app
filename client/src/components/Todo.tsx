type Props = {};

const Todo = (props: Props) => {
  return (
    <div className="flex items-center px-8">
      <form className="">
        <label htmlFor="todo">Todo</label>
        <input
          type="text"
          id="todo"
          name="todo"
          placeholder="What to do ..."
          className="border rounded-2xl p-2"
        />
      </form>
      <button className="border rounded-2xl bg-gray-700 p-2 cursor-pointer hover:bg-gray-500 hover:text-gray-800 hover:border-white">
        Add To Do
      </button>
    </div>
  );
};

export default Todo;
