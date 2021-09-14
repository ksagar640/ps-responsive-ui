import React from 'react';
import * as PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel,TableFilterRow,
  ExportPanel, TableGroupRow,
  GroupingPanel,
  DragDropProvider,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting, PagingState, SearchState, FilteringState,IntegratedFiltering,DataTypeProvider,
  IntegratedPaging, GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import { useState, useRef, useCallback } from 'react';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './Grid.css'


const User_Roles = [
  "Admin",
  "Risk Analyst"
 ];
const data = [
  {"S. No.":"1","Start Time":"2:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"2","Start Time":"3:00 am","Time Elapsed": "10 min", "No. of records fetched":"1000", "Status": "Fail"},
  {"S. No.":"3","Start Time":"4:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"4","Start Time":"5:00 am","Time Elapsed": "3 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"5","Start Time":"6:00 am","Time Elapsed": "5 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"6","Start Time":"7:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"7","Start Time":"10:00 am","Time Elapsed": "7 min", "No. of records fetched":"10000", "Status": "Fail"},
  {"S. No.":"8","Start Time":"12:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"9","Start Time":"5:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  {"S. No.":"10","Start Time":"5:00 am","Time Elapsed": "2 min", "No. of records fetched":"10000", "Status": "Pass"},
  
  // {"user_Name":"ajaydeep","email_ID":"ajaydp322@gmail.com","user_Role":User_Roles},
  // {"user_Name":"Hema","email_ID":"ala.hema1718@gmail.com","user_Role":User_Roles},
  // {"user_Name":"Avanik","email_ID":"avagupta@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Avadh","email_ID":"avayadav@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Dhiraj","email_ID":"dhirana@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Kaushik","email_ID":"kaumella@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Mithun","email_ID":"mithirna@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Nikitha","email_ID":"nikyadav@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Piyush","email_ID":"piyrai1@publicisgroupe.net","user_Role":User_Roles},
  // {"user_Name":"Sagar","email_ID":"sagjaisw@publicisgroupe.net","user_Role":User_Roles},
         ];
// data.push("user_Role": user);

 

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'UsersList.xlsx');
  });
};


const styles = theme => ({
  root: {
    margin: theme.spacing(1),
  },
  numericInput: {
    fontSize: '14px',
    textAlign: 'right',
    width: '100%',
  },
});
export default () => {

  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const [columns] = useState([
    { name: 'S. No.', title: 'S. NO.' },
    { name: 'Start Time', title: 'Start Time' },
    { name: 'Time Elapsed', title: 'Time Elapsed' },
    { name: 'No. of records fetched', title: 'Rows Fetched' },
    { name: 'Status', title: 'Status' }
    
    
    
    
  ]);
  const [rows,setRows] = useState(data);
  const [sorting, setSorting] = useState([{ columnName: 'Name', direction: 'asc' }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10]);
  const [searchValue, setSearchState] = useState("");
  const [filteringColumnExtensions] = useState([
    {      
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);
  return (
    <div className="flex-container">
     
      <div className = "right">
      <Paper>
        <Grid 
          rows={rows}
          
          columns={columns}
        >
          
        <SearchState
          value={searchValue}
          onValueChange={setSearchState}
        />
        {/* <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        /> */}
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          
          <SortingState
            sorting={sorting}
            onSortingChange={setSorting}
          />
          <IntegratedSorting />
          {/* <DragDropProvider /> */}
          {/* <GroupingState
            //grouping={grouping}
            onGroupingChange={setGrouping}
          /> */}
          {/* <IntegratedGrouping /> */}
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <IntegratedPaging />
          <Table />
          <TableHeaderRow showSortingControls  />
          {/* <TableGroupRow /> */}
          {/* <TableFilterRow      
            showFilterSelector  
            /> */}
          <PagingPanel pageSizes={pageSizes} />
          <Toolbar />
          <SearchPanel />
          {/* <GroupingPanel showGroupingControls /> */}
          <ExportPanel startExport={startExport} />

        </Grid>
        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          sorting={sorting}
          onSave={onSave}
        />
      </Paper>
      </div>
    </div>);
};

