/**
 * 地图加载
 */
<template>
  <div id="map" ref="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      markers: [],
      //   popup: null,
    };
  },
  mounted() {
    this.initializeMap();
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
      this.getMarkerData();

      // const markerSource = new VectorSource({
      //     features: [marker],
      // });
      // const markerLayer  = tthis.map.addLayer(new VectorLayer({
      //     source: markerSource,
      // }));
      // markerLayer.on('click', (event) => {
      // const feature = event.feature;
      // const name = feature.get('name');
      // const info = feature.get('info');
      // // 将属性信息展示到弹出框中
      // const content = `<div>Name: ${name}</div><div>Info: ${info}</div>`;
      // const coordinate = feature.getGeometry().getCoordinates();
      // new Popup()
      //     .setLngLat(toLonLat(coordinate))
      //     .setHTML(content)
      //     .addTo(this.map);
      // });

      // 监听地图点击事件
      //   this.map.on('click', (e) => {
      //     const clickedCoord = e.coordinate;
      //     this.createMarker(clickedCoord);
      //   });
    },
    createMarker(coord) {
        
      // 创建标记要素
      let marker = new Feature({
        id: coord.id,
        geometry: new Point(coord.point),
        name: coord.name,
        info: coord.properties.info,
      });


      // 设置标记样式
      marker.setStyle(
        new Style({
          image: new Icon({
            src: require("@/assets/marker-icon.png"),
            scale: 1,
          }),
        })
      );
 
    //   this.map.on('click',(e)=>{
    //     console.log(e)
    //   })
    marker.on({
        click:()=>{
            console.log(11111111);
        }
    })
    //   marker.on("click", function(event) {
    //     console.log(11111);
    //     const feature = event.feature;
    //     const name = feature.get("name");
    //     const info = feature.get("info");
    //     // 将属性信息展示到弹出框中
    //     const content = `<div>Name: ${name}</div><div>Info: ${info}</div>`;
    //     const coordinate = feature.getGeometry().getCoordinates();
    //     new Popup()
    //       .setLngLat(toLonLat(coordinate))
    //       .setHTML(content)
    //       .addTo(this.map);
    //   });
    //   // 添加标记要素到源中
      const markerSource = new VectorSource({
        features: [marker],
      });
      this.map.addLayer(
        new VectorLayer({
          source: markerSource,
        })
      );

    //   // 存储标记信息
    //   this.markers.push({
    //     id: coord.id,
    //     coordinate: coord.point,
    //     name: coord.name,
    //     properties: {
    //       // 标记属性
    //       info: coord.properties.info,
    //     },
    //   });
    },
    getMarkerData() {
      // 模拟从后端获取标记数据
      const data = [
        {
          id: 1,
          lat: 39.9042,
          lng: 116.4074,
          name: "Point A",
          properties: {
            // 标记属性
            info: "This is Point A",
          },
        },
        {
          id: 2,
          lat: 51.5074,
          lng: -0.1278,
          name: "Point B",
          properties: {
            // 标记属性
            info: "This is Point B",
          },
        },
      ];

      // 将数据转换为标记并添加到地图上
      data.forEach((item) => {
        const coord = {
          id: item.id,
          point: fromLonLat([item.lng, item.lat]),
          name: item.name,
          properties: {
            // 标记属性
            info: item.properties.info,
          },
        };
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