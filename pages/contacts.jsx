import Link from "next/link";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { format } from "timeago.js";

import { getTime } from "../utils/formatData";
import { getDataAPI } from "../utils/fetchData";

export default function contacts({ contacts }) {
  const MyExportButton = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <Link href={`/contact/${params.row._id}`}>
            <a style={{ display: "flex" }}>
              <RemoveRedEye />
            </a>
          </Link>
        );
      },
    },
    {
      field: "contactStatus",
      headerName: "Contact Status",
      width: 180,
      align: "center",
      cellClassName: (params) => {
        if (params.row.contactStatus === "PENDING") {
          return "PENDING";
        }

        return "VIEWED";
      },
    },
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "message",
      headerName: "Message",
      width: 250,
    },
    {
      field: "product",
      headerName: "Product",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Contact time",
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
      <DataGrid
        getRowId={(row) => row._id}
        rows={contacts}
        columns={columns}
        autoHeight
        components={{
          Toolbar: MyExportButton,
        }}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getDataAPI("/contact", null);

  return {
    props: {
      contacts: res.contacts,
    },
  };
}
