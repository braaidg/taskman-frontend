import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({ msg: "Email is required", error: true });
    }

    try {
      const { data } = await clientAxios.post(`/users/forgot-password`, {
        email,
      });
      setAlert({ msg: data.msg, error: false });
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recover your account and don't lose your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={handleSubmit}
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
            value={email}
            placeholder="Registered email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send instructions"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Already have an account? Log in!
        </Link>
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Don't have an account? Register now!
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
