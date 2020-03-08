import GC from '@grapecity/spread-sheets';

class Excel {
  /*
  spread: 表格实例对象
  spreadNS: spreadNS
   */
  constructor(spread, spreadNS) {
    this.spread = spread;
    this.spreadNS = spreadNS;
    this.searchResult = null;
  }

  get result() {
    return this.searchResult;
  }

  set result(value) {
    this.searchResult = value;
  }

  getSearchCondition = condition => {
    const searchCondition = new GC.Spread.Sheets.Search.SearchCondition();
    searchCondition.searchString = condition;
    return searchCondition;
  };

  getResultSearchingSheetEnd(condition) {
    const { spread, spreadNS } = this;
    const searchCondition = condition;
    const sheet = spread.getActiveSheet();
    searchCondition.startSheetIndex = spread.getActiveSheetIndex();
    searchCondition.endSheetIndex = spread.getActiveSheetIndex();
    if (searchCondition.searchOrder === spreadNS.Search.SearchOrder.zOrder) {
      searchCondition.findBeginRow = sheet.getActiveRowIndex();
      searchCondition.findBeginColumn = sheet.getActiveColumnIndex() + 1;
    } else if (searchCondition.searchOrder === spreadNS.Search.SearchOrder.nOrder) {
      searchCondition.findBeginRow = sheet.getActiveRowIndex() + 1;
      searchCondition.findBeginColumn = sheet.getActiveColumnIndex();
    }

    if ((searchCondition.searchFlags && spreadNS.Search.SearchFlags.blockRange) > 0) {
      const sel = sheet.getSelections()[0];
      searchCondition.rowStart = sel.row;
      searchCondition.columnStart = sel.col;
      searchCondition.rowEnd = sel.row + sel.rowCount - 1;
      searchCondition.columnEnd = sel.col + sel.colCount - 1;
    }
    return spread.search(searchCondition);
  }

  getResultSearchingWorkbookEnd(condition) {
    const { spread } = this;
    const searchCondition = condition;
    searchCondition.rowStart = -1;
    searchCondition.columnStart = -1;
    searchCondition.findBeginRow = -1;
    searchCondition.findBeginColumn = -1;
    searchCondition.rowEnd = -1;
    searchCondition.columnEnd = -1;
    searchCondition.startSheetIndex = spread.getActiveSheetIndex() + 1;
    searchCondition.endSheetIndex = -1;
    return spread.search(searchCondition);
  }

  getResultSearchingWorkbookBefore(condition) {
    const { spread } = this;
    const searchCondition = condition;
    searchCondition.rowStart = -1;
    searchCondition.columnStart = -1;
    searchCondition.findBeginRow = -1;
    searchCondition.findBeginColumn = -1;
    searchCondition.rowEnd = -1;
    searchCondition.columnEnd = -1;
    searchCondition.startSheetIndex = -1;
    searchCondition.endSheetIndex = spread.getActiveSheetIndex() - 1;
    return spread.search(searchCondition);
  }

  getResultSearchingSheetBefore(condition) {
    const { spread, spreadNS } = this;
    const searchCondition = this.getSearchCondition(condition);
    const sheet = spread.getActiveSheet();
    searchCondition.startSheetIndex = spread.getActiveSheetIndex();
    searchCondition.endSheetIndex = spread.getActiveSheetIndex();
    if ((searchCondition.searchFlags && spreadNS.Search.SearchFlags.blockRange) > 0) {
      const sel = sheet.getSelections()[0];
      searchCondition.rowStart = sel.row;
      searchCondition.columnStart = sel.col;
      searchCondition.findBeginRow = sel.row;
      searchCondition.findBeginColumn = sel.col;
      searchCondition.rowEnd = sel.row + sel.rowCount - 1;
      searchCondition.columnEnd = sel.col + sel.colCount - 1;
    } else {
      searchCondition.rowStart = -1;
      searchCondition.columnStart = -1;
      searchCondition.findBeginRow = -1;
      searchCondition.findBeginColumn = -1;
      searchCondition.rowEnd = sheet.getActiveRowIndex();
      searchCondition.columnEnd = sheet.getActiveColumnIndex();
    }
    return spread.search(searchCondition);
  }

  getSearchResult(condition) {
    const { spreadNS } = this;
    const searchCondition = this.getSearchCondition(condition);
    let searchResult = null;
    searchResult = this.getResultSearchingSheetEnd(searchCondition);
    if (
      searchResult == null ||
      searchResult.searchFoundFlag === spreadNS.Search.SearchFoundFlags.none
    ) {
      searchResult = this.getResultSearchingWorkbookEnd(searchCondition);
    }
    if (
      searchResult == null ||
      searchResult.searchFoundFlag === spreadNS.Search.SearchFoundFlags.none
    ) {
      searchResult = this.getResultSearchingWorkbookBefore(searchCondition);
    }
    if (
      searchResult == null ||
      searchResult.searchFoundFlag === spreadNS.Search.SearchFoundFlags.none
    ) {
      searchResult = this.getResultSearchingSheetBefore(searchCondition);
    }
    return searchResult;
  }

  active() {
    // 激活查找到的单元格
    const { spread, searchResult, spreadNS } = this;
    const sheet = spread.getActiveSheet();
    sheet.setActiveCell(searchResult.foundRowIndex, searchResult.foundColumnIndex);
    sheet.showCell(
      searchResult.foundRowIndex,
      searchResult.foundColumnIndex,
      spreadNS.VerticalPosition.center,
      spreadNS.HorizontalPosition.center
    );
  }

  // 设置表头信息
  getColumnInfo(keys) {
    const colInfos = []
    for (let i =0; i< keys.length; i++) {
      colInfos.push({name: keys[i].templateValue, displayName: keys[i].templateText, width: keys[i].columnWidth || 80, formatter: keys[i].columnFormatter || ''})
    }
    return colInfos
  }
  // 自适应高度
  fitRow(row) {
    const {spread} = this,
      sheet = spread.getActiveSheet()
    for (let i= 0; i< row; i++) {
      sheet.autoFitRow(i)
    }
  }
}

export default Excel;
