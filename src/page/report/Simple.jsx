import React, {Component} from 'react';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import './Style.css'
import dataService from './dataService.jsx';
import GC from '@grapecity/spread-sheets';
import * as Excelio from '@grapecity/spread-excelio';
import * as FileSaver from 'file-saver';
import Excel from './Excel.jsx'

const statusOptions = [
    {text: '暂存', value: 'save'},
    {text: '发布', value: 'publish'},
  ]
const templates = {
  rowNumber: 1,
  columnNumber:15,
  value: [{
    templateText: '姓名',
    templateValue: 'name'
  }, {
    templateText: '编码',
    templateValue: 'code'
  }, {
    templateText: '城市',
    templateValue: 'city'
  }, {
    templateText: '状态',
    templateValue: 'state'
  }, {
    templateText: '纬度',
    templateValue: 'lat'
  }, {
    templateText: '经度',
    templateValue: 'lon'
  }, {
    templateText: 'pop2011',
    templateValue: 'pop2011'
  }, {
    templateText: 'vol2011',
    templateValue: 'vol2011'
  }, {
    templateText: 'vol2010',
    templateValue: 'vol2010'
  },{
    templateText: 'vol2009',
    templateValue: 'vol2009'
  },{
    templateText: 'vol2008',
    templateValue: 'vol2008'
  },{
    templateText: 'vol2007',
    templateValue: 'vol2007'
  },{
    templateText: 'vol2006',
    templateValue: 'vol2006'
  },{
    templateText: 'vol2005',
    templateValue: 'vol2005'
  }, {
    templateText: '状态',
    templateValue: 'status',
  }]
}
let excel = null

class DataBingingCon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableWidth: null,
      templates: [],
      spread: {},
      condition: '',
      data: null,
      changedRow: [],
    };
    this.hostStyle = {
      top: '130px',
      bottom: '0px'
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeWidth, { passive: true });
    setTimeout(() => {
      this.setState({templates})
      this.getReport()
    }, 2000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWidth);
  }

  getReport() {
    this.setState({data: dataService.getAirpotsData()})
    this.renderHead()
  }

  handleRowChanged({sheet, propertyName}) {// 整行删除触发
    if (propertyName === 'deleteRows') {
      const {originalItem: {reportId}} = sheet.getDeletedRows()[0]
      if (reportId) {
        this.setState({loading: true})
        setTimeout(() => {
          alert('删除成功!')
        }, 2000)
      }
    }
  }

  handleValueChanged({row}) {
    const {changedRow, spread} = this.state
	const sheet = spread.getActiveSheet()
	const data = sheet.getDataSource()
    changedRow.push(data[row])
    this.setState({changedRow})
  }

  handleRangeChanged({ changedCells }) { // 输入公式、delete删除数据、移动单元格触发
    const { changedRow, spread } = this.state;
	const sheet = spread.getActiveSheet()
	const data = sheet.getDataSource()
    for (let i = 0; i < changedCells.length; i++) {
      changedRow.push(data[changedCells[i]]);
    }
    this.setState({ changedRow });
  }

  handleSearch() {
    const { condition } = this.state;
    let searchStr = '';
    if (condition === null) {
      return
    } else {
      searchStr = condition;
    }
    excel.result = excel.getSearchResult(searchStr);
    excel.active();
  }

  // 数据验证
  dataValidate() {
    function MyCondition(reg) {
      this.reg = reg
      GC.Spread.Sheets.ConditionalFormatting.Condition.apply(this, arguments)
    }
    MyCondition.prototype = new GC.Spread.Sheets.ConditionalFormatting.Condition()
    MyCondition.prototype.evaluate = function(evaluator, baseRow, baseColumn, actualObj) {
      const reg = new RegExp (this.reg)
      if (reg.test(actualObj)) {
        return true
      }
      else {
        return false
      }
    }
    // 数据验证相关变量
    const {spread} = this.state,
      sheet = spread.getSheet(0),
      sheetActive = spread.getActiveSheet(),
      nCondition = new MyCondition(/[+-]?\d+(\.\d+)?|^\s+$/),
      validator = new GC.Spread.Sheets.DataValidation.DefaultDataValidator(nCondition)
    // 指定数据验证样式和范围
    spread.suspendPaint()
    validator.type(GC.Spread.Sheets.DataValidation.CriteriaType.custom)
    spread.options.highlightInvalidData = true
    validator.showInputMessage(true)
    validator.inputMessage('必须填写数字！')
    validator.inputTitle('提示')
    sheetActive.setDataValidator(0, 4, sheet.getRowCount(), 1, validator) // rowIndex, colIndex, rowCount, colCount
    sheet.resumePaint()
  }

  renderHead(source) {
    const {spread, templates} = this.state,
      sheet = spread.getSheet(0),
      spreadNS = GC.Spread.Sheets,
      combo = new spreadNS.CellTypes.ComboBox().items(statusOptions).editorValueType(spreadNS.CellTypes.EditorValueType.value),
      header = sheet.getRange(1, 0, templates.rowNumber, templates.columnNumber, GC.Spread.Sheets.SheetArea.colHeader)
    sheet.suspendPaint()
    this.setState({tableHead: excel.getColumnInfo(templates.value)})
    sheet.getRange(-1, 0, -1, templates.columnNumber).locked(false) // 解锁表格
    source && sheet.setDataSource(source)
    header.backColor('#CCFFCC') // 表头背景
    sheet.addRows(sheet.getRowCount(), 80)
    sheet.getRange(0, templates.columnNumber - 1, sheet.getRowCount() - 1, 1).cellType(combo) // 指定状态单元格的格式
    sheet.getRange(0, 0, sheet.getRowCount(), sheet.getColumnCount(), spreadNS.SheetArea.viewport).wordWrap(true)
    excel.fitRow(sheet.getRowCount())
    this.dataValidate()
    sheet.resumePaint()
  }

  resizeWidth = () => {
    const { spread } = this.state;
    if (!spread) return;
    spread.suspendPaint();
    this.setState(
      {
        tableWidth: document.getElementsByClassName('spreadContainer')[0].offsetWidth,
      },
      () => spread.resumePaint()
    );
  };

  exportExcel() {
    this.setState({ exporting: true });
    const excelIO = new Excelio.IO();
    const { spread } = this.state;
    const json = spread.toJSON({
      includeBindingSource: true,
      columnHeadersAsFrozenRows: true,
    });
    excelIO.save(
      json,
      blob => {
        FileSaver.saveAs(blob, `${spread.getActiveSheet().name()}.xlsx`);
      },
      error => {
        alert(error);
      }
    );
  }
    // Import Excel
    importFile = () => {
      var excelFile = document.getElementById("fileDemo").files[0];
  
      // Get an instance of IO class
      let excelIO = new Excelio.IO();
      excelIO.open(excelFile, (json) => {
          this.state.spread.fromJSON(json); 
      }, (e) => {
          console.log(e);
      });
  }
  

  handleSubmit() {
    const { changedRow } = this.state;
    console.log('即将提交的行:', changedRow)
  }



  init(spread) {
    const sheet = spread.getActiveSheet();
    const style = new GC.Spread.Sheets.Style();
    style.locked = true;
    const spreadNS = GC.Spread.Sheets;
    excel = new Excel(spread, spreadNS);
    sheet.suspendPaint()
    sheet.options.protectionOptions = {
      allowSelectLockedCells: true,
      allowSelectUnlockedCells: true,
      allowFilter: true,
      allowSort: false,
      allowResizeRows: true,
      allowResizeColumns: true,
      allowEditObjects: false,
      allowDragInsertRows: false,
      allowDragInsertColumns: false,
      allowDeleteColumns: false,
    };
    sheet.bind(spreadNS.Events.CellChanged, function(e, info) {
      sheet.autoFitRow(info.row)
    })
    sheet.options.isProtected = true;
    sheet.resumePaint()
    this.setState({ spread });
  }

  render() {
    const { data, tableWidth, tableHead, condition } = this.state;
    return (
      <div className="componentContainer" style={this.props.style}>
        <h3>简单综合示例</h3>
        <div>
          <p>异步渲染大量数据的表格、搜索、导出、数据验证功能。</p>
          <form>
            <input type='search'
                   placeholder="搜索内容"
                   onChange={(e) => this.setState({condition: e.target.value})}
                   style={{ width: 200 }}
            />
            {condition ? (
              <button onClick={(e) => {e.preventDefault(); this.handleSearch()}}>
                >
              </button>
            ) : null}
            <button onClick={(e) => {e.preventDefault(); this.handleSearch()}}>搜索</button>
            <button style={{float: 'right'}} onClick={(e) => {e.preventDefault(); this.exportExcel()}}>导出</button>
            <button style={{float: 'right'}} onClick={(e) => {e.preventDefault(); this.importFile()}}>导入</button>
            <input type="file" name="files[]" id="fileDemo" accept=".xlsx,.xls" />
                {/* <input type="button" id="loadExcel" value="Import" onClick={this.importFile} /> */}
            <button style={{float: 'right'}} onClick={(e) => {e.preventDefault(); this.handleSubmit()}}>提交</button>
          </form>
        </div>
        <div className="spreadContainer" style={this.hostStyle}>
          <SpreadSheets
            backColor="white"
            hostStyle={{ width: `${tableWidth}px`, height: '600px' }}
            // rowChanged={(_, sheet) => this.handleRowChanged(sheet)}
            // valueChanged={(_, sheet) => this.handleValueChanged(sheet)}
            // rangeChanged={(_, sheet) => this.handleRangeChanged(sheet)}
            workbookInitialized={spread => this.init(spread)}
          >
            <Worksheet  name="简单综合示例" autoGenerateColumns={false}>
             
              )): null}
            </Worksheet>
          </SpreadSheets>
        </div>
      </div>

    )
  }
}

export default DataBingingCon