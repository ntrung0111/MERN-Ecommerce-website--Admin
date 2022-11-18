import Link from "next/link";
import { DataGrid } from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { format } from "timeago.js";

import { getDataAPI } from "../utils/fetchData";
import { getTime } from "../utils/formatData";

export default function categories({ categories }) {
  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <Link href={`/category/${params.row._id}`}>
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
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "title_en",
      headerName: "Title En",
      width: 180,
    },
    {
      field: "iamge",
      headerName: "Category image",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem" style={{ margin: "0 auto" }}>
            <img className="productListImg" src={params.row.image} alt="" />
          </div>
        );
      },
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
      <Link href="/category/newcategory">
        <button className="productAddButton" style={{ marginBottom: "20px" }}>
          Create Category
        </button>
      </Link>
      <DataGrid
        getRowId={(row) => row._id}
        rows={categories}
        columns={columns}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getDataAPI("/category", null);

  return {
    props: {
      categories: res.categories,
    },
  };
}
