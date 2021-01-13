import React from 'react';
import ERGraph from '../ERGraph';
import { NodeConfig, EdgeConfig } from '../xflow';
import { mockEntityData, mockRelationData } from './mock';
import { EntityCanvasModel, RelationCanvasModel } from './interface';
import HttpService from '../../util/HttpService.jsx'
import Entity from './Entity';
// import Relation from './Relation';

export default class EREditorDemo extends React.PureComponent<{}, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // this.props.module_id:any
    let obj={
      startIndex:1,
      perPage:10,
      table_name:"",
      table_title:"",
      model_id:1
  }
  console.log(obj)
  HttpService.post('/reportServer/bdModelTableColumn/table/getTableList',JSON.stringify(obj)).then(res => {///列表接口SunShine: 
      if (res.resultCode == "1000") {
          console.log(res)
      }
      else {
          // message.error(res.message);
      }
  }, errMsg => {
      // this.setState({
      //     list: [], loading: false
      // });
  });
  }
  calRenderData = () => {
    const nodes: NodeConfig[] = mockEntityData.map(
      (entity: EntityCanvasModel) => {
        const { entityId, x, y, width, height } = entity;
        const nodeData: NodeConfig = {
          x,
          y,
          width,
          height,
          id: entityId,
          render: (data: EntityCanvasModel) => {
            return <Entity entity={data} />;
          },
          data: entity,
        };
        return nodeData;
      },
    );

    const edges: EdgeConfig[] = mockRelationData.map(
      (relation: RelationCanvasModel) => {
        const { relationId, sourceEntityId, targetEntityId } = relation;
        const edgeData: EdgeConfig = {
          id: relationId,
          source: sourceEntityId,
          target: targetEntityId,
          label: '1:p',
          // render: (data: RelationCanvasModel) => {
          //   return null;
          // },
          data: relation,
        };
        return edgeData;
      },
    );

    return { nodes, edges };
  };

  render() {
    const { nodes, edges } = this.calRenderData();
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ERGraph
          data={{
            nodes,
            edges,
          }}
          // graphOptions={{}}
        />
      </div>
    );
  }
}
