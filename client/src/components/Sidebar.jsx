import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sidebar() {
  return (
    <div className="flex items-center justify-center w-1/4 border-r border-black h-screen">
      <div className="flex flex-col gap-2">
        <Link to="/" ><p>Attributes</p></Link>
        <Link to="/user">Add Data</Link>
      </div>
    </div>
  );
}

export default Sidebar;
