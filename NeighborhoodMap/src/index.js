import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App 
        allLocations={[
            {title: '金融街购物中心', location: {lat: 39.915725, lng: 116.361656}},
            {title: '全国政协礼堂', location: {lat: 39.919562, lng: 116.364399}},
            {title: '故宫', location: {lat: 39.916345, lng: 116.397155}},
            {title: '国家大剧院', location: {lat: 39.904885, lng: 116.38951}},
            {title: '西单文化广场', location: {lat: 39.908842, lng: 116.374797 }},
            {title: '北海公园', location: {lat: 39.926185, lng: 116.389728}}
        ]}
    />,
    document.getElementById('root'),
    function() {
        // 注册service worker
        registerServiceWorker();
    }
);
