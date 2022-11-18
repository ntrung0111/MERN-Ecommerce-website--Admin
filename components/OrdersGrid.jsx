import Link from "next/link";

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import { RemoveRedEye } from "@material-ui/icons";
import { format } from "timeago.js";

import { getTime } from "../utils/formatData";

const Modal = ({ data }) => {
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
          <Link href={`/order/${params.row._id}`}>
            <a style={{ display: "flex" }}>
              <RemoveRedEye />
            </a>
          </Link>
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Order status",
      width: 180,
      align: "center",
      cellClassName: (params) => {
        if (params.row.orderStatus === "PENDING") {
          return "PENDING";
        }

        if (params.row.orderStatus === "APPROVED") {
          return "APPROVED";
        }

        return "DECLINED";
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
      field: "paymentId",
      headerName: "Payment ID",
      width: 300,
    },
    {
      field: "name",
      headerName: "Username",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Order time",
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
        rows={data}
        columns={columns}
        autoHeight
        components={{
          Toolbar: MyExportButton,
        }}
      />
    </div>
  );
};

export default Modal;
