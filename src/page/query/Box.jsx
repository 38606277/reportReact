import React from 'react';
import {  DragSource,	ConnectDragSource,	DragSourceConnector,	DragSourceMonitor} from 'react-dnd';
import { DragDropManager } from 'dnd-core';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes.jsx';
import { Button } from 'antd';

const sourceSpec = {
  beginDrag(props, monitor, component){
    // 返回需要注入的属性
    return {
      name: props.name,
      index: props.index, 
    }
  },
  endDrag(props, monitor, component){
    const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
			let alertMessage = ''
			const isDropAllowed =
				dropResult.allowedDropEffect === 'any' ||
				dropResult.allowedDropEffect === dropResult.dropEffect

			if (isDropAllowed) {
				const isCopyAction = dropResult.dropEffect === 'copy'
				const actionName = isCopyAction ? 'copied' : 'moved'
				alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
			} else {
				alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${
					dropResult.name
				}`
			}
			alert(alertMessage) // eslint-disable-line no-alert
		}
    // if (!monitor.didDrop()) {
    //   return;
    // }
    // const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
  canDrag(props, monitor){
    // ..
  },
  isDragging(props, monitor){
    // ..
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}
const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	float: 'left',
}

 class Box extends React.Component  {
   static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	}
  render() {
    const { isDragging, connectDragSource } = this.props;
		const { name } = this.props;
		const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(
      connectDragSource &&
			connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
    );
  }
}
export default DragSource(ItemTypes.BOX, sourceSpec,collect)(Box);
