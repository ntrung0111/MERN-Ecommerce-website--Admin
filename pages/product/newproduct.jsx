import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

import Slider from "../../components/Slider";

import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { formatPrice } from "../../utils/formatData";

export default function newProduct() {
  const router = useRouter();
  const [subCategoryData, setSubCategoryData] = useState([]);

  const handleChangeCategory = async (id) => {
    const res = await getDataAPI(`/subcategory?id=${id}&product=true`, null);

    setSubCategoryData(res.subCategory);
    setForm({ ...form, category: id, subCategory: res.subCategory[0]._id });
  };

  useEffect(() => {
    handleChangeCategory("62ff56970d7e5a45810e7724");
  }, []);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    content: "",
    category: "",
    subCategory: "",
    related: "",
    price: "",
    inStock: "",
    images: [],
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [previewProduct, setPreviewProduct] = useState({});

  const handlePreview = (e) => {
    e.preventDefault();

    setPreviewProduct(form);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    await postDataAPI("/product", previewProduct, null);

    router.push("/products");
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
      {!previewProduct.slug ? (
        <Fragment>
          <h1 className="addProductTitle">New Product</h1>
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
              <label>Content</label>
              <input
                type="text"
                placeholder="content - String"
                name="content"
                value={form.content}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>Category</label>
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  handleChangeCategory(e.target.value);
                }}
              >
                {categories.map((item) => (
                  <option value={item._id}>
                    {item.title} - {item._id}
                  </option>
                ))}
              </select>
            </div>
            <div className="addProductItem">
              <label>SubCategory</label>
              <select
                name="subCategory"
                id="subCategory"
                onChange={(e) =>
                  setForm({ ...form, subCategory: e.target.value })
                }
              >
                {subCategoryData.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title} - {item._id}
                  </option>
                ))}
              </select>
            </div>
            <div className="addProductItem">
              <label>Related</label>
              <input
                type="text"
                placeholder="related - String"
                name="related"
                value={form.related}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                type="text"
                placeholder="price - String"
                name="price"
                value={form.price}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem">
              <label>InStock</label>
              <input
                type="text"
                placeholder="inStock - String"
                name="inStock"
                value={form.inStock}
                onChange={handleChangeInput}
              />
            </div>
            <div className="addProductItem" style={{ flex: 1 }}>
              <label>Images</label>
              <textarea
                type="text"
                placeholder="url,url,url"
                rows="10"
                onChange={(e) =>
                  setForm({ ...form, images: e.target.value.split(",") })
                }
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
          <h1 className="previewProductTitle">Preview Product</h1>
          <div className="previewProductContainer">
            <div className="productInfo">
              <div className="productItem">
                <span className="label">Slug: </span>
                <span>{previewProduct.slug}</span>
              </div>

              <div className="productItem">
                <span className="label">Title: </span>
                <span>{previewProduct.title}</span>
              </div>

              <div className="productItem">
                <span className="label">Content: </span> <br />
                {ReactHtmlParser(previewProduct.content)}
              </div>

              <div className="productItem">
                <span className="label">Category: </span>
                <span>{previewProduct.category}</span>
              </div>

              <div className="productItem">
                <span className="label">SubCategory: </span>
                <span>{previewProduct.subCategory}</span>
              </div>

              <div className="productItem">
                <span className="label">Related: </span>
                <span>{previewProduct.related}</span>
              </div>

              <div className="productItem">
                <span className="label">Price: </span>
                <span>￥{formatPrice(previewProduct.price)}</span>
              </div>

              <div className="productItem">
                <span className="label">InStock: </span>
                <span>{previewProduct.inStock}</span>
              </div>
            </div>
            <Slider product={previewProduct} />
          </div>
          <button
            className="goBackProductButton"
            onClick={() => setPreviewProduct({})}
          >
            Go Back
          </button>
          <button
            className="previewProductButton"
            onClick={(e) => handleCreateProduct(e)}
          >
            Create
          </button>
        </Fragment>
      )}
    </div>
  );
}
