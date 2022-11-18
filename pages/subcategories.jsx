import Link from "next/link";
import { DataGrid } from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { format } from "timeago.js";

import { getDataAPI } from "../utils/fetchData";
import { getTime } from "../utils/formatData";

export default function subCategories({ subCategories }) {
  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <Link href={`/subcategory/${params.row._id}`}>
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
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.category.title}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
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
      <Link href="/subcategory/newsubcategory">
        <button className="productAddButton" style={{ marginBottom: "20px" }}>
          Create SubCategory
        </button>
      </Link>
      <DataGrid
        getRowId={(row) => row._id}
        rows={subCategories}
        columns={columns}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getDataAPI("/subcategory", null);

  return {
    props: {
      subCategories: res.subCategories,
    },
  };
}
