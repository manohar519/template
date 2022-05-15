import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";

import Grid from "@mui/material/Grid";

// import axios from 'axios';

import axios from "../../../../Uri";

export default function AvailableRooms() {
  const columns = [
    {
      title: "BuildingId",

      field: "buildingId",
    },
    {
      title: "FloorId",

      field: "floorId",
    },
    {
      title: "RoomId",

      field: "roomId",
    },
    {
      title: "BedName",

      field: "bedName",
    },

    {
      title: "BedId",

      field: "bedId",

      type: "text",
    },
  ];

  const [table, setTable] = React.useState([]);

  useEffect(() => {
    axios

      .get("/bed/getAvailableBeds")

      .then((res) => {
        setTable(res.data);

       
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid>
        <MaterialTable
          title="Vacant Beds"
          data={table}
          columns={columns}
          options={{
            pageSize: 10,

            actionsColumnIndex: -1,

            grouping: true,

            addRowPosition: "first",

            headerStyle: {
              backgroundColor: "#1E90FF",

              color: "white",

              fontSize: "15px",

              //height: "10px",

              //fontWeight: 'bold'
            },

            rowStyle: {
              fontSize: 16,
            },
          }}
        />
      </Grid>
    </div>
  );
}
