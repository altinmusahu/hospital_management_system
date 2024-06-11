import { Link } from "react-router-dom";

const ErrorPage = () => {
  let message = "We couldn't find your URL searched for!";
  return (
    <div>
      <h1 className="text-red-500">{message}</h1>
      <h3>
        Go back{" "}
        <Link to="/" className="font-bold underline">
          Home
        </Link>
      </h3>
    </div>
  );
};
export default ErrorPage;
