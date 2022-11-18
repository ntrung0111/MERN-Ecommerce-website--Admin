import Link from "next/link";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

import Loading from "../../components/Loading";

import { deleteDataAPI, getDataAPI, putDataAPI } from "../../utils/fetchData";

export default function SubCategory({ subCategory, categories }) {
  const router = useRouter();

  const [form, setForm] = useState({
    ...subCategory,
    isPublic: subCategory.public,
  });
  const [previewSubCategory, setpreviewSubCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handlepreviewSubCategory = (e) => {
    e.preventDefault();

    setpreviewSubCategory(form);
  };

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await putDataAPI(`/subcategory/${form._id}`, form, null);

    setpreviewSubCategory({});

    setForm({ ...res.subCategory, isPublic: res.subCategory.public });

    setLoading(false);
  };

  const handleDeleteSubCategory = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this subCategory?")) {
      setLoading(true);

      await deleteDataAPI(`/subcategory/${subCategory._id}`, null);

      router.push("/subcategories");
      setLoading(false);
    }
  };

  return (
    <div className="product">
      {!previewSubCategory.slug ? (
        <Fragment>
          <div className="productTitleContainer">
            <h1 className="productTitle">SubCategory</h1>
            <Link href="/category/newcategory">
              <button className="productAddButton">Create SubCategory</button>
            </Link>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>SubCategory Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChangeInput}
                />

                <label>SubCategory Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChangeInput}
                />

                <label>SubCategory Title En</label>
                <input
                  type="text"
                  name="title_en"
                  value={form.title_en}
                  onChange={handleChangeInput}
                />

                <label>SubCategory Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChangeInput}
                >
                  {categories.map((item) => (
                    <option value={item._id}>{item.title}</option>
                  ))}
                </select>

                <label>SubCategory Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={form.amount}
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
                  onClick={(e) => handlepreviewSubCategory(e)}
                >
                  Preview Update
                </button>
              </div>
            </form>
          </div>
          <button
            className="deleteProductButton"
            onClick={(e) => handleDeleteSubCategory(e)}
          >
            Delete SubCategory
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="previewCategoryTitle">Preview SubCategory</h1>
          <div className="previewCategoryContainer">
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

              <div className="productItem">
                <span className="label">Amount: </span>
                <span>{previewSubCategory.amount}</span>
              </div>

              <div className="productItem">
                <span className="label">Public: </span>
                <span>{previewSubCategory.isPublic.toString()}</span>
              </div>
            </div>
          </div>
          <button
            className="goBackProductButton"
            onClick={() => setpreviewSubCategory({})}
          >
            Go Back
          </button>
          <button
            className="previewProductButton"
            onClick={(e) => handleUpdateSubCategory(e)}
          >
            Update SubCategory
          </button>
        </Fragment>
      )}
      {loading && <Loading />}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await getDataAPI(`/subcategory/${id}`, null);

  return {
    props: {
      subCategory: res.subCategory,
      categories: res.categories,
    },
  };
}
