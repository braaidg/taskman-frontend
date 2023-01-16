import { dateFormat } from "../helpers/dateFormat";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { description, name, priority, deadline, state, _id } = task;

  const { handleTaskEditModal, handleTaskDeleteModal, completeTask } =
    useProjects();
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{dateFormat(deadline)}</p>
        <p className="mb-1 text-gray-600">Priority: {priority}</p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completed by: {task?.completed_by?.name}
          </p>
        )}
      </div>

      <div className="flex gap-2 flex-col lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white font-bold uppercase rounded-lg"
            onClick={() => handleTaskEditModal(task)}
          >
            Edit
          </button>
        )}
        <button
          className={` ${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white font-bold uppercase rounded-lg`}
          onClick={() => completeTask(_id)}
        >
          {state ? "Completed" : "Incomplete"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white font-bold uppercase rounded-lg"
            onClick={() => handleTaskDeleteModal(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
