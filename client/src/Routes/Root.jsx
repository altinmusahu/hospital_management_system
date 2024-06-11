import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useSubmit,
} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getTokenDuration } from "../util/auth";

export default function Root() {
  const token = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();

  let headerTextColor = "text-white";
  let showFooter = true;
  let showHeader = true;
  let btnColor = "";

  if (
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/about") ||
    location.pathname.startsWith("/contact") ||
    location.pathname.startsWith("/not-authorized")
  ) {
    headerTextColor = "text-black";
    btnColor = "border border-green-700 text-green-700";
  }

  if (
    
    location.pathname.startsWith("/admin") ||
   
    location.pathname.startsWith("/emailverify") ||
   
    location.pathname.startsWith("/changepassword") ||

    location.pathname === "/doctor"

  ) {
    showFooter = false;
    showHeader = false;
  }

  if (location.pathname.startsWith("/my-profile")) {
    btnColor = "hidden";
    showHeader = false;
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      alert("Session has ended");
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, getTokenDuration());
  }, [token, submit]);

  return (
    <>
      {showHeader && <Header textColor={headerTextColor} btnColor={btnColor} />}

      <main>
        <Outlet />
      </main>

      <footer>{showFooter && <Footer />}</footer>
    </>
  );
}
