import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel,TableFilterRow,
  ExportPanel, TableGroupRow,
  GroupingPanel,
  DragDropProvider,TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting, PagingState, SearchState, FilteringState,IntegratedFiltering,DataTypeProvider,
  IntegratedPaging, GroupingState,
  IntegratedGrouping,  
} from '@devexpress/dx-react-grid';
import { useState, useRef, useCallback, useEffect } from 'react';
import saveAs from 'file-saver';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {setUserPref} from './Actions/setUserPrefAction';
import {fetchUserPref} from './Actions/fetchUserPrefAction'
import {CurrencyEditorBase} from './CurrencyEditorBase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'StockList.xlsx');
  });
};


const styles = theme => ({
  root: {
    margin: theme.spacing(0),
  },
  numericInput: {
    fontSize: '14px',
    textAlign: 'left',
    width: '100%',
  },
});

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);

function GridView({data , preference , email , loadingStatus , ErrorStatus ,isHavingPreference , handleSaveButtonClick ,handleApplyButtonClick}) {

  

  const exporterRef = useRef(null);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const columns = [
    { name: 'marketQuoteId', title: 'marketQuoteId' },
    { name: 'regularMarketPrice', title: 'regularMarketPrice' },
    { name: 'region', title: 'region' },
    { name: 'quoteType', title: 'quoteType' },
    { name: 'regularMarketChange', title: 'regularMarketChange' },
    { name: 'regularMarketChangePercentage', title: 'regularMarketChangePercentage' },
    { name: 'regularMarketDayHigh', title: 'regularMarketDayHigh' },
    { name: 'regularMarketDayLow', title: 'regularMarketDayLow' },
    { name: 'regularMarketVolume', title: 'regularMarketVolume' },
    { name: 'regularMarketOpen', title: 'regularMarketOpen' },
    { name: 'trailingPe', title: 'trailingPe' },
    { name: 'priceToSales', title: 'priceToSales' },
    { name: 'forwardPe', title: 'forwardPe' },
    { name: 'tradeable', title: 'tradeable' },
    { name: 'symbolId', title: 'symbolId' },
  ];

  const [columnWidths, setColumnWidths] = useState([
    { columnName: 'marketQuoteId',width: 180},
    { columnName: 'regularMarketPrice',width: 190},
    { columnName: 'region',width: 110},
    { columnName: 'quoteType',width: 135 },
    { columnName: 'regularMarketChange',width: 210 },
    { columnName: 'regularMarketChangePercentage',width: 280 },
    { columnName: 'regularMarketDayHigh',width: 210},
    { columnName: 'regularMarketDayLow',width: 210 },
    { columnName: 'regularMarketVolume',width: 210 },
    { columnName: 'regularMarketOpen',width: 190},
    { columnName: 'trailingPe',width: 140 },
    { columnName: 'priceToSales',width: 150 },
    { columnName: 'forwardPe',width: 140},
    { columnName: 'tradeable',width: 140},
    { columnName: 'symbolId',width: 140},
  ]);


  const [tableColumnExtensions] = useState([
    { columnName: 'marketQuoteId',align: 'center'},
    { columnName: 'regularMarketPrice',align: 'center'},
    { columnName: 'region',align: 'center'},
    { columnName: 'quoteType',align: 'center'},
    { columnName: 'regularMarketChange',align: 'center'},
    { columnName: 'regularMarketChangePercentage',align: 'center'},
    { columnName: 'regularMarketDayHigh',align: 'center'},
    { columnName: 'regularMarketDayLow',align: 'center'},
    { columnName: 'regularMarketVolume',align: 'center'},
    { columnName: 'regularMarketOpen',align: 'center'},
    { columnName: 'trailingPe',align: 'center'},
    { columnName: 'priceToSales',align: 'center'},
    { columnName: 'forwardPe',align: 'center'},
    { columnName: 'tradeable',align: 'center'},
    { columnName: 'symbolId',align: 'center'},
  ]);
  const [rows,setRows] = useState([]);

 

  const [filters, setFilters] = useState(preference.filters);
  const [sorting, setSorting] = useState(preference.sorting);
  const [currentPage, setCurrentPage] = useState(preference.currentPage);
  const [pageSize, setPageSize] = useState(preference.pageSize);
  const [pageSizes] = useState([5, 10, 15]);
  const [searchValue, setSearchState] = useState("");
  const [currencyColumns] = useState(["marketQuoteId","regularMarketPrice","regularMarketChange", "regularMarketChangePercentage", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketVolume", "regularMarketOpen", "trailingPe", "priceToSales", "forwardPe", "symbolId"]);
  const [currencyFilterOperations] = useState([
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
  ]);
  const [MarketPrice, setMarketPrice] = useState(preference.MarketPrice);
  const [MarketHigh, setMarketHigh] = useState(preference.MarketHigh);
  const [groups, setGroups] = useState(preference.groups);  
  
  const CurrentUserDefinedStates = {
    sorting : sorting,
    currentPage : currentPage,                     // current page value is one less of what shown on UI
    pageSize : pageSize,   
    MarketPrice : MarketPrice,
    MarketHigh : MarketHigh,
    filters : filters,
    groups : groups
  }

  useEffect(() => {
    setRows(data);
    setFilters(preference.filters);
    setSorting(preference.sorting);
    setCurrentPage(preference.currentPage);
    setPageSize(preference.pageSize);
    setMarketPrice(preference.MarketPrice);
    setMarketHigh(preference.MarketHigh);
    setGroups(preference.groups);
  }, [data,preference]);
  
  // for slider
const useStyles = makeStyles({
  root: {
    width: 180,
  },
});
 
const classes = useStyles();


const handlePriceChange = (event, newRangeValue) => {
  const newRows = data.filter((row)=>{ return row.regularMarketPrice >= newRangeValue[0] && row.regularMarketPrice <= newRangeValue[1]});
  setRows(newRows);
  setMarketPrice(newRangeValue);
};


const handleMarketHighChange = (event, newRangeValue) => {
  const newRows = data.filter((row)=>{ return row.regularMarketDayHigh >= newRangeValue[0] && row.regularMarketDayHigh <= newRangeValue[1]});
  setRows(newRows);
  setMarketHigh(newRangeValue);
};

const SuccessNotify = () => toast.success("Preferences Saved");
const ApplyNotify = () => toast.success("Preferences Applied");

  return (
    <div className="flex-container">
      <div className= "left" >      
      <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Market Price range
            </Typography>
            <Slider
              value={MarketPrice}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max = {200}
            />

            <Typography id="range-slider" gutterBottom>
              Market High Range
            </Typography>
            <Slider
              value={MarketHigh}
              onChange={handleMarketHighChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max = {400}
            />
      </div> <br></br> <br></br> 
      <Button variant="contained" color="primary" onClick = {()=>{
            // console.log(CurrentUserDefinedStates);
            const userPreferenceString = JSON.stringify(CurrentUserDefinedStates); /// Convert Json Object to string
            console.log(userPreferenceString);
            var userPreferenceObject = JSON.parse(userPreferenceString);   /// Convert string to Json Object
             console.log(userPreferenceObject);
            handleSaveButtonClick(email , userPreferenceString , isHavingPreference);
            SuccessNotify();
            // (loadingStatus.saveUserLoadingStatus ===true && ErrorStatus.saveUserErrorStatus === false ) ? notify('User Preferences Saved') : notify('Error in Saving User Preferences. Try again');
            
        }}>
          Save User Preference
      </Button>
      <br/>  <br/>
      <Button variant="contained" color="primary" onClick = {()=>{
            handleApplyButtonClick();
            ApplyNotify();
        }}>
          Apply User Preference
      </Button>
      </div>
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
        <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        />
          <FilteringState 
          filters={filters} 
          onFiltersChange={setFilters}/>
          <IntegratedFiltering /> 
           
          <SortingState
            sorting={sorting}
            onSortingChange={setSorting}
          />
          <IntegratedSorting />
          <DragDropProvider />
          <GroupingState
            onGroupingChange={setGroups}
          />
          <IntegratedGrouping />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
          <IntegratedPaging />
          <Table columnExtensions={tableColumnExtensions}/>
          <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          // minColumnWidth={ minColumnWidth } 
        />
          <TableHeaderRow showSortingControls showGroupingControls />
          <TableGroupRow />
           <TableFilterRow      
            showFilterSelector  
          /> 
          <PagingPanel pageSizes={pageSizes} />
          <Toolbar />
          <SearchPanel />
          <GroupingPanel showGroupingControls />
          <ExportPanel startExport={startExport} />

        </Grid>
        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          sorting={sorting}
          onSave={onSave}
        />
        <ToastContainer />
      </Paper>
      </div>
    </div>);
};


const mapDispatchToProps = (dispatch) => {
  return {
      handleSaveButtonClick : (email , userPreference, isHavingPreference) => {
        dispatch(setUserPref(
          {
            email :email,
            userPreference : userPreference,
            isHavingPref : isHavingPreference
          }
        ))
      },
      handleApplyButtonClick : () => {
        dispatch(fetchUserPref())
      }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(GridView);