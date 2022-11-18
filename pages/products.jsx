import Link from "next/link";
import { DataGrid } from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { format } from "timeago.js";

import { getDataAPI } from "../utils/fetchData";
import { formatPrice, getTime } from "../utils/formatData";

export default function products({ products }) {
  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <Link href={`/product/${params.row._id}`}>
            <a style={{ display: "flex" }}>
              <RemoveRedEye />
            </a>
          </Link>
        );
      },
    },
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      renderCell: (params) => {
        if (params.row.isDeleted) {
          return <del style={{ color: "#d95087" }}>{params.row._id}</del>;
        }

        return <div>{params.row._id}</div>;
      },
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "product",
      headerName: "Product image",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" style={{ margin: "0 auto" }}>
            <img className="productListImg" src={params.row.images[0]} alt="" />
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Amount in storage",
      width: 200,
    },
    {
      field: "sold",
      headerName: "Total products sold",
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.category.title}</div>;
      },
    },
    {
      field: "subCategory",
      headerName: "SubCategory",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.subCategory.title}</div>;
      },
    },
    {
      field: "related",
      headerName: "Related products group",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      valueFormatter: (params) => {
        return formatPrice(params.row.price) + "円";
      },
    },
    {
      field: "available",
      headerName: "Available",
      width: 180,
    },
    {
      field: "public",
      headerName: "Public",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Create time",
      width: 280,
      valueFormatter: (params) => {
        return (
          params.row.createdAt.slice(0, 10) +
          " - " +
          getTime(params.row.createdAt) +
          " - " +
          format(params.row.createdAt)
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Update time",
      width: 280,
      valueFormatter: (params) => {
        return (
          params.row.updatedAt.slice(0, 10) +
          " - " +
          getTime(params.row.updatedAt) +
          " - " +
          format(params.row.updatedAt)
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link href="/product/newproduct">
        <button className="productAddButton" style={{ marginBottom: "20px" }}>
          Create Product
        </button>
      </Link>
      <DataGrid getRowId={(row) => row._id} rows={products} columns={columns} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getDataAPI("/product", null);

  return {
    props: {
      products: res.products,
    },
  };
}
