import { useEffect, useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";
import { useParams } from "react-router-dom";

const currentDay = new Intl.DateTimeFormat("fr-CA").format();

const ProjectForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(currentDay);
  const [client, setClient] = useState("");

  const params = useParams();

  const { showAlert, alert, submitProject, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeadline(project.deadline?.split("T")[0]);
      setClient(project.client);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes("")) {
      showAlert({ msg: "All fields are required", error: true });
      return;
    }
    await submitProject({ id, name, description, deadline, client });

    setId(null);
    setName("");
    setDescription("");
    setDeadline("");
    setClient("");
  };

  const { msg } = alert;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alert alert={alert} />}

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
          htmlFor="deadline"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project deadline
        </label>
        <input
          id="deadline"
          type="date"
          min={currentDay}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
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
        value={id ? "Update project" : "Create project"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
