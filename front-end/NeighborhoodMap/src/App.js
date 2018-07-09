import React, { Component } from 'react';
import './App.css'
import MapDiv from './MapDiv'
import LocList from './LocList'
import escapeRegExp from 'escape-string-regexp'
import registerServiceWorker from './registerServiceWorker';

class NeighborhoodApp extends Component {

    // allLocations： 全部地点，用于过滤时和全集进行比较
    // locations: 用于作为props传递给其他组件，作为过滤后的地点集
    // hiddenMenu: 汉堡图标通过更改该state来更改父元素class
    // query: 用于接收来自子组件的过滤条件
    state = {
        allLocations: [
            {title: '金融街购物中心', location: {lat: 39.915725, lng: 116.361656}},
            {title: '全国政协礼堂', location: {lat: 39.919562, lng: 116.364399}},
            {title: '故宫', location: {lat: 39.916345, lng: 116.397155}},
            {title: '国家大剧院', location: {lat: 39.904885, lng: 116.38951}},
            {title: '西单文化广场', location: {lat: 39.908842, lng: 116.374797 }},
            {title: '北海公园', location: {lat: 39.926185, lng: 116.389728}}
        ],
        locations: [
            {title: '金融街购物中心', location: {lat: 39.915725, lng: 116.361656}},
            {title: '全国政协礼堂', location: {lat: 39.919562, lng: 116.364399}},
            {title: '故宫', location: {lat: 39.916345, lng: 116.397155}},
            {title: '国家大剧院', location: {lat: 39.904885, lng: 116.38951}},
            {title: '西单文化广场', location: {lat: 39.908842, lng: 116.374797 }},
            {title: '北海公园', location: {lat: 39.926185, lng: 116.389728}}
        ],
        hiddenMenu: '',
        query: ''
    }

    // 汉堡图标点击后更改hiddenMenu值，当hiddenMenu为menu-hidden时，LocList向左隐藏
    handClick = () => {
        this.setState({
            hiddenMenu: this.state.hiddenMenu === 'menu-hidden'? ' ': 'menu-hidden'
        })
    }

    // 过滤地点
    filterLocation= (e, query) => {
        // 防止input的onChange事件触发事件
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {

            let newquery = query.trim();

            this.setState({
                query: newquery
            })

            const match = new RegExp(escapeRegExp(query), 'i')
            let newLocations = this.state.allLocations.filter((location) => match.test(location.title))
            this.setState({
                locations: newLocations
            })
        }
    }

    // 注册service worker
    componentDidMount() {
        registerServiceWorker();
    }

    render() {

        return (
            <div className={this.state.hiddenMenu}>
                <LocList 
                    locations={this.state.locations} 
                    filterLocation={this.filterLocation}/>
                <MapDiv 
                    locations={this.state.locations}
                    handClick={this.handClick}
                 />
            </div>
        )
    }

}

export default NeighborhoodApp