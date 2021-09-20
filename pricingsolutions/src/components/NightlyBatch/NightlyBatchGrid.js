import * as React from "react";
import Button from '@material-ui/core/Button';
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue
} from "@material-ui/data-grid";
import './Grid.css';
import { useState} from 'react';


const rows = [
  {id:1,"QuoteTime":"2:00 am","StartTime":"2:00 am","EndTime": "3:00 am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": "A,B,C,D,f,g,h,j,k,l,m,n,b,g,f,d,s,a,r,e,w,q,a,s,d,f,g,r,s,zE"},
  {id:2,"QuoteTime":"2:00 am","StartTime":"3:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"1000", "FailedSymbols": "A,B,C,D,E"},
  {id:3,"QuoteTime":"2:00 am","StartTime":"4:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": ""},
  {id:4,"QuoteTime":"2:00 am","StartTime":"5:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": ""},
  {id:5,"QuoteTime":"2:00 am","StartTime":"6:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": ""},
  {id:6,"QuoteTime":"2:00 am","StartTime":"7:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": "A,B,E"},
  {id:7,"QuoteTime":"2:00 am","StartTime":"10:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": "A,B,C,D,E"},
  {id:8,"QuoteTime":"2:00 am","StartTime":"12:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": "",},
  {id:9,"QuoteTime":"2:00 am","StartTime":"5:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": "A,B,C,D,E"},
  {id:10,"QuoteTime":"2:00 am","StartTime":"5:00 am","EndTime": "3:00am", "NumSuccessfullyFetchedSymbols":"10000", "FailedSymbols": ""},
  ];
 
  // const [rows, setRows] = useState([data]);

  // useEffect(() => {
  //   const getBatchReport = async () => {
  //     await azure.get("/api/user-get").then((response) => {
  //       var array = response.data;

    
  //       setRows(array);
  //     });
  //   };
  //   getBatchReport();
  // }, []);


const columns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "QuoteTime", headerName: "Quote Time", width: 200 },
  
  { field: 'StartTime', headerName: 'Start Time', width: 200 },
  { field: 'EndTime', headerName: 'End Time', width: 200 },
  {field: 'FailedSymbols', headerName: 'Failed Symbols',width: 400},
  { field: 'NumSuccessfullyFetchedSymbols', headerName: 'Number of Successfult Fetched Symbols', width:200 },
  { field: 'Status',
   headerName: 'Status', 
    sortable: false,
    width: 150,
    disableClickEventBubbling: true,
    renderCell: (params) => {
     
      const onClick = () => {
        return alert(JSON.stringify('Nightly'));
        // api call
      };
      return params.row.FailedSymbols === "" ?<Button data-testid="completedButtonTest" variant="contained" color = "success" onClick={onClick} disabled>  Completed </Button> :
      <Button variant="contained" data-testid="incompleteButtonTest" color="error" onClick={onClick} >  Retrigger Batch </Button>;
    }
}
];


export default function DataGridDemo() {
  return (
    <div data-testid="nightlyBatchGridTest" style={{ height: 600, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
  
}
