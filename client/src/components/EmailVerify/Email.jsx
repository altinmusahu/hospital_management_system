import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import success from "../../assets/success.png";

const Email = () => {
  const [validUrl, setValidUrl] = useState(undefined);
  const param = useParams();

  const verifyEmailUrl = async () => {
    try {
      const url = `http://localhost:3000/api/users/${param.id}/verify/${param.token}`;
      const { status } = await axios.patch(url);
      if (status === 200) {
        setValidUrl(true);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      setValidUrl(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        {validUrl ? (
          <>
            <img src={success} alt="success_img" />
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="border-none outline-none py-3 bg-[#3bb19b] rounded-2xl w-44 font-bold text-sm cursor-pointer">
                Login
              </button>
            </Link>
          </>
        ) : (
          <button
            type="button"
            className="border-none outline-none py-3 bg-[#3bb19b] rounded-2xl w-44 font-bold text-sm cursor-pointer"
            onClick={verifyEmailUrl}
          >
            Verify
          </button>
        )}
      </div>
    </>
  );
};

export default Email;
