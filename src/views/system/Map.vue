<template>
  <div id="content">

    <div id="map" />
    <flowtype class="ftype" ></flowtype>
    <mood class="fmood" ></mood>
    <!-- 弹框 dom -->
    <!-- <div id="popup" ref="mapContent" v-html="mapText"></div> -->
    <card id="popup"  :pointName = "pointName" :pointLon = "pointLon" :pointLat = "pointLat" :pointInfo = "pointInfo" :pointcatagory = "pointcatagory"></card>
    <windcard id="windpopup" class="windpopup" :pointLon = "pointLon" :date = "date" :pointLat = "pointLat" :wind = "rwind"></windcard>
    <div id="dialogmask" class="dialogmask opacity"></div>
    <div id="dialog" class="box" style="display: none">
      <div id="dialog_title" class="dialogtitle" style="">
        <!-- <label style="padding-left: 10px">执行结果</label> -->
        <el-button  icon="el-icon-close" plain @click="closepop" style="float: right;margin-right: 10px; width:38px ; border:0px"></el-button>
      </div>
      <div id="dialog_content" class="dialogcontent">
        <div id="logcontent" class="logcontent"><datatable/></div>
      </div>
    </div>
  </div>
</template>
<script>
import flowtype from '@/components/map/flowtype'
import mood from '@/components/map/mood'
import card from '@/components/map/card'
import windcard from '@/components/map/windcard'
import datatable from '@/components/map/dataChart'
import XYZ from 'ol/source/XYZ'
import { Map, View, Feature, Overlay } from 'ol'
import { fromLonLat, transform,Projection } from 'ol/proj'
// import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";

// import { fromLonLat } from "ol/proj";
import { Icon, Style ,Circle as CircleStyle,Stroke, Fill , Text} from "ol/style";
// import { WKT} from "ol/format";
import { Tile as TileLayer, Vector as VectorLayer,Image  as ImageLayer } from "ol/layer";
import {Vector as VectorSource,ImageStatic } from "ol/source";
import { boundingExtent } from 'ol/extent'
import { transformExtent } from 'ol/proj'
import {ScaleLine, defaults as defaultControls} from 'ol/control';
// import smooth from 'chaikin-smooth'
// import Card from '@/components/map/card.vue'
import $ from 'jquery'
import buoy_data from '@/assets/data/buoy_data.json'
import station_data from '@/assets/data/station.json'
export default {
  data() {
    return {
      map: null,
      mapUrltitle:`/maps/overlay/{z}/{x}/{y}.png`,
      mapUrl: `/maps/roadmap/{z}/{x}/{y}.png`,
      // mapUrl: `http://127.0.0.1:8088/maps/satellite/{z}/{x}/{y}.jpg`,
      // mapUrl: `http://127.0.0.1:9089/maps/satellite/{z}/{x}/{y}.jpg`,
      buoy_data:buoy_data,
      station_data:station_data,
      overlayInfo : null,
      overlayWindInfo : null,
      overlayTable : null,
      mapContent : null,
      mapText : null,
      layer1: [],
      layer2: [],
      pointName:null,
      pointLon:null,
      pointLat:null,
      pointInfo:null,
      rwind:null,
      date:null,
      pointcatagory:null,
      hongwailayer:null,
      xuegailayer:null,
      xueshenlayer:null,
      snowdeeptoolbar:null,
      wind:[
      ],
      currentwind:{
        id:1,
        lat: 10.858592623502162,
        lng: 84.84162294291296,
        name:"台风1",
        wind:1,
      },
      prewind:{
        id:1,
        lat: 1.0291548,
        lng: 88.3149689,
        name:"台风2",
        wind:2,
      },
      data:[{
        id: 1,
        lat: 18.161447635552065,
        lng: 88.27717005586338,
        name: "浮标",
        properties: {
          // 标记属性
          info: "This is Point A",
          catagory:1,
          typename:"种类1",
        },
      },
        {
          id: 2,
          lat: 24,
          lng: 87,
          name: "站点",
          properties: {
            // 标记属性
            info: "This is Point B",
            catagory:2,
            typename:"种类2",
          },
        }],

    }
  },
  components: {
    flowtype,
    // card
    card,
    datatable,
    windcard,
    mood,
  },

  mounted() {
    this.initMap()
    this.createWindMarker()
  },
  methods: {
    // 初始化地图
    initMap() {
      const tileLayer = new TileLayer({
        source: new XYZ({
          url: this.mapUrltitle
        })
      })
      const mapLayer = new TileLayer({
        source: new XYZ({
          url: this.mapUrl
        })
      })
      this.map = null
      this.extent =boundingExtent([
        [40, 51], // 最左端
        [140, -60] // 最右端
      ])
      this.map = new Map({
        target: 'map', // 将地图注入到 dom 元素中，此处写 dom id
        layers: [mapLayer],
        view: new View({
          center: fromLonLat([85.4216, 19.946]), // 地图中心点
          // center: this.center,
          zoom: 4, // 初始缩放级别
          minZoom: 4, // 最小缩放级别
          maxZoom:9 ,// 最大缩放级别
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
      const testData = JSON.parse(localStorage.getItem('testData'));
      this.data = testData
      this.createOverlayInfo()
      this.createOverlayTable()
      this.createOverlayWindInfo()
      // this.map.on('click', (e) => this.mapClick(e))
      this.map.on('click', (e) => this.mapClick(e))
      this.map.on('pointermove', (e) => this.mapPointermove(e))
      this.map.on('moveend', (e) => this.createWindMarker(e))
      // console.log([this.data])

      // console.log([this.data])
      this.createhongwaiLayer()
      this.createSnowDetectionLayer()
      this.createSnowDeepLayer()

    },
    savatestdata(){
      var testdata = []
      for(var i =0;i<194;i++){
        // for(var i =0;i<15;i++){
        var item = station_data[i]
        // if(item.name == 'station')
        item.name = '站点'
        testdata.push(item)
        // if( i  == 1)
        //   console.log(item)
      }
      for(var j = 0;j<1254;j++){
        // for(var i = 0;i<14;i++){
        var item = buoy_data[j]
        // if(item.name == 'station')
        // item.name = '浮标'
        testdata.push(item)
      }

      // 将数据保存到本地存储
      localStorage.setItem('testData', JSON.stringify(testdata));
      return testdata
    },
    checkLat(lat){
      var tlat =""
      if(lat>0)
        tlat = ""+ lat+"° N"
      else
        tlat = "" + (lat*(-1))+"° S"
      return tlat
    },
    checkLon(lon){
      var tlon =""
      if(lon>0)
        tlon = ""+ lon+"° E"
      else
        tlon = "" + (lon*(-1))+"° W"
      return tlon
    },
    // catagory 是图层种类
    setTypeFeature(coord,catagory){
      var  typeName = 'flew.png'
      var imgflag = null
      if(catagory == 1){
        typeName = '种类1'
        imgflag = 'flew.png'
      }

      else{
        typeName = '种类2'
        imgflag = 'station.png'
      }
      var marker = new Feature({
        id: coord.id,
        geometry: new Point(coord.point),
        name: coord.name,
        info: coord.properties.info,
        latlng:coord.point,
        catagory:catagory,
        typename:typeName,
      });

      // 设置标记样式
      marker.setStyle(
        new Style({
          image: new Icon({
            src: require('@/assets/typhoon/'+ imgflag),
            scale: 0.285,
          }),
        }));
      return marker;
    },
    createMarker(coord,catagory) {
      var layer = null
      var marker = this.setTypeFeature(coord,catagory)
      const markerSource = new VectorSource({
        features: [marker],
      });
      layer =new VectorLayer({
        source: markerSource,
      })
      if(catagory ==1){

        this.layer1.push(layer)
        // console.log(this.layer1.length)

      }else if(catagory ==2){
        this.layer2.push(layer)
        // console.log(this.layer2.length)
      }
      this.map.addLayer(
        layer
      );
    },
    removeMarker(coord,catagory) {

      if(catagory ==1){
        for(let i = 0; i　< this.layer1.length; i++)
          this.map.removeLayer(this.layer1[i])

      }else if(catagory ==2){
        for(let i = 0; i< this.layer2.length; i++)
          this.map.removeLayer(this.layer2[i])
      }
    },

    //type -->int
    createByType(type) {
      // 将数据转换为标记并添加到地图上
      // console.log((this.data).length)
      this.data.forEach((item) => {
        // console.log(item)
        if(item.properties.catagory == type){
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
          this.createMarker(coord,type);
        }

      });

    },
    addmarkers(type){
      if(type ==1){
        // console.log(this.layer1.length)
        // console.log(this.layer1)
        if( this.layer1.length == 0){
          this.createByType(type)

        }
        else{
          // console.log("种类",type,"已添加")
        }
      }else if(type ==2){
        if( this.layer2.length == 0){
          this.createByType(type)
        }
        else{
          // console.log("种类",type,"已添加")
        }
      }
    },
    deletemarkers(type){
      if(type ==1){
        if( this.layer1.length != 0){
          this.removeByType(type)
          this.layer1 = []
          // console.log(this.layer1.length)
        }
        else{
          console.log("种类",catagory,"不存在")
        }
      }else if(type ==2){
        if( this.layer2.length != 0){
          this.removeByType(type)
          this.layer2 = []

        }
        else{
          console.log("种类",catagory,"不存在")
        }
      }
    },
    removeByType(type) {
      // 将数据转换为标记并添加到地图上
      this.data.forEach((item) => {
        if(item.properties.catagory == type){
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
          this.removeMarker(coord,type);
        }

      });

    },
    createOverlayInfo () {
      this.overlayInfo= new Overlay({
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
    closeMapPopup (){
      this.overlayInfo.setPosition(undefined)
      // this.overlayWindInfo.setPosition(undefined)
    },
    //创建台风信息展示
    createOverlayWindInfo () {
      this.overlayWindInfo= new Overlay({
        element: document.querySelector('#windpopup'), // 将弹框挂载在 dom 上
        // element: this.mapContent, // 将弹框挂载在 dom 上
        // element: this.mapContent.value, // 将弹框挂载在 dom 上
        autoPan: true, // 如果弹框显示不全则自动归位
        positioning: 'bottom-center', // 相对于其位置属性的实际位置
        stopEvent: true, // 事件冒泡
        autoPanAnimation: {
          duration: 300 // 地图移动速度
        },
      })
      this.map.addOverlay(this.overlayWindInfo)
    },
    // 关闭弹框
    closeMapWindPopup (){
      this.overlayWindInfo.setPosition(undefined)
    },
    createOverlayTable () {
      this.overlayTable= new Overlay({
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
    closeMapTable (){
      this.overlayTable.setPosition(undefined)
    },
    // 地图鼠标经过
    mapPointermove(e){
      const lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      // // 判断当前点击是否点击在图标上
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      if (feature && (feature.values_.info != null && feature.values_.info != undefined)) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName  = feature.values_.name
        this.pointLat = this.checkLat(latlng[1].toFixed(2))
        this.pointLon = this.checkLon(latlng[0].toFixed(2))
        this.pointInfo = feature.values_.info
        this.pointcatagory = feature.values_.catagory
        this.overlayInfo.setPosition(feature.values_.latlng)
      }else{
        this.closeMapPopup()
      }
      // // 判断当前点击是否点击在图标上
      // const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      if (feature && (feature.values_.wind != null && feature.values_.wind != undefined)) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.rwind  = feature.values_.wind
        this.pointLat = this.checkLat(latlng[1].toFixed(2))
        this.pointLon = this.checkLon(latlng[0].toFixed(2))
        this.date = feature.values_.date
        // console.log(this.wind,feature.values_.wind)
        // console.log("1",this.pointLon,latlng[0].toFixed(2))
        // console.log("2",this.pointLat,latlng[0].toFixed(2))
        // console.log("2",latlng[1].toFixed(2),latlng[0].toFixed(2))
        this.overlayWindInfo.setPosition(feature.values_.latlng)
      }else{
        this.closeMapWindPopup()
      }
    },
    // 地图点击
    mapClick(e){
      // console.log('aaa')
      const lonlat = transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
      console.log(lonlat)
      // // 判断当前点击是否点击在图标上
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      if (feature &&  feature.values_.catagory == 2) {
        // if () {
        // if (feature) {
        var latlng = transform(feature.values_.latlng, 'EPSG:3857', 'EPSG:4326')
        // console.log("geometry",feature.values_.latlng)
        this.pointName  = feature.values_.name
        this.pointLat = latlng[1].toFixed(2)
        this.pointLon = latlng[0].toFixed(2)
        this.pointInfo = feature.values_.info
        // console.log(feature.values_.name)
        console.log(this.pointName)
        // this.overlayTable.setPosition(feature.values_.latlng)
        this.closeMapPopup()
        this.showlog_result()
        // console.log(this.overlayInfo.getPosition())
      }else{
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
    creatWindFeature(data){
      var feature = new Feature({
        title: 'beijing',
        id: data.id,
        geometry: new Point(fromLonLat([data.lng, data.lat])),
        name: data.name,
        // info: coord.properties.info,
        latlng:fromLonLat([data.lng, data.lat]),
        wind:this.checkTWind(data.wind),
        date:data.date,
        // catagory:catagory,
        // typename:typeName,
      });
      return feature;
    },
    addWindToMap(feature){
      const markerSource = new VectorSource({
        features: [feature],
      });
      var layer =new VectorLayer({
        source: markerSource,
      })
      this.map.addLayer(
        layer
      );
      // console.log(layer)
    },
    //通过风强渡判断预警等级
    checkpic(wind,time){//wind 风力  time  1表示当前 2 表示前一时刻
      var color = null
      var src = null
      var twind =null
      if(wind<1)
      {
        color = "white"
        // twind = "风力小于6级"
      }

      else if(wind==1){
        color = "blue"
        // twind = "热带低压"
      }

      else if(wind==2){
        color = 'yellow'
        //  twind = '热带风暴'
      }

      else if(wind==3){
        color = 'orange'
        // twind = '强热带风暴'
      }

      else if(wind>=4){
        color = 'red'

      }
      src = color+".png"
      return color

    },
    checkTWind(wind){
      var twind =null
      if(wind<1)
      {
        // color = "white"
        twind = "风力小于6级"
      }

      else if(wind==1){
        // color = "blue"
        twind = "热带低压"
      }

      else if(wind==2){
        //  color = 'yellow'
        twind = '热带风暴'
      }

      else if(wind==3){
        // color = 'orange'
        twind = '强热带风暴'
      }

      else if(wind == 4)
        twind = '台风'
      else if(wind == 5)
        twind ='强台风'
      else if(wind == 6)
        twind = '超强台风'


      return twind
    },
    // 绘制连线
    addLine(point1,point2) {
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
      var zoom = this.map.getView().getZoom()
      this.wind.forEach((w,i)=>{
        // var feature = this.creatWindFeature(this.wind[i])
        this.map.removeLayer(this.creatWindFeature(this.wind[i]))
        var feature = this.creatWindFeature(this.wind[i])

        // if(i == 0){
        // if(i != 0){
        var color = this.checkpic(w.wind,1)
        feature.setStyle(
          new Style({
              image: new Icon({
                // src: require("@/assets/img/windblue.png"),
                src: require('@/assets/typhoon/'+color+'.png'),
                scale: (0.11*zoom)<0.55 ? (0.1*zoom):(0.14*zoom),
              }),
              text: new Text({
                text: (lenth-i).toString(),
                fill: new Fill({
                  color: "#FFF",
                }),
                font: "12px Calibri,sans-serif",
                stroke: new Stroke({
                  color: "red",
                  width: 5,
                }),
              }),
            }
          ));
        // }
        if( i != 0)
          this.addLine(fromLonLat([wind[i].lng,wind[i].lat]),fromLonLat([wind[i-1].lng,wind[i-1].lat]))
        this.addWindToMap(feature)
      })
    },
    focusonpoint(zoom,center){
      this.map.getView().setZoom(zoom)
      this.map.getView().setCenter(fromLonLat(center))
    },
    createhongwaiLayer(){
      // var url= "@/assets/layers/xuegai.png"
      var url=`/maps/img/indexshow/2022012521_IR.png`
      // console.log(url)

      const extent =[40,-60, 135, 30.1]
      // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        // code: 'EPSG:4326',
        code: 'EPSG:3857',
        units: 'degrees',
        extent: transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.hongwailayer = new ImageLayer({
        source: new ImageStatic({
          url: url,//地址
          projection: projection,
          imageExtent:  transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        }),
        visible: false,

      })
      this.map.addLayer(this.hongwailayer)
      // this.focusonpoint(6,[(extent[0]+extent[2])/2,(extent[1]+extent[3])/2])
      // console.log(222)
    },
    createSnowDetectionLayer(){
      // var url= "@/assets/layers/xuegai.png"
      var url=`/maps/img/indexshow/aa1.png`
      // console.log(url)

      const extent =[72.583875,26.644031,  95.365151, 35.788881]
      // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        // code: 'EPSG:4326',
        code: 'EPSG:3857',
        units: 'degrees',
        extent: transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.xuegailayer = new ImageLayer({
        source: new ImageStatic({
          url: url,//地址
          projection: projection,
          imageExtent:  transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        }),
        visible: false,
      })
      this.map.addLayer(this.xuegailayer)
      // this.focusonpoint(6,fromLonLat([(extent[0]+extent[2])/2,(extent[1]+extent[3])/2]))
      // console.log(222)
    },
    createSnowDeepLayer(){
      // var url= "@/assets/layers/xuegai.png"
      var url=`/maps/img/indexshow/snowdeep.png`
      // console.log(url)

      const extent =[72.583875,26.644031,  95.365151, 35.788881]
      // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        // code: 'EPSG:4326',
        code: 'EPSG:3857',
        units: 'degrees',
        extent: transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.xueshenlayer = new ImageLayer({
        source: new ImageStatic({
          url: url,//地址
          projection: projection,
          imageExtent:  transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        }),
        visible: false,
      })
      var imgurl = `/maps/img/indexshow/toolbar.png`
      var toolbarextent = [72.583875,23,95.365151,25.5]

      this.snowdeeptoolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: transformExtent(toolbarextent, 'EPSG:4326', 'EPSG:3857')
        }),
        visible: false,
      })
      this.map.addLayer(this.xueshenlayer)
      this.map.addLayer(this.snowdeeptoolbar)
      // this.focusonpoint(6,fromLonLat([(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2]))
      // console.log(222)
    },
    checkLayer(layer){
      if(layer == null || layer == [])
        layer = null
      else{
        this.map.removeLayer(layer);
        this.addlayer = null
      }
    },
    checkocculays(i){
      switch(i){
        case 0: this.hongwailayer.setVisible(true) ;break;
        case 1: this.xuegailayer.setVisible(true);break;
        case 2: this.xueshenlayer.setVisible(true);this.snowdeeptoolbar.setVisible(true);break;
      }
    },
    checkdisplays(i){
      switch(i){
        case 0: this.hongwailayer.setVisible(false) ;break;
        case 1: this.xuegailayer.setVisible(false);break;
        case 2: this.xueshenlayer.setVisible(false);this.snowdeeptoolbar.setVisible(false);break;
      }
    },
    /*
    checkocculays(i){
  switch(i){
    case 0: this.createhongwaiLayer();break;
    case 1: this.createSnowDetectionLayer();break;
    case 2: this.createSnowDetectionLayer();break;
  }
},
checkdisplays(i){
  switch(i){
    case 0: this.checkLayer(this.hongwailayer);break;
    case 1: this.checkLayer(this.xuegailayer);break;
    case 2: this.checkLayer(this.xuegailayer);break;
  }
}
*/

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
  /* position: absolute;
  top:60px;

  left: 260px; */
}
#popup {
  background-color:rgb(121, 182, 252) ;
  /* filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2)); */
  /* padding: 4px; */
  /* padding: 0; */
  /* border-color: rgb(14, 218, 123); */
  border-radius: 5px;
  border: 1px solid rgb(45, 31, 248);
  top: 0;
  left: 0;
  width:150px;
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
  width:150px;
}
.ftype{
  position:absolute;
  /* position: relative; */
  z-index:998;
  top:90px;
  /* left: 300px; */
}
.fmood{
  position:absolute;
  /* position: relative; */
  z-index:998;
  top:90px;
  right: 15px;
  /* left: 300px; */
}

.opacity { /*遮罩浑浊处理*/
  opacity: 0.3;
  filter: alpha(opacity=30);
  background-color: #000;
}

.box {
  /* overflow: hidden; */
  position: absolute;
  width: 1000px;
  height: 500px;
  z-index: 1000; /*值越大，和其他层层叠时越在上面*/
  left: 25%;
  top: 15%;
  background-color: #fff;
  /* border: 1px solid rgb(0, 153, 153); */
}

.dialogtitle {
  width: 100%;
  height: 44px;
  line-height: 30px;
  position: absolute;
  font-size: 18px;
  top: 0px;
  background: white ! important ;
}

.dialogcontent {
  padding-top: 45px;
  /* OVERFLOW: scroll; */
  height: calc(100% - 20px);
  height: -webkit-calc(100% - 20px);
  background: white;
  padding-left: 15px;
}

.logcontent {
  padding: 10px;
}
.windpopup {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6) ;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  /* border: 1px solid #cccccc; */
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.windpopup:after,
.windpopup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.windpopup:after {
  border-top-color: rgba(255, 255, 255, 0.5);
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.windpopup:before {
  border-top-color:  rgba(255, 255, 255, 0.5);
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

</style>
