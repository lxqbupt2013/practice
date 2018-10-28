import React, { Component } from 'react';

// 创建一个组件用于展示 地图Loading 信息
class LoadingContainer extends Component {

    state = {
        content: 'Loading...' // 初始内容
    }

    componentDidMount(){

        // 如果超时，重置内容。设置超时为大约 6000ms
        this.timer = setTimeout(() => {
            this.setState({
                content: '加载超时，请检查网络'
            });
        }, 6000);
    }

    componentWillUnmount(){
        // 清除计时器
        clearTimeout(this.timer);
    }

    render(){
        return (
            this.state.content
        )
    }
}

export default LoadingContainer