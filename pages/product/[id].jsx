import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import ReactHtmlParser from "react-html-parser";

import ProductChart from "../../components/ProductChart";
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";

import { deleteDataAPI, getDataAPI, putDataAPI } from "../../utils/fetchData";
import { formatPrice } from "../../utils/formatData";
import { useRouter } from "next/router";

export default function Product({ product, chartData, orders }) {
  const router = useRouter();

  const [form, setForm] = useState({
    ...product,
    isPublic: product.public,
  });
  const [previewProduct, setPreviewProduct] = useState({});
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeCategory = async (id) => {
    const res = await getDataAPI(`/subcategory?id=${id}&product=true`, null);

    setSubCategoryData(res.subCategory);
    setForm({ ...form, category: id, subCategory: res.subCategory[0]._id });
  };

  useEffect(() => {
    (async () => {
      const res = await getDataAPI(
        `/subcategory?id=${form.category}&product=true`,
        null
      );

      setSubCategoryData(res.subCategory);
    })();
  }, [previewProduct, form]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handlePreviewProduct = (e) => {
    e.preventDefault();

    setPreviewProduct(form);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await putDataAPI(`/product/${form._id}`, form, null);

    setPreviewProduct({});

    setForm({ ...res.product, isPublic: res.product.public });

    setLoading(false);
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);

      await deleteDataAPI(`/product/${product._id}`, null);

      router.push("/products");
      setLoading(false);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getDataAPI("/category", null);

      setCategories(res.categories);
    })();
  }, []);

  return (
    <div className="product">
      {!previewProduct.slug ? (
        <Fragment>
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link href="/product/newproduct">
              <button className="productAddButton">Create Product</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <ProductChart
                chartData={chartData}
                title="Sales Performance"
                id={product._id}
                orders={orders}
              />
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChangeInput}
                />
                <label>Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChangeInput}
                />
                <label>Product Content</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChangeInput}
                  cols="100"
                  rows="10"
                />
                <label>Category</label>
                <select
                  name="category"
                  id="category"
                  value={form.category}
                  onChange={(e) => handleChangeCategory(e.target.value)}
                >
                  {categories.map((item) => (
                    <option value={item._id}>
                      {item.title} - {item._id}
                    </option>
                  ))}
                </select>
                <label>Sub Category</label>
                <select
                  name="subCategory"
                  id="subCategory"
                  value={form.subCategory}
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
                <label>Product Related</label>
                <input
                  type="text"
                  name="related"
                  value={form.related}
                  onChange={handleChangeInput}
                />
                <label>Product Price</label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChangeInput}
                />
                <label>Product InStock</label>
                <input
                  type="text"
                  name="inStock"
                  value={form.inStock}
                  onChange={handleChangeInput}
                />
                <label>Product Sold</label>
                <input
                  type="text"
                  name="sold"
                  value={form.sold}
                  onChange={handleChangeInput}
                />
                <label>Product Images</label>
                <textarea
                  onChange={(e) =>
                    setForm({ ...form, images: e.target.value.split(",") })
                  }
                  value={form.images.toString()}
                  cols="100"
                  rows="10"
                />
                <label>Available</label>
                <select
                  name="available"
                  id="available"
                  value={form.available}
                  onChange={handleChangeInput}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
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
                  onClick={(e) => handlePreviewProduct(e)}
                >
                  Preview Update
                </button>
              </div>
            </form>
          </div>
          <button
            className="deleteProductButton"
            onClick={(e) => handleDeleteProduct(e)}
          >
            Delete Product
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

              <div className="productItem">
                <span className="label">Available: </span>
                <span>{previewProduct.available.toString()}</span>
              </div>

              <div className="productItem">
                <span className="label">Public: </span>
                <span>{previewProduct.isPublic.toString()}</span>
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
            onClick={(e) => handleUpdateProduct(e)}
          >
            Update Product
          </button>
        </Fragment>
      )}
      {loading && <Loading />}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await getDataAPI(`/product/${id}`, null);

  const chartData = [
    {
      _id: 1,
      Month: "Jan",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 2,
      Month: "Feb",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 3,
      Month: "Mar",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 4,
      Month: "Apr",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 5,
      Month: "May",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 6,
      Month: "Jun",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 7,
      Month: "Jul",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 8,
      Month: "Agu",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 9,
      Month: "Sep",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 10,
      Month: "Oct",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 11,
      Month: "Nov",
      Order: 0,
      Sold: 0,
    },
    {
      _id: 12,
      Month: "Dec",
      Order: 0,
      Sold: 0,
    },
  ];

  for (let i = 0; i < res.chartData.length; i++) {
    let index = res.chartData[i]._id;

    if (index === chartData[index - 1]._id) {
      chartData[index - 1].Order = res.chartData[i].order;
      chartData[index - 1].Sold = res.chartData[i].sold;
    }
  }

  return {
    props: {
      product: res.product,
      chartData,
      orders: res.orders,
    },
  };
}
