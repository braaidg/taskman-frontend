import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";

const Project = () => {
  const params = useParams();
  const { getProject, project, loading } = useProjects();

  const { name } = project;

  useEffect(() => {
    getProject(params.id);
  }, []);

  return loading ? (
    "Loading ..."
  ) : (
    <div>
      <h1 className="font-black text-4xl">{name}</h1>
    </div>
  );
};

export default Project;
