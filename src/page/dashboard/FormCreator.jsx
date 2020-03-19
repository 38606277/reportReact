import React from 'react';
import './FormCreator.css';
import DragLayout from './DragLayout.jsx';



export default class FormCreator extends React.Component {
  constructor(props) {
      super(props);

  }

  render() {

    return (
      <DragLayout></DragLayout>
    );
  }

}
