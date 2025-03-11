//MapInitUtil.js
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer, VectorTile as VectorTileLayer} from 'ol/layer';
import {OSM, Vector as VectorSource, TileWMS as TileWMSSource, VectorTile as VectorTileSource} from 'ol/source';

/**
 * 创建地图
 * @param containerId 容器ID
 * @returns {Map} 地图对象
 */
function createMap(containerId) {
    return new Map({
        target: containerId, layers: [new TileLayer({
            //Layer source for the OpenStreetMap tile server
            source: new OSM()
        })], view: new View({
            projection: 'EPSG:4326', //坐标系
            center: [112.4383393, 34.6868216],//中心点
            zoom: 10//放大级别
        })
    });
}

export default createMap;