export default function setDefaultpreferences() {
    return  {
      filters : [{columnName: 'region', value: ''} , {columnName: 'quoteType', value: ''},
                 {columnName: 'tradable', value: ''} ,{columnName: 'marketQuoteId', value: ''}],
      sorting : [{ColumnName : "marketQuoteId" , sortingDirection : "asc"}],
      currentPage : 0,
      pageSize : 5,
      MarketPrice : [0,200],
      MarketHigh : [0,400],
      groups : []
    }
};  