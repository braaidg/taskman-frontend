import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [isPasswordModified, setIsPasswordModified] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`);
        setIsTokenValid(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
        setIsTokenValid(false);
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlert({
        msg: "Password must be at least 6 characters long",
        error: true,
      });
      return;
    }
    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({ msg: data.msg, error: false });
      setPassword("");
      setIsPasswordModified(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Restore your password and don't lose access to your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {isTokenValid && (
        <form
          onSubmit={handleSubmit}
          className="my-10 bg-white shadow rounded-lg px-10 py-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Save new password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {isPasswordModified && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Log in
        </Link>
      )}
    </>
  );
};

export default NewPassword;
