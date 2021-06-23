import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";

const List = () => {

  const listUrl = "/list";
  const [list, setList] = useState([]);
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
        const valueFormatted = params.value.slice(0,10).split("-").reverse().join(".")
        return valueFormatted
      } 
    },
    { 
      field: "state", 
      headerName: "STATE", 
      width: 400
     },
  ];

  const rows = [];
  for (let i = 0; i < list.length; i++) {
    rows.push({
      id: list[i].id,
      name: list[i].name,
      date: list[i].createdAt,
      state: list[i].isActive,
    });
  }
  
  const handleCellClick = (params) => {
    history.push(`/item/${params.id}`)
  }

  const fetchData = async () => {
    const response = await fetch(listUrl);
    const data = await response.json();
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default List;
