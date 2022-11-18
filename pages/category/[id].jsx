import Link from "next/link";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

import Loading from "../../components/Loading";

import { deleteDataAPI, getDataAPI, putDataAPI } from "../../utils/fetchData";

export default function Category({ category }) {
  const router = useRouter();

  const [form, setForm] = useState({
    ...category,
    isPublic: category.public,
  });
  const [previewCategory, setpreviewCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handlepreviewCategory = (e) => {
    e.preventDefault();

    setpreviewCategory(form);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await putDataAPI(`/category/${form._id}`, form, null);

    setpreviewCategory({});

    setForm({ ...res.category, isPublic: res.category.public });

    setLoading(false);
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);

      await deleteDataAPI(`/category/${category._id}`, null);

      router.push("/categories");
      setLoading(false);
    }
  };

  return (
    <div className="product">
      {!previewCategory.slug ? (
        <Fragment>
          <div className="productTitleContainer">
            <h1 className="productTitle">Category</h1>
            <Link href="/category/newcategory">
              <button className="productAddButton">Create Category</button>
            </Link>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Category Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChangeInput}
                />

                <label>Category Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChangeInput}
                />

                <label>Category Title En</label>
                <input
                  type="text"
                  name="title_en"
                  value={form.title_en}
                  onChange={handleChangeInput}
                />

                <label>Category Image</label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChangeInput}
                />

                <label>Public</label>
                <select
                  name="isPublic"
                  id="isPublic"
                  value={form.isPublic}
                  onChange={handleChangeInput}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div className="productFormRight">
                <button
                  className="previewProductButton"
                  onClick={(e) => handlepreviewCategory(e)}
                >
                  Preview Update
                </button>
              </div>
            </form>
          </div>
          <button
            className="deleteProductButton"
            onClick={(e) => handleDeleteCategory(e)}
          >
            Delete Category
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="previewCategoryTitle">Preview Category</h1>
          <div className="previewCategoryContainer">
            <div className="productInfo">
              <div className="productItem">
                <span className="label">Slug: </span>
                <span>{previewCategory.slug}</span>
              </div>

              <div className="productItem">
                <span className="label">Title: </span>
                <span>{previewCategory.title}</span>
              </div>

              <div className="productItem">
                <span className="label">Title En: </span>
                <span>{previewCategory.title_en}</span>
              </div>

              <div className="productItem">
                <span className="label">Image: </span>
                <img src={previewCategory.image} alt="" />
              </div>

              <div className="productItem">
                <span className="label">Public: </span>
                <span>{previewCategory.isPublic.toString()}</span>
              </div>
            </div>
          </div>
          <button
            className="goBackProductButton"
            onClick={() => setpreviewCategory({})}
          >
            Go Back
          </button>
          <button
            className="previewProductButton"
            onClick={(e) => handleUpdateCategory(e)}
          >
            Update Category
          </button>
        </Fragment>
      )}
      {loading && <Loading />}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await getDataAPI(`/category/${id}`, null);

  return {
    props: {
      category: res.category,
    },
  };
}
