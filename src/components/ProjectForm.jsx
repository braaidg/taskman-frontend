import { useState } from "react";

const ProjectForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [client, setClient] = useState("");

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project Name
        </label>
        <input
          id="name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Description
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="finishing-date"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Finishing date
        </label>
        <input
          id="finishing-date"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Client Name
        </label>
        <input
          id="client"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Project name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Create project"
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
