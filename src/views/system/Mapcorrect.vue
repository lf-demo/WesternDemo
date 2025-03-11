<template>
  <div id="content">

    <div id="map"/>
    <!-- 弹框 dom -->
    <!-- <div id="popup" ref="mapContent" v-html="mapText"></div> -->
    <card id="popup" :pointName="pointName" :pointLon="pointLon" :pointLat="pointLat" :pointInfo="pointInfo"></card>
    <datatable id="popuptable"></datatable>
    <flowtype flowtype class="ftype"></flowtype>
  </div>
</template>
<script>
import flowtype from '@//components/map/flowtype'
import card from '@/components/map/card'
import datatable from '@/components/map/table'
// import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import {Map, View, Feature, Overlay} from 'ol'
import {fromLonLat, transform} from 'ol/proj'
// import Feature from "ol/Feature";
import Point from "ol/geom/Point";
// import { fromLonLat } from "ol/proj";
import {Icon, Style} from "ol/style";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import {boundingExtent} from 'ol/extent'
import {transformExtent} from 'ol/proj'
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import Card from '@/components/map/card.vue'

export default {
  data() {
    return {
      map: null,
      overlayInfo: null,
      overlayTable: null,
      mapContent: null,
      mapText: null,
      layer1: [],
      layer2: [],
      pointName: null,
      pointLon: null,
      pointLat: null,
      pointInfo: null,
      data: []
    }
  },
  components: {
    flowtype,
    // card
    card,
    datatable,
  },
  mounted() {
    this.initMap()
    // this.getMarkerData(1)
    // this.createByType(1)
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
      this.extent = boundingExtent([
        [40, 35], // 最左端
        [140, -60] // 最右端
      ])
      this.map = new Map({
        target: 'map', // 将地图注入到 dom 元素中，此处写 dom id
        layers: [tileLayer],
        view: new View({
          center: fromLonLat([89.5, 21]), // 地图中心点
          // center: this.center,
          zoom: 6, // 初始缩放级别
          minZoom: 4, // 最小缩放级别
          maxZoom: 9,// 最大缩放级别
          // extent:[30.00000,-60.00000,135.00000,40.00000]
          // extent:[30.00000, -60.00000, 135.00000, 40]
          extent: transformExtent(this.extent, 'EPSG:4326', 'EPSG:3857'),// 可视范围限制
        }), controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        }).extend([
          new ScaleLine({
            //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
            units: "metric"
          })
        ])

      })
      // 初始化地图之后就将弹框挂载好，后续只是修改显示的位置
      this.createOverlayInfo()
      this.createOverlayTable()
      // this.map.on('click', (e) => this.mapClick(e))
      this.map.on('click', (e) => this.mapClick(e))
      this.map.on('pointermove', (e) => this.mapPointermove(e))

    },
    // catagory 是图层种类
    setTypeFeature(coord, catagory) {
      var typeName = ""
      if (catagory == 1)
        typeName = '种类1'
      else
        typeName = '种类2'

      var marker = new Feature({
        id: coord.id,
        geometry: new Point(coord.point),
        name: coord.name,
        info: coord.properties.info,
        latlng: coord.point,
        catagory: catagory,
        typename: typeName,
      });

      // 设置标记样式
      marker.setStyle(
        new Style({
          image: new Icon({
            src: require("@/assets/marker-icon.png"),
            scale: 1,
          }),
        }));
      return marker;
    },
    createMarker(coord, catagory) {
      var layer = null
      var marker = this.setTypeFeature(coord, catagory)
      const markerSource = new VectorSource({
        features: [marker],
      });
      layer = new VectorLayer({
        source: markerSource,
      })
      if (catagory == 1) {

        this.layer1.push(layer)
        console.log(this.layer1.length)

      } else if (catagory == 2) {
        this.layer2.push(layer)
        console.log(this.layer2.length)
      }
      this.map.addLayer(
        layer
      );
    },
    removeMarker(coord, catagory) {

      if (catagory == 1) {
        for (let i = 0; i < this.layer1.length; i++)
          this.map.removeLayer(this.layer1[i])

      } else if (catagory == 2) {
        for (let i = 0; i < this.layer2.length; i++)
          this.map.removeLayer(this.layer2[i])
      }
    },

    //type -->int
    createByType(type) {
      // 将数据转换为标记并添加到地图上
      this.data.forEach((item) => {
        if (item.properties.catagory == type) {
          const coord = {
            id: item.id,
            point: fromLonLat([item.lng, item.lat]),
            name: item.name,
            properties: {
              // 标记属性
              info: item.properties.info,
              // catagory:item.properties.catagory,
              // typename:item.properties.typename,
            },
          };
          this.createMarker(coord, type);
        }

      });

    },
    addmarkers(type) {
      if (type == 1) {
        if (this.layer1.length != 0) {
          this.createByType(type)

        } else {
          console.log("种类", catagory, "已添加")
        }
      } else if (type == 2) {
        if (this.layer2.length != 0) {
          this.createByType(type)
        } else {
          console.log("种类", catagory, "已添加")
        }
      }
    },
    deletemarkers(type) {
      if (type == 1) {
        if (this.layer1.length != 0) {
          this.removeByType(type)
          this.layer1 = []
          console.log(this.layer1.length)
        } else {
          console.log("种类", catagory, "不存在")
        }
      } else if (type == 2) {
        if (this.layer2.length != 0) {
          this.removeByType(type)
          this.layer2 = []

        } else {
          console.log("种类", catagory, "不存在")
        }
      }
    },
    removeByType(type) {
      // 将数据转换为标记并添加到地图上
      this.data.forEach((item) => {
        if (item.properties.catagory == type) {
          const coord = {
            id: item.id,
            point: fromLonLat([item.lng, item.lat]),
            name: item.name,
            properties: {
              // 标记属性
              info: item.properties.info,
              // catagory:item.properties.catagory,
              // typename:item.properties.typename,
            },
          };
          this.removeMarker(coord, type);
        }

      });

    },
    createOverlayInfo() {
      this.overlayInfo = new Overlay({
        element: document.querySelector('#popup'), // 将弹框挂载在 dom 上
        // element: this.mapContent, // 将弹框挂载在 dom 上
        // element: this.mapContent.value, // 将弹框挂载在 dom 上
        autoPan: true, // 如果弹框显示不全则自动归位
        positioning: 'bottom-center', // 相对于其位置属性的实际位置
        stopEvent: true, // 事件冒泡
        autoPanAnimation: {
          duration: 300 // 地图移动速度
        },
      })
      this.map.addOverlay(this.overlayInfo)
    },
    // 关闭弹框
    closeMapPopup() {
      this.overlayInfo.setPosition(undefined)
    },
    createOverlayTable() {
      this.overlayTable = new Overlay({
        element: document.querySelector('#popuptable'), // 将弹框挂载在 dom 上
        // element: this.mapContent, // 将弹框挂载在 dom 上
        // element: this.mapContent.value, // 将弹框挂载在 dom 上
        autoPan: true, // 如果弹框显示不全则自动归位
        positioning: 'bottom-center', // 相对于其位置属性的实际位置
        stopEvent: true, // 事件冒泡
        autoPanAnimation: {
          duration: 300 // 地图移动速度
        },
      })
      this.map.addOverlay(this.overlayTable)
    },
    // 关闭弹框
    closeMapTable() {
      this.overlayTable.setPosition(undefined)
    },
    // 地图鼠标经过
    mapPointermove(e) {
      const lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      // // 判断当前点击是否点击在图标上
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      // console.log(e.coordinate)
      // console.log("经纬度：",lonlat)
      // if (feature && feature.values_.catagory == 1) {
      if (feature) {
        // console.log("经纬度：",lonlat)
        // console.log("经度：",lonlat[0])
        // console.log("纬度：",lonlat[1])
        // console.log("种类：",feature.values_.catagory)
        // console.log("种类：",feature)
        // console.log( '点击坐标:',e.coordinate)
        // this.mapText= `<p>${feature.values_.info}<p>`
        // console.log(feature.values_.latlng)
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName = feature.values_.name
        this.pointLat = latlng[1].toFixed(2)
        this.pointLon = latlng[0].toFixed(2)
        this.pointInfo = feature.values_.info
        // console.log(feature.values_.name)
        console.log(this.pointName)
        this.overlayInfo.setPosition(feature.values_.latlng)
        // console.log(this.overlayInfo.getPosition())
      } else {
        this.closeMapPopup()
        // console.log(this.overlayInfo.getPosition())

      }
    },
    // 地图点击
    mapClick(e) {
      console.log('aaa')
      const lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      // // 判断当前点击是否点击在图标上
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      // if (feature &&  feature.values_.catagory == 2) {
      if (feature) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName = feature.values_.name
        this.pointLat = latlng[1].toFixed(2)
        this.pointLon = latlng[0].toFixed(2)
        this.pointInfo = feature.values_.info
        // console.log(feature.values_.name)
        console.log(this.pointName)
        this.overlayTable.setPosition(feature.values_.latlng)
        // console.log(this.overlayInfo.getPosition())
      } else {
        this.closeMapTable()
        // console.log(this.overlayInfo.getPosition())

      }
    },

  }
}
</script>

<style scoped>
#content {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
  /* position: absolute;
  top:60px;

  left: 260px; */
}

#popup {
  background-color: rgb(6, 68, 39);
  /* filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2)); */
  /* padding: 4px; */
  /* padding: 0; */
  /* border-color: rgb(14, 218, 123); */
  border-radius: 5px;
  border: 1px solid rgb(14, 218, 123);
  top: 0;
  left: 0;
  width: 150px;
}

#tables {
  background-color: rgb(6, 68, 39);
  /* filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2)); */
  /* padding: 4px; */
  /* padding: 0; */
  /* border-color: rgb(14, 218, 123); */
  border-radius: 5px;
  border: 1px solid rgb(14, 218, 123);
  top: 0;
  left: 0;
  width: 150px;
}

.ftype {
  position: absolute;
  /* position: relative; */
  z-index: 999;
  top: 90px;
  /* left: 300px; */
}
</style>
