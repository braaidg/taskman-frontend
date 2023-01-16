import useProjects from "../hooks/useProjects";

const Collaborator = ({ collab }) => {
  const { handleDeleteCollabModal } = useProjects();
  const { email, name } = collab;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{name}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleDeleteCollabModal(collab)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Collaborator;
