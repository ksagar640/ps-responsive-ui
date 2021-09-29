import React, { Fragment } from 'react';
import {
  Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel, TableFilterRow,
  ExportPanel, TableGroupRow,
  GroupingPanel,
  DragDropProvider, TableColumnResizing
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState, IntegratedSorting, PagingState, SearchState, FilteringState, IntegratedFiltering, DataTypeProvider,
  IntegratedPaging, GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import { useState, useRef, useCallback } from 'react';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import Paper from '@material-ui/core/Paper';

// import {
//   TableBody,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper
// } from '@material-ui/core';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

export default function LivePreviewExample() {
  const columns = [
    { columnName: 'createdAt', align: 'center', groupingEnabled: false },
    { columnName: 'marketQuoteId', align: 'center' },
    { columnName: 'regularMarketPrice', align: 'center', groupingEnabled: false },
    { columnName: 'region', align: 'center' },
    { columnName: 'quoteType', align: 'center' },
    { columnName: 'regularMarketChange', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketChangePercentage', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketDayHigh', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketDayLow', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketVolume', align: 'center', groupingEnabled: false },
    { columnName: 'regularMarketOpen', align: 'center', groupingEnabled: false },
    { columnName: 'trailingPE', align: 'center', groupingEnabled: false },
    { columnName: 'priceToSales', align: 'center', groupingEnabled: false },
    { columnName: 'forwardPE', align: 'center', groupingEnabled: false },
    { columnName: 'tradeable', align: 'center' },
    { columnName: 'symbol', align: 'center', groupingEnabled: false },
  ];
  const data = [{ "marketQuoteId": 0, "regularMarketPrice": 174.9567, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -2.2733002, "regularMarketChangePercentage": -1.2826836, "regularMarketDayHigh": 177.9091, "regularMarketDayLow": 174.51, "regularMarketVolume": 80917, "regularMarketOpen": 177.72, "trailingPe": 54.537624, "priceToSales": 8.623155, "forwardPe": 36.525406, "tradeable": false, "symbolName": "A", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 1, "regularMarketPrice": 49.97, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.47000122, "regularMarketChangePercentage": 0.9494974, "regularMarketDayHigh": 50.44, "regularMarketDayLow": 49.41, "regularMarketVolume": 708018, "regularMarketOpen": 48.25, "trailingPe": 21.697786, "priceToSales": 0.89270496, "forwardPe": 10.156505, "tradeable": false, "symbolName": "AA", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 2, "regularMarketPrice": 9.74, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.020000458, "regularMarketChangePercentage": -0.20492272, "regularMarketDayHigh": 9.75, "regularMarketDayLow": 9.72, "regularMarketVolume": 215725, "regularMarketOpen": 9.73, "trailingPe": 100.41237, "priceToSales": 0, "forwardPe": 0, "tradeable": false, "symbolName": "AAC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 3, "regularMarketPrice": 2.81, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.03999996, "regularMarketChangePercentage": -1.4035075, "regularMarketDayHigh": 2.85, "regularMarketDayLow": 2.81, "regularMarketVolume": 1307, "regularMarketOpen": 2.78, "trailingPe": 0, "priceToSales": 0.502092, "forwardPe": -4.19403, "tradeable": false, "symbolName": "AACG", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 4, "regularMarketPrice": 27.71, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.21000099, "regularMarketChangePercentage": -0.75215256, "regularMarketDayHigh": 27.82, "regularMarketDayLow": 27.6, "regularMarketVolume": 4361, "regularMarketOpen": 27.55, "trailingPe": 0, "priceToSales": 39.50698, "forwardPe": -1.0150183, "tradeable": false, "symbolName": "AADI", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 5, "regularMarketPrice": 3.76, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.01999998, "regularMarketChangePercentage": 0.53475887, "regularMarketDayHigh": 3.7727, "regularMarketDayLow": 3.76, "regularMarketVolume": 10679, "regularMarketOpen": 3.78, "trailingPe": 752, "priceToSales": 7.938157, "forwardPe": 14.461539, "tradeable": false, "symbolName": "AAIC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 6, "regularMarketPrice": 18.8, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.15000153, "regularMarketChangePercentage": -0.79156476, "regularMarketDayHigh": 19.23, "regularMarketDayLow": 18.645, "regularMarketVolume": 5319076, "regularMarketOpen": 20.28, "trailingPe": 0, "priceToSales": 0.651408, "forwardPe": 19.583332, "tradeable": false, "symbolName": "AAL", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 7, "regularMarketPrice": 28.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": 0.20999908, "regularMarketChangePercentage": 0.7475937, "regularMarketDayHigh": 28.465, "regularMarketDayLow": 28.3, "regularMarketVolume": 1729, "regularMarketOpen": 29, "trailingPe": 0.4069249, "priceToSales": -16.231123, "forwardPe": 0, "tradeable": false, "symbolName": "AAMC", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 8, "regularMarketPrice": 3.9, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.01999998, "regularMarketChangePercentage": -0.5102036, "regularMarketDayHigh": 3.94, "regularMarketDayLow": 3.9, "regularMarketVolume": 932, "regularMarketOpen": 4.04, "trailingPe": 5.2278824, "priceToSales": 0.38504797, "forwardPe": 0, "tradeable": false, "symbolName": "AAME", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 9, "regularMarketPrice": 26.22, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.010000229, "regularMarketChangePercentage": -0.038125157, "regularMarketDayHigh": 26.62, "regularMarketDayLow": 26.135, "regularMarketVolume": 8385, "regularMarketOpen": 27.07, "trailingPe": 8.593904, "priceToSales": 0.47078308, "forwardPe": 8.828282, "tradeable": false, "symbolName": "AAN", "createdAt": "2021-09-30T00:00:00" },
    { "marketQuoteId": 10, "regularMarketPrice": 7.3, "region": "US", "quoteType": "EQUITY", "regularMarketChange": -0.12999964, "regularMarketChangePercentage": -1.7496587, "regularMarketDayHigh": 7.49, "regularMarketDayLow": 7.26, "regularMarketVolume": 15379, "regularMarketOpen": 7.77, "trailingPe": 0, "priceToSales": 0.8509957, "forwardPe": -16.59091, "tradeable": false, "symbolName": "AAOI", "createdAt": "2021-09-30T00:00:00" }];
    
    const exporterRef = useRef(null);
    const startExport = useCallback(() => {exporterRef.current.exportGrid();}, [exporterRef]);
    const [rows, setRows] = useState(data);
    const [filters, setFilters] = useState([]); //  (props.preference.filters||[]);
    const [sorting, setSorting] = useState([]); //(props.preference.sorting||[]);
    const [currentPage, setCurrentPage] = useState(1); //  [](props.preference.currentPage||0);
    const [pageSize, setPageSize] = useState(3); // (props.preference.pageSize||3);
    const [pageSizes] = useState([15, 20, 25,30]);
    const [searchValue, setSearchState] = useState("");
    const [groups, setGroups] = useState([]); // (props.preference.groups||[]);
    const [currencyColumns] = useState(["marketQuoteId", "regularMarketPrice", "regularMarketChange", "regularMarketChangePercentage", "regularMarketDayHigh", "regularMarketDayLow", "regularMarketVolume", "regularMarketOpen", "trailingPe", "priceToSales", "forwardPe", "symbolId"]);
    //const [currencyFilterOperations] = useState(["equal","notEqual","greaterThan","greaterThanOrEqual","lessThan","lessThanOrEqual",]);

  return (
    <Fragment>
                   <Paper>
                    <Grid rows={rows} columns={columns}>
                      <SearchState
                        value={searchValue}
                        onValueChange={setSearchState}
                      />
                      <DataTypeProvider
                        for={currencyColumns}
                      //  availableFilterOperations={currencyFilterOperations}
                       // editorComponent={CurrencyEditor}
                      />
                      <FilteringState
                        filters={filters}
                        onFiltersChange={setFilters} />
                      <IntegratedFiltering />

                      <SortingState
                        sorting={sorting}
                        onSortingChange={setSorting}
                      />
                      <IntegratedSorting />
                      <DragDropProvider />
                      <GroupingState
                        grouping={groups}
                        onGroupingChange={setGroups}
                       // columnExtensions={tableColumnExtensions}
                      />
                      <IntegratedGrouping />
                      <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                      />
                      <IntegratedPaging />
                      <Table 
                      //columnExtensions={tableColumnExtensions} 
                      />
                      <TableColumnResizing
                        //columnWidths={columnWidths}
                        //onColumnWidthsChange={setColumnWidths}
                        // minColumnWidth={ minColumnWidth } 
                        />
                        <TableHeaderRow showSortingControls />
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
                       // onSave={onSave}
                      />
                    </Paper>
      
    </Fragment>
  );
}





{/* <TableContainer className="mb-4" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered mb-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-dark table-striped table-bordered mb-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div> */}