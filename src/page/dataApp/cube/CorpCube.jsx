import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
//const Plot = createPlotlyComponent(window.Plotly);
const PlotlyRenderers = createPlotlyRenderers(Plot);
//const data = [];
import ReactDOM from 'react-dom';
import HttpService from '../../../util/HttpService.jsx';
import { Table, Divider,DatePicker,Modal, Icon, Form, Input, TimePicker, Tag,Select,message, Button, Card, 
    Checkbox,Layout,Tooltip,Row,Col,Pagination,Spin   } from 'antd';

//const dataTwo = [['attribute', 'attribute2'], ['value1', 'value2']];
class CorpCube extends React.Component {
    constructor(props) {
        super(props);
        const okdata=[];
        this.state = {
              
              baoTitle:"数据列表",loading: false, dictData:{},tagData:{},expand:false,testData:{},
              data:[],colunmlist:[],attt:null
            };
    }
   
    componentDidMount() {
       this.loadDataList();
    }

    loadDataList() {
        let param = {
        };

        HttpService.post('/reportServer/corp/getAllOrg', JSON.stringify(param)).then(res => {
            if (res.resultCode == "1000") {
                this.setState({
                    data: res.data,
                });
            }
            else {
                message.error(res.message);
            }
        }, errMsg => {
            this.setState({
                list: [], loading: false
            });
        });
    } 
 
    
    render() {
        return (
               
             <div id="example">
                <PivotTableUI
                    data={this.state.data}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    {...this.state.attt}
                    onChange={s => this.setState({attt:s})}
                    unusedOrientationCutoff={Infinity}
                />
            </div>
           
        );
    }
}
export default Form.create()(CorpCube);