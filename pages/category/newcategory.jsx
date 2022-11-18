import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { postDataAPI } from "../../utils/fetchData";

export default function newCategory() {
  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    title_en: "",
    image: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [previewCategory, setPreviewCategory] = useState({});

  const handlePreview = (e) => {
    e.preventDefault();

    setPreviewCategory(form);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    await postDataAPI("/category", previewCategory, null);

    router.push("/categories");
  };

  return (
    <div className="newProduct">
      {!previewCategory.slug ? (
        <Fragment>
          <h1 className="addProductTitle">New Category</h1>
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
              <label>Image</label>
              <input
                type="text"
                placeholder="image - String"
                name="image"
                value={form.image}
                onChange={handleChangeInput}
              />
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
            </div>
          </div>
          <button
            className="goBackProductButton"
            onClick={() => setPreviewCategory({})}
          >
            Go Back
          </button>
          <button
            className="previewProductButton"
            onClick={(e) => handleCreateCategory(e)}
          >
            Create
          </button>
        </Fragment>
      )}
    </div>
  );
}
