import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";

const NewCollaborator = () => {
  const { getProject, project, loading } = useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading) return "Loading ...";

  return (
    <>
      <h1 className="text-4xl font-black">
        Add collaborators to : {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>
    </>
  );
};

export default NewCollaborator;
