import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapDiv extends Component {

    static propTypes = {
        locations: PropTypes.array.isRequired,
        handClick: PropTypes.func.isRequired
    }

    // activeMarker: 当前激活infoWindow的Marker对象
    // showingInfoWindow: 是否关闭infoWindow
    // bounds： 地图边界
    // resContent： infoWindow中显示的内容，String类型
    state = {
        activeMarker: {},
        showingInfoWindow: false,
        bounds: {},
        resContent: {}
    }

    // 只在第一次加载全部数据时定义地图边界，保证地图边界不跟随筛选后props变化
    componentDidMount() {

        let _bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < this.props.locations.length; i++) {
            _bounds.extend(this.props.locations[i].location);
        }

        this.setState({
            bounds: _bounds
        })
    }


    // 点击Marker后从维基百科fetch数据
    onMarkerClick = (props, marker) => {

        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            resContent: ' '
        })

        // 通过跨域的方式取数据
        // 中文取到的数据有限，有部分地点数据缺失
        const request = new Request(marker.imgUrl, { mode: 'cors' });
        fetch(request)
            .then((response) => {return response.json()})
            .then((data) => {

                // 对数据缺失情况做异常处理
                if(data.continue) {
                    this.setState({
                        resContent: data.continue.clcontinue
                    })                    
                }
                else {
                    this.setState({
                        resContent: '暂无相关信息'
                    }) 
                }
            })
            .catch((error) => (console.log(error)));
    };


    // 点击地图关闭infoWindow
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: {name: ' '}
            })
        }
      };


    render() {

        const { handClick, locations } = this.props
        const { bounds, resContent, activeMarker, showingInfoWindow } = this.state;

        const style = {
            width: '100vw',
            height: '100vh'
        }

        // 当地图加载过程的处理
        let mapContent;
        if (!this.props.loaded) {
            mapContent = (<div>Loading...</div>)
        }
        mapContent = (
            <Map
                className={'map'}
                google={this.props.google}
                initialCenter={{
                    lat: 39.914916,
                    lng: 116.369059
                }}
                zoom={15}
                bounds={bounds}
                onClick={this.onMapClicked}
            >

               {locations.map((loc) => (

                    <Marker key={loc.title}
                        onClick={this.onMarkerClick}
                            name={loc.title}
                            position={loc.location}
                            imgUrl={'https://zh.wikipedia.org/w/api.php?action=query&format=json&prop=categories&titles=' + loc.title + '&origin=*'}
                        />
                ))}

                <InfoWindow
                    marker={activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={showingInfoWindow}
                >
                    <div>
                        <h4>{activeMarker.name}</h4>
                        <span>维基分类： {String(resContent)}</span>
                    </div>
                </InfoWindow>

            </Map>
        )

        return (

            <div className="mapArea" style={style} role="application">
                <div className="header">
                    <button className="menu-icon-link" onClick={handClick} aria-label="toggle menu" label="toggle menu" tabIndex="1">
                        <i className="icon-list"></i>
                    </button>

                    <h1>Map</h1>
                </div>
                <div id="map" ref='map' tabIndex="-1">
                    {mapContent}
                </div>
            </div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDM44CkBZDUXX7yApms7jv_THSjRRlmga8",
    language: "zh-cn"
})(MapDiv);