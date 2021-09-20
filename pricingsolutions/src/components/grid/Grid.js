import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { SearchState } from "@devexpress/dx-react-grid";
import { DataTypeProvider, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  PagingPanel,
  TableEditColumn,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
  PagingState,
  IntegratedPaging,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import axios from "axios";
import azure from "../../api/azure";


const getRowId = (row) => row.emailId;


export default () => {
  const [columns] = useState([
    { name: "emailId", title: "Email Id" },
    { name: "username", title: "User Name" },
    { name: "userRoleName", title: "User Role" },
  ]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      let userRoleNames = [];
      const response = await azure.get("/api/userManagement/role-get");
      const data = await response.data;
      for (let i = 0; i < data.length; i++) {
        userRoleNames.push(response.data[i].userRoleName);
      }
      console.log(userRoleNames);
      setUserRoles(userRoleNames);
    };
    fetchUserRoles();
  }, []);

  const BooleanFormatter = ({ value }) => <Chip label={value} />;

  const BooleanEditor = ({ value, onValueChange, row }) => {
    return (
      <Select
        input={<Input />}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        style={{ width: "60%" }}
      >
        {userRoles.map((userRole) => {
          return <MenuItem value={userRole}>{userRole}</MenuItem>;
        })}
      </Select>
    );
  };

  const BooleanTypeProvider = (props) => {
    return (
      <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
      />
    );
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      await azure.get("/api/userManagement/user-get").then((response) => {
        var array = response.data;
        console.log(response);
        setRows(array);
      });
    };
    fetchUserData();
  }, []);

  const [searchValue, setSearchState] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [booleanColumns] = useState(["userRoleName"]);

  const [filteringColumnExtensions] = useState([
    {
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);
  const commitChanges = async ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].emailId : "";
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          emailId: startingAddedId + index,
          ...row,
        })),
      ];
      const params = {
        emailId: added[0].emailId,
        username: added[0].username,
        userRoleName: added[0].userRoleName,
      };

      const response = await azure.post("/api/userManagement/user-add", params);
      console.log(response);

      console.log(added);
    }
    if (changed) {
      console.log(changed);
      const email = Object.keys(changed)[0];
      
      const selectedRow = rows.filter(row => row.emailId === email);

      const params = {
        emailId: email,
        userRoleName: changed[email].userRoleName ? changed[email].userRoleName : selectedRow[0].userRoleName,
        username: changed[email].username ? changed[email].username : selectedRow[0].username,
      };

      const response = await azure.put("/api/userManagement/user-role-update", params);
      console.log(response);
      if(response.data.emailId){
        changedRows = rows.map((row) =>
        changed[row.emailId] ? { ...row, ...changed[row.emailId] } : row
      );
      }
    }
      
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.emailId));
      console.log(deleted);
      const email = deleted[0];
      const response = await azure.delete(`/api/userManagement/user-delete/${email}`);
      console.log(response);
    }
    setRows(changedRows);
  };

  const [tableColumnExtensions] = useState([
    { columnName: "emailId", align: "center" },
    { columnName: "username", align: "center" },
    { columnName: "userRoleName", align: "center" },
  ]);

  return (
    <div className="flex-container">
      <Paper>
        <div data-testid="grid">
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
          <SearchState value={searchValue} onValueChange={setSearchState} />
          <div data-testid="editingState">
              <EditingState
                onCommitChanges={commitChanges}
              />
            </div>
            <div data-testid="pagingState">
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>
            
           
            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            
            
            <IntegratedPaging />

            <BooleanTypeProvider for={booleanColumns} />
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow />

            <TableEditRow />
            <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
            <div data-testid="pagingPanel">
              <PagingPanel pageSizes={pageSizes} />
            </div>
            <Toolbar />
            <SearchPanel />

            
            
           
          </Grid>
        </div>
      </Paper>
      </div>
  );
};
