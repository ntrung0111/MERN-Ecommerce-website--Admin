import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";

import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export default function newCategory() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    title_en: "",
    category: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [previewSubCategory, setPreviewSubCategory] = useState({});

  const handlePreview = (e) => {
    e.preventDefault();

    setPreviewSubCategory(form);
  };

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();

    await postDataAPI("/subcategory", previewSubCategory, null);

    router.push("/subcategories");
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getDataAPI("/category", null);

      setCategories(res.categories);
    })();
  }, []);

  return (
    <div className="newProduct">
      {!previewSubCategory.slug ? (
        <Fragment>
          <h1 className="addProductTitle">New SubCategory</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Slug</label>
              <input
                type="text"
                placeholder="slug - String"
                name="slug"
                value={form.slug}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="title - String"
                name="title"
                value={form.title}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>Title En</label>
              <input
                type="text"
                placeholder="title en - String"
                name="title_en"
                value={form.title_en}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>Category</label>

              <select
                name="category"
                onChange={handleChangeInput}
                value={form.category}
              >
                {categories.map((item) => (
                  <option value={item._id}>
                    {item.title} - {item._id}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <button
            className="previewProductButton"
            onClick={(e) => handlePreview(e)}
          >
            Preview
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="previewProductTitle">Preview Category</h1>
          <div className="previewProductContainer">
            <div className="productInfo">
              <div className="productItem">
                <span className="label">Slug: </span>
                <span>{previewSubCategory.slug}</span>
              </div>

              <div className="productItem">
                <span className="label">Title: </span>
                <span>{previewSubCategory.title}</span>
              </div>

              <div className="productItem">
                <span className="label">Title En: </span>
                <span>{previewSubCategory.title_en}</span>
              </div>

              <div className="productItem">
                <span className="label">Category: </span>
                <span>{previewSubCategory.category}</span>
              </div>
            </div>
          </div>
          <button
            className="goBackProductButton"
            onClick={() => setPreviewSubCategory({})}
          >
            Go Back
          </button>
          <button
            className="previewProductButton"
            onClick={(e) => handleCreateSubCategory(e)}
          >
            Create
          </button>
        </Fragment>
      )}
    </div>
  );
}
