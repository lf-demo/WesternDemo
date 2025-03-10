// //新增工具类 LayerUtil
// import 'ol/ol.css';
// import axios from 'axios'
// import {GeoJSON} from 'ol/format';
// import {Fill, Stroke, Style} from 'ol/style';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {Vector as VectorSource, TileWMS as TileWMSSource} from 'ol/source';

// let featureStyle = new Style({
//     fill: new Fill({
//         color: 'red'
//     }),
//     stroke: new Stroke({
//         color: 'red',
//         width: 6
//     })
// });

// /**
//  * 创建图层(WMS)
//  * @returns {*} 图层
//  */
// function createWMSLayer() {
//     let tileWMSSource = new TileWMSSource({
//         url: "http://localhost:8088/geoserver/platform/wms?service=WMS&version=1.1.0&request=GetMap&layers=platform%3Aworld&bbox=-180.0%2C-90.0%2C180.0%2C83.62359619140625&width=768&height=370&srs=EPSG%3A4326&styles=&format=application/openlayers",
//         projection: 'EPSG:4326',
//         serverType: 'geoserver',
//         format: new GeoJSON()
//     })
//     return new TileLayer({
//         source: tileWMSSource,
//     });
// }

// /**
//  * 创建图层(WFS)
//  * @returns {*} 图层
//  */
// function createWFSLayer() {
//     let vectorSource = new VectorSource({
//         //WFS服务涉及到跨域问题使用loader加载
//         loader: (extent, resolution, projection) => {  //加载函数
//             let url = '/geoserver/platform/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=railway%3ALuoYangRailway&maxFeatures=1000&outputFormat=application%2Fjson';
//             //maxFeatures=1000 一次最多加载1000个要素
//             axios.post(url).then((response) => {
//                 let featuresArr = (new GeoJSON()).readFeatures(response.data);
//                 featuresArr.forEach((feature) => {
//                     feature.setStyle(featureStyle);
//                 });
//                 vectorSource.addFeatures(featuresArr);  //载入要素
//             });
//         },
//         projection: 'EPSG:4326',
//         format: new GeoJSON(),
//     })
//     return new VectorLayer({
//         source: vectorSource
//     });
// }

// /**
//  * 创建查询图层
//  * @returns {*} 图层
//  */
// function createQueryLayer() {
//     return new VectorLayer({
//         source: new VectorSource({
//             projection: 'EPSG:4326'
//             // wrapX: false,
//         }),
//     });
// }
// export {createWMSLayer, createWFSLayer, createQueryLayer};