import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [taskFormModal, setTaskFormModal] = useState(false);
  const [taskDeleteModal, setTaskDeleteModal] = useState(false);
  const [task, setTask] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [deleteCollabModal, setDeleteCollabModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map((project) =>
        project._id === data._id ? data : project
      );

      setProjects(updatedProjects);

      setAlert({
        msg: "Project successfully updated",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);
      setProjects([...projects, data]);

      setAlert({ msg: "Project successfully created", error: false });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      setAlert({ msg: data.msg, error: false });

      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);

      const projecstUpdated = projects.filter((project) => project._id !== id);
      setProjects(projecstUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskModal = () => {
    setTaskFormModal(!taskFormModal);
    setTask({});
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/tasks", task, config);

      const updatedProject = { ...project };
      updatedProject.tasks = [...project.tasks, data];

      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    console.log(task);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((actualTask) =>
        actualTask._id === data._id ? data : actualTask
      );
      setProject(updatedProject);
      setAlert({});
      setTaskFormModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const taskSubmit = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const handleTaskEditModal = (task) => {
    setTask(task);
    setTaskFormModal(true);
  };

  const handleTaskDeleteModal = (task) => {
    setTask(task);
    setTaskDeleteModal(!taskDeleteModal);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.filter(
        (currentTask) => currentTask._id !== task._id
      );
      setProject(updatedProject);
      setTaskDeleteModal(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        "/projects/collaborators",
        { email },
        config
      );
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/collaborators/${project._id}`,
        email,
        config
      );
      setAlert({ msg: data.msg, error: false });
      setCollaborator({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const handleDeleteCollabModal = (collaborator) => {
    setDeleteCollabModal(!deleteCollabModal);
    setCollaborator(collaborator);
  };

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/delete-collaborator/${project._id}`,
        { id: collaborator._id },
        config
      );

      const updatedProject = { ...project };
      updatedProject.collaborators = updatedProject.collaborators.filter(
        (collab) => collab._id !== collaborator._id
      );
      setProject(updatedProject);

      setAlert({ msg: data.msg, error: false });
      setCollaborator({});
      setDeleteCollabModal(false);
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);
      const updatedProject = { ...project };
      updatedProject.tasks = updatedProject.tasks.map((projectTask) =>
        projectTask._id === data._id ? data : projectTask
      );
      setProject(updatedProject);
      setTask({});
      setAlert({});
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        handleTaskModal,
        taskFormModal,
        taskSubmit,
        handleTaskEditModal,
        task,
        taskDeleteModal,
        handleTaskDeleteModal,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleDeleteCollabModal,
        deleteCollabModal,
        deleteCollaborator,
        completeTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
