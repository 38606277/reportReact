import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget, ConnectDropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes.jsx';
import { findDOMNode } from 'react-dom';
import { Button } from 'antd';

const style = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}
const targetSpec = {
  // drop(props, monitor, component) {
	// 	return {
	// 		name: `${allowedDropEffect} Dustbin`,
  //     allowedDropEffect:{
  //       connectDropTarget: ConnectDropTarget,
  //       canDrop: boolean,
  //       isOver: boolean,
  //       allowedDropEffect: string
  //     }
	// 	}
	// },
  drop(props, monitor, component) {
    console.log("drop");
    // console.log(monitor);
    // console.log(component);
		// 获取正在拖放的数据
    const item = monitor.getItem();
    console.log(item);
		// 更新组件状态
		component.setState({
			item
		})
		
	},
  hover(props, monitor, component) {
    console.log("hover");
    // console.log(monitor);
    // console.log(component);
      // 当前拖动的index
      const dragIndex = monitor.getItem().index;
      // 当前hover 的index
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
          return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // 新的位置
      monitor.getItem().index = hoverIndex;
  },
  // canDrop(props, monitor){
  //   // console.log(props);
  //   // console.log(monitor);
  // }
}
function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
  }
}
 class Dustbin extends React.Component {
  // static propTypes = {
	// 	connectDropTarget: PropTypes.func.isRequired,
	// 	isOver: PropTypes.bool.isRequired,
	// 	canDrop: PropTypes.bool.isRequired,
	// 	allowedDropEffect: PropTypes.string.isRequired,
	// }
  render() {
      const { canDrop, isOver, allowedDropEffect, connectDropTarget } = this.props
      const isActive = canDrop && isOver

      let backgroundColor = '#222'
      if (isActive) {
        backgroundColor = 'darkgreen'
      } else if (canDrop) {
        backgroundColor = 'darkkhaki'
      }

      return (
        connectDropTarget &&
        connectDropTarget(
          <div style={{ ...style, backgroundColor }}>
            {`Works with ${allowedDropEffect} drop effect`}
            <br />
            <br />
            {isActive ? 'Release to drop' : 'Drag a box here'}
          </div>,
        )
      )
  }
}export default DropTarget(ItemTypes.BOX, targetSpec, collect)(Dustbin);