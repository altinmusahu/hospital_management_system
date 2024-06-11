import noAccess from "../assets/no-access.jpg";

const NotAuthorized = () => (
  <>
    <div className="relative">
      <div className="text-center pt-40">
        <img
          src={noAccess}
          alt="no access"
          className="w-[32%] flex mx-auto select-none "
        />
        <h1 className="text-red-500 mb-96">Access Denied</h1>
      </div>
    </div>
  </>
);

export default NotAuthorized;
