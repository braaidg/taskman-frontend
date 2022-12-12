import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recover your account and don't lose your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-10">
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
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
