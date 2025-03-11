<template>
  <div id="content">

    <div id="map"/>
    <flowtype flowtype class="ftype"></flowtype>
    <!-- 弹框 dom -->
    <!-- <div id="popup" ref="mapContent" v-html="mapText"></div> -->
    <card id="popup" :pointName="pointName" :pointLon="pointLon" :pointLat="pointLat" :pointInfo="pointInfo"></card>
    <div id="dialogmask" class="dialogmask opacity"></div>
    <div id="dialog" class="box" style="display: none">
      <div id="dialog_title" class="dialogtitle" style="">
        <!-- <label style="padding-left: 10px">执行结果</label> -->
        <el-button type="success" icon="el-icon-close" circle @click="closepop"
                   style="float: right;margin-right: 10px; width:38px"></el-button>
      </div>
      <div id="dialog_content" class="dialogcontent">
        <div id="logcontent" class="logcontent">
          <datatable/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import flowtype from '@//components/map/flowtype'
import card from '@/components/map/card'
import datatable from '@/components/map/dataChart'
import XYZ from 'ol/source/XYZ'
import {Map, View, Feature, Overlay} from 'ol'
import {fromLonLat, transform} from 'ol/proj'
// import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";

import {Icon, Style, Circle as CircleStyle, Stroke, Fill, Text} from "ol/style";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {Vector as VectorSource} from "ol/source";
import {boundingExtent} from 'ol/extent'
import {transformExtent} from 'ol/proj'
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import $ from 'jquery'

export default {
  data() {
    return {
      map: null,
      // 瓦片引入地址 nginx
      // mapUrl: `http://127.0.0.1:9098/tiles/{z}/{x}/{y}.png`
      // 瓦片本地引入 瓦片等级越高加载编译越慢
      // 在 public 下新建 tiles 文件夹，将下好的瓦片放进去

      //添加这个范围 经度-最小，纬度-最小，经度-最大，纬度-最大
      // mapUrl: `http://127.0.0.1:9089/tiles/{z}/{x}/{y}.png`
      // mapUrl: `http://127.0.0.1:9089/maps/overlay/{z}/{x}/{y}.png`
      mapUrl: `http://127.0.0.1:9089/maps/satellite/{z}/{x}/{y}.jpg`,
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
      wind: [{
        id: 1,
        lat: 10.858592623502162,
        lng: 84.84162294291296,
        name: "台风1",
        wind: 2,
      }, {
        id: 2,
        lat: 8.046038432,
        lng: 85.4491131,
        name: "台风2",
        wind: 3,
      },
        {
          id: 3,
          lat: 5.8848155,
          lng: 86.12413,
          name: "台风3",
          wind: 4,
        },
        {
          id: 4,
          lat: 1.0291548,
          lng: 88.3149689,
          name: "台风4",
          wind: 5,
        }
      ],
      currentwind: {
        id: 1,
        lat: 10.858592623502162,
        lng: 84.84162294291296,
        name: "台风1",
        wind: 1,
      },
      prewind: {
        id: 1,
        lat: 1.0291548,
        lng: 88.3149689,
        name: "台风2",
        wind: 2,
      },
      data: [{
        id: 1,
        lat: 21,
        lng: 89.5,
        name: "Point A",
        properties: {
          // 标记属性
          info: "This is Point A",
          catagory: 1,
          typename: "种类1",
        },
      },
        {
          id: 2,
          lat: 24,
          lng: 87,
          name: "Point B",
          properties: {
            // 标记属性
            info: "This is Point B",
            catagory: 2,
            typename: "种类2",
          },
        },
        {
          id: 3,
          lat: 26,
          lng: 93,
          name: "Point C",
          properties: {
            // 标记属性
            info: "This is Point C",
            catagory: 1,
            typename: "种类1",
          },
        },
        {
          id: 4,
          lat: 33,
          lng: 87,
          name: "Point B",
          properties: {
            // 标记属性
            info: "This is Point B",
            catagory: 2,
            typename: "种类2",
          },
        }, {
          id: 5,
          lat: 29,
          lng: 90,
          name: "Point B",
          properties: {
            // 标记属性
            info: "This is Point B",
            catagory: 2,
            typename: "种类2",
          },
        }],

      // mapUrl: `D:\\tool\\nginx-1.6.3\\nginx-1.6.3\\tiles/{z}/{x}/{y}.png`
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
    this.createWindMarker()
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
        [40, 45], // 最左端
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
        // console.log(this.layer1.length)

      } else if (catagory == 2) {
        this.layer2.push(layer)
        // console.log(this.layer2.length)
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
        // console.log(this.layer1.length)
        // console.log(this.layer1)
        if (this.layer1.length == 0) {
          this.createByType(type)

        } else {
          console.log("种类", type, "已添加")
        }
      } else if (type == 2) {
        if (this.layer2.length == 0) {
          this.createByType(type)
        } else {
          console.log("种类", type, "已添加")
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
      if (feature && (feature.values_.info != null || feature.values_.info != undefined)) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName = feature.values_.name
        this.pointLat = latlng[1].toFixed(2)
        this.pointLon = latlng[0].toFixed(2)
        this.pointInfo = feature.values_.info
        // console.log(feature.values_.name)
        // console.log(this.pointName)
        this.overlayInfo.setPosition(feature.values_.latlng)
        // console.log(this.overlayInfo.getPosition())
      } else {
        this.closeMapPopup()
        // console.log(this.overlayInfo.getPosition())

      }
    },
    // 地图点击
    mapClick(e) {
      // console.log('aaa')
      const lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      console.log(lonlat)
      // // 判断当前点击是否点击在图标上
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      if (feature && feature.values_.catagory == 2) {
        // if () {
        // if (feature) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName = feature.values_.name
        this.pointLat = latlng[1].toFixed(2)
        this.pointLon = latlng[0].toFixed(2)
        this.pointInfo = feature.values_.info
        // console.log(feature.values_.name)
        console.log(this.pointName)
        // this.overlayTable.setPosition(feature.values_.latlng)
        this.closeMapPopup()
        this.showlog_result()
        // console.log(this.overlayInfo.getPosition())
      } else {
        this.closeMapTable()
        // console.log(this.overlayInfo.getPosition())

      }
    },
    //显示弹框，并且根据结果是true或false来更改标题部分的颜色
    showlog_result(info) {//展示具体弹框内容，以及根据结果是否正确变更title的颜色
      $("#dialog").css({display: "block"});//通过Jquery的css()更改样式
      $("#dialogmask").css({display: "block"});
      $("#logcontent").html(info);
      $("#dialog_title").css({background: "#00CC00"});
    },
    closepop() {//关闭弹框
      $("#dialog").css({display: "none"});
      $("#dialogmask").css({display: "none"});
    },
    creatWindFeature(data) {
      var feature = new Feature({
        title: 'beijing',
        id: data.id,
        geometry: new Point(fromLonLat([data.lng, data.lat])),
        name: data.name,
        // info: coord.properties.info,
        latlng: fromLonLat([data.lng, data.lat]),
        wind: data.wind,
        // catagory:catagory,
        // typename:typeName,
      });
      return feature;
    },
    addWindToMap(feature) {
      const markerSource = new VectorSource({
        features: [feature],
      });
      var layer = new VectorLayer({
        source: markerSource,
      })
      this.map.addLayer(
          layer
      );
      // console.log(layer)
    },
    //通过风强渡判断预警等级
    checkpic(wind, time) {//wind 风力  time  1表示当前 2 表示前一时刻
      var color = null
      var src = null
      if (wind < 1)
        color = "white"
      else if (wind == 1)
        color = "blue"
      else if (wind == 2)
        color = 'yellow'
      else if (wind == 3)
        color = 'orange'
      else if (wind >= 4)
        color = 'red'
      if (time == 1)//1表示当前
          // src = "@/assets/img/wind"+color+".png"
        src = `wind${color}.png`

      if (time == 2)//1表示当前
        src = "prewind" + color + ".png"
      console.log(color)
      return src

    },
    // 绘制连线
    addLine(point1, point2) {
      let featureLine = new Feature({
        geometry: new LineString([
          point1,
          point2,
        ]),
      });
      let source = new VectorSource()
      source.addFeature(featureLine)
      let layer = new VectorLayer()
      layer.setSource(source)
      this.map.addLayer(layer)
    },
    createWindMarker() {
      // var layer = null
      var lenth = this.wind.length
      const wind = this.wind
      this.wind.forEach((w, i) => {
        var feature = this.creatWindFeature(this.wind[i])
        if (i == 0) {
          var img = this.checkpic(w.wind, 1)
          feature.setStyle(
              new Style({
                image: new Icon({
                  // src: require("@/assets/img/windblue.png"),
                  src: require('@/assets/img/' + img),
                  scale: 1,
                }),
                text: new Text({
                  text: (lenth - i).toString(),
                  fill: new Fill({
                    color: "#FFF",
                  }),
                  font: "12px Calibri,sans-serif",
                  stroke: new Stroke({
                    color: "red",
                    width: 5,
                  }),
                }),
              }));
        } else {
          this.addLine(fromLonLat([wind[i].lng, wind[i].lat]), fromLonLat([wind[i - 1].lng, wind[i - 1].lat]))

          if (i == (lenth - 1)) {
            var img = this.checkpic(w.wind, 2)
            feature.setStyle(
                new Style({
                  image: new Icon({
                    // src: require("@/assets/img/windblue.png"),
                    src: require('@/assets/img/' + img),
                    scale: 1,
                  }), text: new Text({
                    text: (lenth - i).toString(),
                    fill: new Fill({
                      color: "#FFF",
                    }),
                    font: "12px Calibri,sans-serif",
                    stroke: new Stroke({
                      color: "red",
                      width: 5,
                    }),
                  }),
                }));
          } else {
            feature.setStyle(
                new Style({
                  image: new CircleStyle({
                    radius: 15,
                    stroke: new Stroke({
                      color: "blue",
                    }),
                    fill: new Fill({
                      color: "rgba(24,144,255,100)",
                    }),
                  }),
                  text: new Text({
                    text: (lenth - i).toString(),
                    fill: new Fill({
                      color: "#FFF",
                    }),
                    font: "12px Calibri,sans-serif",
                    stroke: new Stroke({
                      color: "red",
                      width: 5,
                    }),
                  }),
                }));
          }
        }

        this.addWindToMap(feature)
      })
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
  position: fixed;
  /* position: relative; */
  z-index: 998;
  top: 90px;
  /* left: 300px; */
}

.dialogmask {
  position: fixed;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 999;
  display: none;

}

.opacity { /*遮罩浑浊处理*/
  opacity: 0.3;
  filter: alpha(opacity=30);
  background-color: #000;
}

.box {
  overflow: hidden;
  position: absolute;
  width: 50%;
  height: 70%;
  z-index: 1000; /*值越大，和其他层层叠时越在上面*/
  left: 25%;
  top: 15%;
  background-color: #fff;
  border: 1px solid rgb(0, 153, 153);
}

.dialogtitle {
  width: 100%;
  height: 44px;
  line-height: 30px;
  position: absolute;
  font-size: 18px;
  top: 0px;
  background: rgb(4, 70, 26) ! important;
}

.dialogcontent {
  padding-top: 45px;
  /* OVERFLOW: scroll; */
  height: calc(100% - 20px);
  height: -webkit-calc(100% - 20px);
  background: rgb(10, 66, 29);
}

.logcontent {
  padding: 10px;
}
</style>