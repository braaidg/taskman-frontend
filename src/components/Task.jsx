import { dateFormat } from "../helpers/dateFormat";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { description, name, priority, deadline, state, _id } = task;

  const { handleTaskEditModal, handleTaskDeleteModal } = useProjects();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{dateFormat(deadline)}</p>
        <p className="mb-1 text-gray-600">Priority: {priority}</p>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-indigo-600 px-4 py-3 text-white font-bold uppercase rounded-lg"
          onClick={() => handleTaskEditModal(task)}
        >
          Edit
        </button>
        {state ? (
          <button className="bg-sky-600 px-4 py-3 text-white font-bold uppercase rounded-lg">
            Complete
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white font-bold uppercase rounded-lg">
            Incomplete
          </button>
        )}
        <button
          className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-lg"
          onClick={() => handleTaskDeleteModal(task)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
