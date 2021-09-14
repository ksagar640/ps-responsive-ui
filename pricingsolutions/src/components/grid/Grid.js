// import React from 'react';
// import * as PropTypes from 'prop-types';
// import Input from '@material-ui/core/Input';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import {
//   Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel,TableFilterRow,
//   ExportPanel, TableGroupRow,
//   GroupingPanel,
//   DragDropProvider,
// } from '@devexpress/dx-react-grid-material-ui';
// import {
//   SortingState, IntegratedSorting, PagingState, SearchState, FilteringState,IntegratedFiltering,DataTypeProvider,
//   IntegratedPaging, GroupingState,
//   IntegratedGrouping,
// } from '@devexpress/dx-react-grid';
// import { useState, useRef, useCallback } from 'react';
// import saveAs from 'file-saver';
// import { GridExporter } from '@devexpress/dx-react-grid-export';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import './Grid.css'
// import { alpha } from '@material-ui/core/styles';


// const User_Roles = [
//   "Admin",
//   "Risk Analyst"
//  ];
// const data = [
//   {"user_Name":"Ajay","email_ID":"aja@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"ajaydeep","email_ID":"ajaydp322@gmail.com","user_Role":User_Roles},
//   {"user_Name":"Hema","email_ID":"ala.hema1718@gmail.com","user_Role":User_Roles},
//   {"user_Name":"Avanik","email_ID":"avagupta@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Avadh","email_ID":"avayadav@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Dhiraj","email_ID":"dhirana@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Kaushik","email_ID":"kaumella@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Mithun","email_ID":"mithirna@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Nikitha","email_ID":"nikyadav@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Piyush","email_ID":"piyrai1@publicisgroupe.net","user_Role":User_Roles},
//   {"user_Name":"Sagar","email_ID":"sagjaisw@publicisgroupe.net","user_Role":User_Roles},
//          ];
// // data.push("user_Role": user);

//  const rolesFormatter = ({value}) => (
//   <select>
//     {value.map(user_Role => (
//       <option value={user_Role} key={user_Role}>
//         {user_Role}
//       </option>
//     ))}
//   </select>
// );
// const DropDownTypeProvider = props => (
//   <DataTypeProvider formatterComponent={rolesFormatter} {...props} />
// );

// const onSave = (workbook) => {
//   workbook.xlsx.writeBuffer().then((buffer) => {
//     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'UsersList.xlsx');
//   });
// };


// const styles = theme => ({
//   root: {
//     margin: theme.spacing(1),
//   },
//   numericInput: {
//     fontSize: '14px',
//     textAlign: 'right',
//     width: '100%',
//   },
// });
// export default () => {

//   const exporterRef = useRef(null);

//   const startExport = useCallback(() => {
//     exporterRef.current.exportGrid();
//   }, [exporterRef]);

//   const [columns] = useState([
//     { name: 'email_ID', title: 'Email Id' },
//     { name: 'user_Name', title: 'User Name' },
//     { name: 'user_Role', title: 'User Role' }
    
    
    
//   ]);
//   const [rows,setRows] = useState(data);
//   const [sorting, setSorting] = useState([{ columnName: 'Name', direction: 'asc' }]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [pageSizes] = useState([5, 10, 15]);
//   const [searchValue, setSearchState] = useState("");
//    const [dropDownColumn] = useState(["user_Role"]);
//   const [filteringColumnExtensions] = useState([
//     {      
//       predicate: (value, filter, row) => {
//         if (!filter.value.length) return true;
//         return IntegratedFiltering.defaultPredicate(value, filter, row);
//       },
//     },
//   ]);
//   return (
//     <div className="flex-container">
     
//       <div className = "right">
//       <Paper>
//         <Grid 
//           rows={rows}
          
//           columns={columns}
//         >
//           <DropDownTypeProvider for={dropDownColumn}/>
//         <SearchState
//           value={searchValue}
//           onValueChange={setSearchState}
//         />
//         {/* <DataTypeProvider
//           for={currencyColumns}
//           availableFilterOperations={currencyFilterOperations}
//           editorComponent={CurrencyEditor}
//         /> */}
//           <FilteringState defaultFilters={[]} />
//           <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          
//           <SortingState
//             sorting={sorting}
//             onSortingChange={setSorting}
//           />
//           <IntegratedSorting />
//           {/* <DragDropProvider /> */}
//           {/* <GroupingState
//             //grouping={grouping}
//             onGroupingChange={setGrouping}
//           /> */}
//           {/* <IntegratedGrouping /> */}
//           <PagingState
//             currentPage={currentPage}
//             onCurrentPageChange={setCurrentPage}
//             pageSize={pageSize}
//             onPageSizeChange={setPageSize}
//           />
//           <IntegratedPaging />
//           <Table />
//           <TableHeaderRow showSortingControls  />
//           {/* <TableGroupRow /> */}
//           {/* <TableFilterRow      
//             showFilterSelector  
//             /> */}
//           <PagingPanel pageSizes={pageSizes} />
//           <Toolbar />
//           <SearchPanel />
//           {/* <GroupingPanel showGroupingControls /> */}
//           <ExportPanel startExport={startExport} />

//         </Grid>
//         <GridExporter
//           ref={exporterRef}
//           rows={rows}
//           columns={columns}
//           sorting={sorting}
//           onSave={onSave}
//         />
//       </Paper>
//       </div>
//     </div>);
// };

// import React from 'react';
// import * as PropTypes from 'prop-types';
// import Input from '@material-ui/core/Input';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import {
//   Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel,TableFilterRow,
//   ExportPanel, TableGroupRow,
//   GroupingPanel,
//   DragDropProvider,
// } from '@devexpress/dx-react-grid-material-ui';
// import {
//   SortingState, IntegratedSorting, PagingState, SearchState, FilteringState,IntegratedFiltering,DataTypeProvider,
//   IntegratedPaging, GroupingState,
//   IntegratedGrouping,
// } from '@devexpress/dx-react-grid';
// import { useState, useRef, useCallback } from 'react';
// import saveAs from 'file-saver';
// import { GridExporter } from '@devexpress/dx-react-grid-export';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';


// const "admin" = [
//   "Admin",
//   "Risk Analyst"
//  ];
// const data = [
//   {"user_Name":"Ajay","email_ID":"aja@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"ajaydeep","email_ID":"ajaydp322@gmail.com","user_Role":"admin"},
//   {"user_Name":"Hema","email_ID":"ala.hema1718@gmail.com","user_Role":"admin"},
//   {"user_Name":"Avanik","email_ID":"avagupta@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Avadh","email_ID":"avayadav@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Dhiraj","email_ID":"dhirana@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Kaushik","email_ID":"kaumella@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Mithun","email_ID":"mithirna@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Nikitha","email_ID":"nikyadav@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Piyush","email_ID":"piyrai1@publicisgroupe.net","user_Role":"admin"},
//   {"user_Name":"Sagar","email_ID":"sagjaisw@publicisgroupe.net","user_Role":"admin"},
//          ];

//  const rolesFormatter = ({value}) => (
//   <select>
//     {value.map(user_Role => (
//       <option value={user_Role} key={user_Role}>
//         {user_Role}
//       </option>
//     ))}
//   </select>
// );
// const DropDownTypeProvider = props => (
//   <DataTypeProvider formatterComponent={rolesFormatter} {...props} />
// );

// const onSave = (workbook) => {
//   workbook.xlsx.writeBuffer().then((buffer) => {
//     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'UsersList.xlsx');
//   });
// };


// const styles = theme => ({
//   root: {
//     margin: theme.spacing(1),
//   },
//   numericInput: {
//     fontSize: '14px',
//     textAlign: 'right',
//     width: '100%',
//   },
// });
// export default () => {

//   const exporterRef = useRef(null);

//   const startExport = useCallback(() => {
//     exporterRef.current.exportGrid();
//   }, [exporterRef]);

//   const [columns] = useState([
//     { name: 'email_ID', title: 'Email Id' },
//     { name: 'user_Name', title: 'User Name' },
//     { name: 'user_Role', title: 'User Role' }
    
    
    
//   ]);
//   const [rows,setRows] = useState(data);
//   const [sorting, setSorting] = useState([{ columnName: 'Name', direction: 'asc' }]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [pageSizes] = useState([5, 10, 15]);
//   const [searchValue, setSearchState] = useState("");
//    const [dropDownColumn] = useState(["user_Role"]);
//   const [filteringColumnExtensions] = useState([
//     {      
//       predicate: (value, filter, row) => {
//         if (!filter.value.length) return true;
//         return IntegratedFiltering.defaultPredicate(value, filter, row);
//       },
//     },
//   ]);
//   return (
//     <div className="flex-container">
     
//       <div className = "right">
//       <Paper>
//         <Grid 
//           rows={rows}
          
//           columns={columns}
//         >
//           <DropDownTypeProvider for={dropDownColumn}/>
//         <SearchState
//           value={searchValue}
//           onValueChange={setSearchState}
//         />
//         {/* <DataTypeProvider
//           for={currencyColumns}
//           availableFilterOperations={currencyFilterOperations}
//           editorComponent={CurrencyEditor}
//         /> */}
//           <FilteringState defaultFilters={[]} />
//           <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          
//           <SortingState
//             sorting={sorting}
//             onSortingChange={setSorting}
//           />
//           <IntegratedSorting />
//           {/* <DragDropProvider /> */}
//           {/* <GroupingState
//             //grouping={grouping}
//             onGroupingChange={setGrouping}
//           /> */}
//           {/* <IntegratedGrouping /> */}
//           <PagingState
//             currentPage={currentPage}
//             onCurrentPageChange={setCurrentPage}
//             pageSize={pageSize}
//             onPageSizeChange={setPageSize}
//           />
//           <IntegratedPaging />
//           <Table />
//           <TableHeaderRow showSortingControls  />
//           {/* <TableGroupRow /> */}
//           {/* <TableFilterRow      
//             showFilterSelector  
//             /> */}
//           <PagingPanel pageSizes={pageSizes} />
//           <Toolbar />
//           <SearchPanel />
//           {/* <GroupingPanel showGroupingControls /> */}
//           <ExportPanel startExport={startExport} />

//         </Grid>
//         <GridExporter
//           ref={exporterRef}
//           rows={rows}
//           columns={columns}
//           sorting={sorting}
//           onSave={onSave}
//         />
//       </Paper>
//       </div>
//     </div>);
// };





import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
   SearchState, 
   
} from '@devexpress/dx-react-grid';
import {
  DataTypeProvider,
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  PagingPanel,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
 import {
  PagingState,
  IntegratedPaging, IntegratedFiltering} from '@devexpress/dx-react-grid';


const getRowId = row => row.id;

const User_Roles = [
  "Admin",
  "Risk Analyst"
 ];
const data = [
  { "id":1, "user_Name":"Kaushik","email_ID":"kaumella@publicisgroupe.net","user_Role":"admin"},
  { "id":2, "user_Name":"Mithun","email_ID":"mithirna@publicisgroupe.net","user_Role":"admin"},
  { "id":3, "user_Name":"Nikitha","email_ID":"nikyadav@publicisgroupe.net","user_Role":"admin"},
  { "id":4, "user_Name":"Piyush","email_ID":"piyrai1@publicisgroupe.net","user_Role":"risk analyst"},
  { "id":5, "user_Name":"Sagar","email_ID":"sagjaisw@publicisgroupe.net","user_Role":"risk analyst"},
  { "id":6, "user_Name":"Kaushik","email_ID":"kaumella@publicisgroupe.net","user_Role":"admin"},
  { "id":7, "user_Name":"Mithun","email_ID":"mithirna@publicisgroupe.net","user_Role":"admin"},
  { "id":8, "user_Name":"Nikitha","email_ID":"nikyadav@publicisgroupe.net","user_Role":"admin"},
  { "id":9, "user_Name":"Piyush","email_ID":"piyrai1@publicisgroupe.net","user_Role":"admin"},
  // {"user_Name":"Sagar","email_ID":"sagjaisw@publicisgroupe.net","user_Role":"admin"},
         ];
const BooleanFormatter = ({ value }) => <Chip label={value ? 'admin ' : 'risk_analyst'} />;

const BooleanEditor = ({ value, onValueChange }) => (
  <Select
    input={<Input />}
    value={value ? 'admin' : 'risk_analyst'}
    onChange={event => onValueChange(event.target.value === 'risk_analyst')}
    onChange={event => onValueChange(event.target.value === 'admin')}
    style={{ width: '60%' }}
  >
   
    <MenuItem value="risk_analyst">
      Risk Analyst
    </MenuItem>
     <MenuItem value="admin">
     admin
    </MenuItem>
  </Select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

export default () => {
  const [columns] = useState([
    { name: 'email_ID', title: 'Email Id' },
    { name: 'user_Name', title: 'User Name' },
    { name: 'user_Role', title: 'User Role' }
    
  ]);
  
  // const [columns] = useState([
   
  //   { name: 'EmailId', title: 'EmailId' },
  //   { name: 'UserName', title: 'User Name' },
   
  //   { name: 'UserRole', title: 'User Role' },
  // ]);
  // const [rows, setRows] = useState(generateRows({
  //   columnValues: { id: ({ index }) => index, ...globalSalesValues },
  //   length: 8,
  // }));
  // const [rows,setRows] = useState(data);
  const [searchValue, setSearchState] = useState("");

   const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
 const [pageSizes] = useState([5, 10, 15]);


  // const [columns] = useState([
  //   { name: 'email_ID', title: 'Email Id' },
  //   { name: 'user_Name', title: 'User Name' },
  //   { name: 'user_Role', title: 'User Role' }
    
  // ]);

  const [rows,setRows] = useState(data);

  // const [searchValue, setSearchState] = useState("");

  const [booleanColumns] = useState(["user_Role"]);
  const [dropDownColumn] = useState(["user_Role"]);

  const [filteringColumnExtensions] = useState([
    {      
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <div className="flex-container">
     
      <div className = "right"></div>
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <BooleanTypeProvider
          for={booleanColumns}
        />
        <SearchState
          value={searchValue}
          onValueChange={setSearchState}
        />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
        />
        <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
            <IntegratedPaging />
        <Table />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
           <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
    </div>
  );
};
