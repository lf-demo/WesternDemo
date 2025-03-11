<template>
  <div id="content">

    <div id="map" />
  </div>
</template>
<script>
// 此处引用替换即可
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import LineString from "ol/geom/LineString";

import { Map, View, Feature, Overlay } from 'ol'
import { Style, Fill, Icon, Text,Stroke,Circle as CircleStyle } from 'ol/style'
import { Point } from 'ol/geom'
import { fromLonLat, transform } from 'ol/proj'
import { boundingExtent } from 'ol/extent'
import { transformExtent } from 'ol/proj'

export default {
  data() {
    return {
      map:null,
      // mapUrl: `http://127.0.0.1:9089/maps/roadmap/{z}/{x}/{y}.png`,
      mapUrl: `http://127.0.0.1:9089/maps/satellite/{z}/{x}/{y}.jpg`,
      layerVector:null,
      // mapUrl: `http://127.0.0.1:9089/maps/satellite/{z}/{x}/{y}.jpg`
      // mapUrl: `D:\\tool\\nginx-1.6.3\\nginx-1.6.3\\tiles/{z}/{x}/{y}.png`
      arr : [
        [84.84162294291296, 10.858592623502162],
        [85.4491131, 8.046038432],
        [86.12413, 5.8848155],
        [88.3149689, 1.0291548],
      ],
    }
  },
  mounted() {
    this.initMap()

    this.addPoint()
    this.addLine()
  },
  methods: {
    // 初始化地图
    initMap() {
      const tileLayer = new TileLayer({
        source: new XYZ({
          url: this.mapUrl
        })
      })
      this.map = null
      this.extent =boundingExtent([
        [40, 45], // 最左端
        [140, -60] // 最右端
      ])
      this.map = new Map({
        layers: [tileLayer],
        view: new View({
          center: fromLonLat([97, 24]), // 地图中心点
          // center: this.center,
          zoom: 6, // 初始缩放级别
          minZoom: 5, // 最小缩放级别
          maxZoom: 7 ,// 最大缩放级别
          // projection: 'EPSG:4326',
          constrainResolution: true,  // 设置缩放级别为整数
          smoothResolutionConstraint: false,  // 关闭无级缩放地图
          extent: transformExtent(this.extent, 'EPSG:4326', 'EPSG:3857')// 可视范围限制
          // extent:[60.00000,0.00000,110.00000,60.00000]
        }),
        target: 'map' // 将地图注入到 dom 元素中，此处写 dom id
      })

    },
    // 绘制坐标点
    addPoint() {
      var feature = new Feature({
        title: 'beijing',
        geometry: new Point(fromLonLat([84.84162294291296, 10.858592623502162])),
      })
      feature.setStyle(
        new Style({image: new Icon({
            src: require("@/assets/img/windblue.png"),
            // src: require('@/assets/img/'+img),
            scale: 1,
          }),
        })
      );
      const markerSource = new VectorSource({
        features: [feature],
      });
      var layer =new VectorLayer({
        source: markerSource,
      })
      this.map.addLayer(layer)
      console.log('aaa')
    },

    // 绘制连线
    addLine() {
      let featureLine = new Feature({
        geometry: new LineString([
          fromLonLat([84.84162294291296, 10.858592623502162]),
          fromLonLat([88.3149689, 1.0291548]),
        ]),
      });
      let source = new VectorSource()
      source.addFeature(featureLine)
      let layer = new VectorLayer()
      layer.setSource(source)
      this.map.addLayer(layer)
    }




  }
}
</script>

<style scoped>
#content{
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}
#popup {
  background-color: #fff;
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  top: 0;
  left: 0;
}
</style>

