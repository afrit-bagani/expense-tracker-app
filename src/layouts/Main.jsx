import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// helper function
import { fetchData } from "../helper";
import Nav from "../components/Nav";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName}></Nav>
      <Outlet></Outlet>
      <img src={wave} />
    </div>
  );
};
export default Main;
