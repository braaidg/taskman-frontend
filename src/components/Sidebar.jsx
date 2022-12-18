import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
  const {auth} = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hello : {auth.name}</p>
      <Link to="create-project" className="bg-sky-600 w-full p-3 text-white uppercase block mt-5 text-center rounded-lg font-bold">New project</Link>

    </aside>
  )
}
export default Sidebar