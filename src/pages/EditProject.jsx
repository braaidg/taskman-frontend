import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ProjectForm from "../components/ProjectForm";

const EditProject = () => {
  const { project, getProject, loading } = useProjects();
  const params = useParams();

  const { name } = project;

  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading) return "Loading...";

  return (
    <>
      <h1 className="font-black text-4xl">Edit project : {name}</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
