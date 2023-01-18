import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).includes("")) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("token", data.token);
      setAuth(data);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await clientAxios.post("/users/googleAuth", response);
      setAlert({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      window.location.reload();
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Log in and manage your <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registered email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Registered password"
            value={password}
            onChange={handleInputChange}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Log in"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Don't have an account? Register now!
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Forgot my password
        </Link>
      </nav>
    </>
  );
};

export default Login;
