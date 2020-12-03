import React        from 'react';


export default class pyDataCompute extends React.Component{
    constructor(props){
        super(props);
    }

   
    render() {
        
        return (
            <div id="page-wrapper">
                <iframe style={{border:0,width:"100%",height:630,}} src='http://192.168.206.49:9601/BigDataControlCenter/hAdmin/businessView/datacalculation/PythonExecute.html'/>
            </div>
        );
    }
  
}
