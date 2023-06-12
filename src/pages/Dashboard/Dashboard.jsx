import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";

import "./Dashboard.css";

import { FaWindowClose, FaUserEdit } from "react-icons/fa";

const Dashboard = () => {
  const { datas: items, error, loading, deletePosts, itemsFilter } = useGet();

  const { deletePost } = useDelete();

  const handleDelete = (id) => {
    deletePost(id);
    itemsFilter(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="container-items">
        <p>
          Edite seus produtos ou crie um{" "}
          <Link to={"/product-register"}>Novo</Link>
        </p>

        {items.map((item, i) => (
          <div key={i} className="items">
            <p className="name">{item.name}</p>
            <div className="icon">
              <p onClick={() => {}} className="edit">
                <Link to={"/"}>
                  <FaUserEdit />
                </Link>
              </p>
              <p
                onClick={() => {
                  handleDelete(item.id);
                }}
                className="close"
              >
                <Link to={"/about"}>
                  <FaWindowClose />
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
