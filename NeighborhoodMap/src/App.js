import React, { Component } from 'react';
import './App.css'
import MapDiv from './MapDiv'
import LocList from './LocList'
import escapeRegExp from 'escape-string-regexp'

class NeighborhoodApp extends Component {

    // locations: 用于作为props传递给其他组件，作为过滤后的地点集
    // hiddenMenu: 汉堡图标通过更改该state来更改父元素class
    // query: 用于接收来自子组件的过滤条件
    state = {
        locations: this.props.allLocations,
        hiddenMenu: '',
        query: '',
        showIndex: -1
    }

    // 汉堡图标点击后更改hiddenMenu值，当hiddenMenu为menu-hidden时，LocList向左隐藏
    handClick = () => {
        this.setState({
            hiddenMenu: this.state.hiddenMenu === 'menu-hidden'? ' ': 'menu-hidden'
        })
    }

    // 过滤地点
    filterLocation = (e, query) => {
        // 防止input的onChange事件触发事件
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {

            let newquery = query.trim();

            this.setState({
                query: newquery
            })

            const match = new RegExp(escapeRegExp(query), 'i')
            let newLocations = this.props.allLocations.filter((location) => match.test(location.title))
            this.setState({
                locations: newLocations
            })
        }
    }

    showLocation = (e, index) => {
        this.setState({
            showIndex: index
        })
    }

    render() {

        return (
            <div className={this.state.hiddenMenu}>
                <LocList 
                    locations={this.state.locations} 
                    filterLocation={this.filterLocation}
                    showLocation={this.showLocation}/>
                <MapDiv 
                    locations={this.state.locations}
                    handClick={this.handClick}
                    showIndex={this.state.showIndex}
                 />
            </div>
        )
    }

}

export default NeighborhoodApp