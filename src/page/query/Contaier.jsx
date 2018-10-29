import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Box from './Box.jsx';
import Dustbin from './Dustbin.jsx';

export default class Contaier extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DragDropContextProvider backend = { HTML5Backend }>
        <div>
           
            <div style={{ overflow: 'hidden', clear: 'both' }}>
						<Dustbin allowedDropEffect="any" />
						<Dustbin allowedDropEffect="copy" />
						<Dustbin allowedDropEffect="move" />
					</div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
						<Box name="Glass" />
						<Box name="Banana" />
						<Box name="Paper" />
					</div>
        </div>
      </DragDropContextProvider>
     
    );
  }
}