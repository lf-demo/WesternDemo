/**
 * 地图加载
 */
<template>
  <div id="map" ref="map"></div>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';

export default {
  name: 'MapPage',
  data() {
    return {
      map: null,
      markers: []
    };
  },
  mounted() {
    this.initializeMap();
    this.getMarkerData();
  },
  methods: {
    initializeMap() {
      // 创建地图容器
      this.map = new Map({
        target: this.$refs.map,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      // 监听地图点击事件
      this.map.on('click', (e) => {
        const clickedCoord = e.coordinate;
        this.createMarker(clickedCoord);
      });
    },
    createMarker(coord) {
      // 创建标记要素
      const marker = new Feature({
        geometry: new Point(coord),
      });

      // 设置标记样式
      marker.setStyle(new Style({
        image: new Icon({
          src: require('@/assets/marker-icon.png'),
          scale: 1,
        }),
      }));

      // 添加标记要素到源中
      const markerSource = new VectorSource({
        features: [marker],
      });
      this.map.addLayer(new VectorLayer({
        source: markerSource,
      }));

      // 存储标记信息
      this.markers.push({
        coordinate: coord,
        properties: {
          // 标记属性
        },
      });
    },
    getMarkerData() {
      // 模拟从后端获取标记数据
      const data = [
        {
          lat: 39.9042,
          lng: 116.4074,
          properties: {
            // 标记属性
          },
        },
        {
          lat: 51.5074,
          lng: -0.1278,
          properties: {
            // 标记属性
          },
        },
      ];

      // 将数据转换为标记并添加到地图上
      data.forEach((item) => {
        const coord = fromLonLat([item.lng, item.lat]);
        this.createMarker(coord);
      });
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>