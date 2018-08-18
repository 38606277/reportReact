/*
* @Author: Rosen
* @Date:   2018-01-19 18:26:06
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-19 21:00:10
*/

import React from 'react';
import ReactDOM from 'react-dom';

// 基础组件写法
function Component(){
    return <h1>I am Rosen</h1>
}

class ES6Component extends React.Component{
    render(){
        return <h1>I am Rosen in es6</h1>
    }
}

ReactDOM.render(
    <div>
        <Component/>
        <ES6Component/>
    </div>,
    document.getElementById('app')
);

// status && props
class Component extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        setTimeout(()=>{
            this.setState({
                name: 'Rosen Test'
            })
        },2000)
        return <h1>I am {this.state.name}</h1>
    }
}

ReactDOM.render(
    <div>
        <Component name="Rosen"/>
    </div>,
    document.getElementById('app')
);


// 事件处理方式1
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age : 18
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.setState({
            age : this.state.age + 1
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={this.handleClick}>加一岁</button>
        </div>
        );
    }
}



// 事件处理方式2
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age : 18
        }
    }
    handleClick(){
        this.setState({
            age : this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age : e.target.value
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
            <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
        </div>
        );
    }
}



// 组件的组合方式
class Component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : 'Rosen',
            age : 18
        }
    }
    handleClick(){
        this.setState({
            age : this.state.age + 1
        });
    }
    onValueChange(e){
        this.setState({
            age : e.target.value
        });
    }
    render(){
        return (
        <div>
            <h1>I am {this.state.name}</h1>
            <p>I am {this.state.age} years old!</p>
            <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
            <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
        </div>
        );
    }
}

class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render(props){
        return <h1>{this.props.children}</h1>
    }

}
class App extends React.Component{
    render(){
        return (
            <div className="">
                {/* 容器式组件 */}
                <Title>
                    <span>App Span</span>
                    <a href="">link</a>
                </Title>
                <hr/>
                {/* 单纯组件 */}
                <Component/>
            </div>
        );
    }
}


// 数据传递和状态提升
class Child1 extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        this.props.changeChild2Color('red');
    }
    render(){
        return (
        <div>
            <h1>Child1： {this.props.bgColor}</h1>
            <button onClick={(e) => {this.handleClick(e)}}>改变child2 颜色</button>
        </div>
        );
    }
}
class Child2 extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div style={{background:this.props.bgColor}}>
            <h1>Child2背景颜色： {this.props.bgColor}</h1>
        </div>
        );
    }
}

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            child2BgColor: '#999'
        }
    }
    onChild2BgColorChange(color){
        this.setState({
            child2BgColor : color
        })
    }
    render(props){
        return (
        <div>
            <Child1 changeChild2Color={(color) => {this.onChild2BgColorChange(color)}}/>
            <Child2 bgColor={this.state.child2BgColor}/>
        </div>
        );
    }

}
