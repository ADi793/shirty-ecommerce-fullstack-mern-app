import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
} from "../services/categoryService";

function ManageCategories({ history }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData (){
      const { data: savedCategories } = await getCategories();
  
      setCategories(savedCategories);
    }

    fetchData();
  }, []);

  const handleDelete = async (category) => {
    let originalCategories = categories;

    try {
      const filteredCategories = originalCategories.filter(
        (originalCategory) => originalCategory._id !== category._id
      );
      setCategories(filteredCategories);

      await deleteCategory(category._id);
      toast.success("Category is deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) history.push("/not-found");
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        setCategories(originalCategories);
      }
    }
  };

  return (
    <div className="container my-3 height-sixty">
      <h1 className="fw-normal letter-spacing">
        <span className="color-unique">Categories</span>.
      </h1>
      {categories.map((category) => (
        <React.Fragment key={category._id}>
          <div className="row mt-5 text-muted">
            <div className="col-md-4">
              <h4 className="fw-normal">{category.name}</h4>
            </div>
            <div className="col-md-4">
              <Link
                to={`categories/${category._id}`}
                className="btn btn-unique text-white"
              >
                Update Category
              </Link>
            </div>
            <div className="col-md-4">
              <button className="btn" onClick={() => handleDelete(category)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ManageCategories;
