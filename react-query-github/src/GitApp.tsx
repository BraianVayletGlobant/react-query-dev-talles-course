import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const GitApp: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-3">
      <h1>
        Git Issues <small>Seguimiento de problemas</small>{" "}
      </h1>
      <div>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(`/issues/list`)}
        >
          with Pages
        </button>
        <button
          className="btn btn-outline-primary m-2"
          onClick={() => navigate(`/issues/list/infinite`)}
        >
          with Infinite Scroll
        </button>
      </div>
      <Outlet />
    </div>
  );
};
