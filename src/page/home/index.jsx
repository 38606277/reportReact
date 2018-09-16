/*
* @Author: Rosen
* @Date:   2018-01-23 18:03:55
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:41:51
*/

import React        from 'react';
import { Link }     from 'react-router-dom';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount       : '-',
            productCount    : '-',
            orderCount      : '-'
        }
    }

    render(){
        return (
            <div id="page-wrapper">
     
            </div>
        );
    }
}

export default Home;