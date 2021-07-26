import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { fetchListData } from "../../actions/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./list.scss";
import Notification from "../Notification/Notification";
const List = ({ list, notification, isFetched, getList }) => {

  let history = useHistory();
  const columns = [
    {
      field: "name",
      headerName: "NAME",
      width: 400,
    },
    {
      field: "date",
      headerName: "DATE",
      width: 710,
      valueFormatter: (params) => {
        const valueFormatted = params.value
          .slice(0, 10)
          .split("-")
          .reverse()
          .join(".");
        return valueFormatted;
      },
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 400,
    },
  ];

  const rows = [];
  for (let i = 0; i < list.length; i++) {
    rows.push({
      id: list[i].id,
      name: list[i].name,
      date: list[i].createdAt,
      status: list[i].isActive,
    });
  }
  const handleCellClick =  (params) => {
    history.push(`/item/${params.id}`);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
     <Notification notification={notification} />
      {isFetched ? (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={9}
          showCellRightBorder
          showColumnRightBorder
          hideFooterPagination
          onCellClick={handleCellClick}
        />
      ) : (
        <div className="loader-block">
          <h1 className="loader">Data loading...</h1>
          <CircularProgress></CircularProgress>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    laoding: state.loading,
    isFetched: state.isFetched,
    list: state.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(fetchListData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
/**/
