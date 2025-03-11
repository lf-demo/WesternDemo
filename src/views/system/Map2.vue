<template>
  <div id="content">
    <div id="map" ref="rootMap" class="map"></div>
    <selectcard class="selececaard"></selectcard>
    <windcard id="windpopup" class="windpopup" :pointDate = "pointDate" :pointLon = "pointLon" :pointLat = "pointLat" :probability = "probability" :windScale = "windScale"></windcard>
    <!-- <windcard id="windpopup" class="windpopup" :pointLon = "pointLon" :date = "date" :pointLat = "pointLat" :wind = "rwind"></windcard> -->
    <sidemenu :currentZoom = "currentZoom" :pointLonLat = "pointLonLat"></sidemenu>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View, Feature, Overlay,Graticule } from 'ol'
// import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from 'ol/source/XYZ'
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import { Tile as TileLayer, Vector as VectorLayer,Image  as ImageLayer } from "ol/layer";
import {Vector as VectorSource,ImageStatic } from "ol/source";
import { fromLonLat, transform,Projection } from 'ol/proj'
// import {Graticule} from 'ol/Graticule'
import Point from "ol/geom/Point";
import { Icon, Style ,Circle as CircleStyle,Stroke, Fill , Text} from "ol/style";
import {Select} from 'ol/interaction'
// import {condition} from 'ol/events'
import Selectcard from '@/components/map2/selectcard'
import windcard from '@/components/map2/windcard'
import sidemenu from '@/components/map2/sidemenu'
import { Polygon } from 'ol/geom';
// import Selectcard from '@/components/map2/selectcard.vue';

export default {
    name:'Map2',
  data() {
    return {
      map: null,
      // mapUrltitle:`maps/overlay/{z}/{x}/{y}.png`,
      addlayer:null,
      overlayWindInfo:null,
      IMAGERLorticityLaye:null,
      IMAGERWindShearLayer:null,
      IMAGERWindShearTrendLayer:null,
      IMAGERPrecipitationEstimationLayer:null,
      SOUNDERLayeredHumidity100mbLayer:null,
      SOUNDERLayeredHumidity200mbLayer:null,
      SOUNDERaridityIndexLayer:null,
      SOUNDEPotentialHeight100mbLayer:null,
      SOUNDEPotentialHeight200mbLayer:null,  
      TyphoonLayer:null,
      SnowDetectionLayer:null,
      SnowDeepLayer:null,
      SnowDeep500mLayer:null,
      pointLayer:null,//:null,
      currentZoom:5,
      pointLonLat:null,
      points:[],
      currentCenter:[85.4216, 19.946],
      mapstate : true,
      gridstate:true,
      grid:null,
      winds:[
        {
        id:1,
        date:"2022-01-24",
        lon:39.258,
        lat:-9.187,
        maxlon:47.846,
        maxlat:-1.499,
        minlon:31.102,
        minlat:-18.400,
        probability:0.99,
        windscale:3
      },{
        id:2,
        date:"2022-01-25",
        lon:115.316,
        lat:-14.133,
        maxlon:124.597,
        maxlat:-9.006,
        minlon:108.761,
        minlat:-21.240,
        probability:0.57,
        windscale:2
      },{
        id:3,
        date:"2022-01-27",
        lon:82.028,
        lat:-14.884,
        maxlon:85.200,
        maxlat:-10.530,
        minlon:69.619,
        minlat:-22.379,
        probability:0.97,
        windscale:2
      },{
        id:4,
        date:"2022-01-28",
        lon:80.019,
        lat:-17.695,
        maxlon:89.063,
        maxlat:-11.655,
        minlon:70.179,
        minlat:-22.084,
        probability:0.92,
        windscale:2
      },{
        id:5,
        date:"2022-01-29",
        lon:68.402,
        lat:-18.332,
        maxlon:75.625,
        maxlat:-10.885,
        minlon:60.371,
        minlat:-23.851,
        probability:0.98,
        windscale:2
      },{
        id:6,
        date:"2022-01-30",
        lon:65.909,
        lat:-16.769,
        maxlon:74.691,
        maxlat:-11.678,
        minlon:59.674,
        minlat:-22.118,
        probability:0.99,
        windscale:2
      },{
        id:7,
        date:"2022-01-31",
        lon:63.847,
        lat:-16.469,
        maxlon:71.722,
        maxlat:-11.661,
        minlon:55.659,
        minlat:-23.567,
        probability:1,
        windscale:3
      },{
        id:8,
        date:"2022-02-01",
        lon:59.269,
        lat:-16.469,
        maxlon:67.725,
        maxlat:-12.189,
        minlon:50.397,
        minlat:-22.833,
        probability:0.99,
        windscale:3
      },{
        id:9,
        date:"2022-02-02",
        lon:57.750,
        lat:-17.024,
        maxlon:64.889,
        maxlat:-11.184,
        minlon:49.313,
        minlat:-22.995,
        probability:0.99,
        windscale:2
      },{
        id:10,
        date:"2022-02-03",
        lon:54.572,
        lat:-17.688,
        maxlon:64.384,
        maxlat:-9.838,
        minlon:46.314,
        minlat:-24.801,
        probability:0.53,
        windscale:1
      },{
        id:11,
        date:"2022-02-13",
        lon:58.395,
        lat:-16.055,
        maxlon:67.749,
        maxlat:-10.756,
        minlon:51.026,
        minlat:-24.168,
        probability:0.99,
        windscale:2
      },{
        id:12,
        date:"2022-02-14",
        lon:56.818,
        lat:-16.278,
        maxlon:65.444,
        maxlat:-11.944,
        minlon:49.500,
        minlat:-22.492,
        probability:0.99,
        windscale:2
      },{
        id:13,
        date:"2022-02-16",
        lon:69.118,
        lat:-16.302,
        maxlon:77.003,
        maxlat:-10.202,
        minlon:60.421,
        minlat:-22.078,
        probability:0.64,
        windscale:2
      },{
        id:14,
        date:"2022-02-17",
        lon:65.248,
        lat:-13.781,
        maxlon:74.348,
        maxlat:-8.331,
        minlon:54.104,
        minlat:-23.236,
        probability:1.000,
        windscale:4
      },{
        id:15,
        date:"2022-02-18",
        lon:61.605,
        lat:-13.728,
        maxlon:69.023,
        maxlat:-5.849,
        minlon:51.695,
        minlat:-21.100,
        probability:0.94,
        windscale:3
      },{
        id:16,
        date:"2022-02-19",
        lon:56.929,
        lat:-16.662,
        maxlon:64.168,
        maxlat:-9.506,
        minlon:47.401,
        minlat:-24.350,
        probability:0.97,
        windscale:2
      },{
        id:17,
        date:"2022-02-24",
        lon:126.194,
        lat:-12.582,
        maxlon:132.434,
        maxlat:-8.037,
        minlon:118.335,
        minlat:-18.132,
        probability:0.5,
        windscale:3
      },{
        id:18,
        date:"2022-02-28",
        lon:86.590,
        lat:-12.965,
        maxlon:92.345,
        maxlat:-6.947,
        minlon:79.082,
        minlat:-20.210,
        probability:0.5,
        windscale:3
      },{
        id:19,
        date:"2022-03-01",
        lon:84.531,
        lat:-17.850,
        maxlon:98.556,
        maxlat:-12.924,
        minlon:77.779,
        minlat:-25.993,
        probability:1,
        windscale:3
      },{
        id:21,
        date:"2022-03-08",
        lon:46.169,
        lat:-14.823,
        maxlon:54.797,
        maxlat:-10.625,
        minlon:39.782,
        minlat:-20.875,
        probability:0.87,
        windscale:3,
      },{
        id:22,
        date:"2022-03-09",
        lon:44.390,
        lat:-14.044,
        maxlon:51.315,
        maxlat:-9.737,
        minlon:38.990,
        minlat:-20.142,
        probability:0.95,
        windscale:2,
      },{
        id:23,
        date:"2022-03-14",
        lon:101.568,
        lat:-16.732,
        maxlon:111.157,
        maxlat:-9.776,
        minlon:92.076,
        minlat:-22.226,
        probability:0.84,
        windscale:3,
      },{
        id:24,
        date:"2022-03-22",
        lon:108.575,
        lat:-17.469,
        maxlon:120.463,
        maxlat:-12.910,
        minlon:99.564,
        minlat:-24.906,
        probability:0.96,
        windscale:3,
      },{
        id:25,
        date:"2022-03-25",
        lon:73.582,
        lat:-13.033,
        maxlon:82.409,
        maxlat:-5.894,
        minlon:64.269,
        minlat:-21.081,
        probability:0.94,
        windscale:3,
      },{
        id:26,
        date:"2022-04-24",
        lon:101.094,
        lat:-10.565,
        maxlon:108.742,
        maxlat:-6.725,
        minlon:95.115,
        minlat:-17.579,
        probability:0.98,
        windscale:2,
      },{
        id:27,
        date:"2022-04-25",
        lon:103.462,
        lat:-14.572,
        maxlon:113.164,
        maxlat:-10.843,
        minlon:96.258,
        minlat:-22.457,
        probability:0.79,
        windscale:3,
      },{
        id:27,
        date:"2022-04-28",
        lon:108.747,
        lat:-14.710,
        maxlon:120.473,
        maxlat:-10.463,
        minlon:104.088,
        minlat:-22.253,
        probability:0.96,
        windscale:4,
      },{
        id:28,
        date:"2022-05-08",
        lon:90.735,
        lat:-10.775,
        maxlon:99.198,
        maxlat:-5.460,
        minlon:80.514,
        minlat:-20.464,
        probability:0.99,
        windscale:2,
      },{
        id:29,
        date:"2022-10-08",
        lon:85.030,
        lat:-13.536,
        maxlon:94.030,
        maxlat:-6.029,
        minlon:75.301,
        minlat:-20.470,
        probability:0.99,
        windscale:2,
      },{
        id:30,
        date:"2022-11-03",
        lon:93.143,
        lat:-7.734,
        maxlon:101.028,
        maxlat:-2.347,
        minlon:83.051,
        minlat:-15.717,
        probability:0.99,
        windscale:2,
      },{
        id:31,
        date:"2022-11-03",
        lon:93.143,
        lat:-7.734,
        maxlon:101.028,
        maxlat:-2.347,
        minlon:83.051,
        minlat:-15.717,
        probability:0.99,
        windscale:2,
      },{
        id:32,
        date:"2022-12-18",
        lon:98.987,
        lat:-12.170,
        maxlon:109.371,
        maxlat:-6.848,
        minlon:90.550,
        minlat:-19.179,
        probability:0.99,
        windscale:2,
      },{
        id:33,
        date:"2022-12-19",
        lon:99.247,
        lat:-12.559,
        maxlon:109.501,
        maxlat:-6.978,
        minlon:90.810,
        minlat:-20.607,
        probability:1,
        windscale:2,
      },{
        id:34,
        date:"2022-12-20",
        lon:98.867,
        lat:-13.961,
        maxlon:109.932,
        maxlat:-8.997,
        minlon:90.430,
        minlat:-21.425,
        probability:0.96,
        windscale:3,
      },{
        id:35,
        date:"2022-12-25",
        lon:92.063,
        lat:-15.9,
        maxlon:109.501,
        maxlat:-6.978,
        minlon:80.004,
        minlat:-26.142,
        probability:0.82,
        windscale:2,
      }],
      pointDate:null,
      pointLon:null,
      pointLat:null,
      probability:null,
      windScale:null,
      layers1:null
    };
  },
  components: {
    Selectcard,
    windcard,
    sidemenu,
  },
  methods: {
    initMap(){
        this.layers1 = [
          new TileLayer({
            source: new TileWMS({
              url: "http://localhost:8088/geoserver/platform/wms",
              // url: "geoserver/platform/wms",
              // Layers需要指定要显示的图层名
              params: { LAYERS: "platform:world", TILED: true },
              // serverType明显为geoserver
              serverType: "geoserver",
              // Countries have transparency, so do not fade tiles:
              transition: 0
            }),
            visible: true,
          })
        ]
        // console.log(11)
      //  console.log(12221)
      var  map1 = new Map({
        // layers: [layers1,tileLayer],
        // layers: [layers1,imglayer],
        layers: this.layers1,
        // layers: this.layers1,
        target: "map",
        view: new View({
            projection: "EPSG:4326",
            center: [85.4216, 19.946], // 地图中心点
            zoom: 5, // 初始缩放级别
            minZoom: 1, // 最小缩放级别
            maxZoom:19 ,// 最大缩放级别
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
      // console.log(1)
      this.map = map1
    },
    clearmap(){

      // if(this.layers1!=null){
        if(this.layers1[0].getVisible()){
          this.layers1[0].setVisible(false)
          // console.log(this.layers1[0].getVisible())
        }else{
          this.layers1[0].setVisible(true)
        }

      // }
        // this.map.removeLayer(this.layers1)  
        // console.log(1)
        // console.log(this.layers1.getVisible)
   
    },
    init() {
      
      // this.initMap()
      // this.clearmap()
        this.layers1 = [
          new TileLayer({
            source: new TileWMS({
              url: "http://localhost:8088/geoserver/platform/wms",
              // url: "geoserver/geoserver/platform/wms",
              // Layers需要指定要显示的图层名
              params: { LAYERS: "platform:world", TILED: true },
              // serverType明显为geoserver
              serverType: "geoserver",
              // Countries have transparency, so do not fade tiles:
              transition: 0, 
            }),
           visible: true,
           zIndex:110
          })
        ]
      // const tileLayer = new TileLayer({
      //   source: new XYZ({
      //     url: this.mapUrltitle
      //   })
      // })
        // console.log(11)
      //  console.log(12221)
      this.map = new Map({
        // layers: [layers1,tileLayer],
        // layers: [layers1,imglayer],
        layers: this.layers1,
        // layers: this.layers1,
        target: "map",
        view: new View({
            projection: "EPSG:4326",
            center: [85.4216, 19.946], // 地图中心点
            zoom: 5, // 初始缩放级别
            minZoom: 1, // 最小缩放级别
            maxZoom:15 ,// 最大缩放级别
            renderBuffer: 20, // 调整渲染缓冲区
        }), controls: defaultControls({
              zoom: false,
              rotate: false,
              attribution: false
            }).extend([
                new ScaleLine({
                  // bar: true,
                  text: true, 
                  minWidth:20,
                  //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
                  units: "metric",
                  // className: 'custom-scale-line',
                })
              ])
        
      })
    
      this.createOverlayWindInfo()
      // this.map.on('click', (e) => this.imgPointermove(e))
      this.map.on('pointermove', (e) => this.imgPointermove(e))

      this.map.on('click', (e) => this.mapClick(e))
      this.grids()
      // this.clearmap()
      // this.map.addLayer(tileLayer);   
    },
    checkLayer(layer){
      if(layer == null || layer == [])
        layer = null
      else{
        this.map.removeLayer(layer);
        this.addlayer = null
      }
    },
    initaddlayer(){
      this.map.getView().setMinZoom(3.6);
      this.checkLayer(this.IMAGERLorticityLaye)
      this.checkLayer(this.IMAGERWindShearLayer)
      this.checkLayer(this.IMAGERWindShearTrendLayer)
      this.checkLayer(this.IMAGERPrecipitationEstimationLayer)
      this.checkLayer(this.SOUNDERLayeredHumidity100mbLayer)
      this.checkLayer(this.SOUNDERLayeredHumidity200mbLayer)
      this.checkLayer(this.SOUNDERaridityIndexLayer)
      this.checkLayer(this.SOUNDEPotentialHeight100mbLayer)
      this.checkLayer(this.SOUNDEPotentialHeight200mbLayer)
      this.checkLayer(this.TyphoonLayer)
      this.checkLayer(this.SnowDetectionLayer)
      this.checkLayer(this.SnowDeepLayer)
      this.checkLayer(this.toolbar)
      this.checkLayer(this.imginfo)
      this.checkLayer(this.SnowDeep500mLayer)
      this.map.removeLayer(this.pointLayer);
      this.points.forEach((item) => {
        this.checkLayer(item)
        });
      this.points =[]
    },

    //200hpa相对涡量 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERLorticityLayer(day){

      this.initaddlayer()
      var url = null
      var id = day%31+1
      // url= `maps/img/IMAGER/200hpa相对涡量/`+id+`.png`
      url= `/maps/img/IMAGER/200hpa相对涡量/`+id+`.png`

      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/200hpa相对涡量/1.png`
      // }else{
      //   url = `maps/img/IMAGER/200hpa相对涡量/2.png`
      // }
      // console.log(url)
      
      const extent =[30.3, -40,129.7 ,39.6]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.IMAGERLorticityLaye = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })


      // console.log(this.addlayer)
      this.map.addLayer(this.IMAGERLorticityLaye)
      // const imgurl = `maps/img/IMAGER/200hpa相对涡量/toolbar.jpg`
      const imgurl = `/maps/img/IMAGER/200hpa相对涡量/toolbar.jpg`
      const toolbarextent = [132, -40,139 ,40]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
          this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6,[(extent[0]+toolbarextent[2])/2,(extent[1]+extent[3])/2])
      // this.map.addLayer(this.IMAGERLorticityLayer);
    },
    //风切变 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERWindShearLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%30+1
      //  url= `maps/img/IMAGER/风切变/`+id+`.png`
       url= `/maps/img/IMAGER/风切变/`+id+`.png`
      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/风切变/1.png`
      // }else{
      //   url = `maps/img/IMAGER/风切变/2.png`
      // }
      // console.log(url)
      
      const extent =[30.2, -40,129.92 ,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.IMAGERWindShearLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.IMAGERWindShearLayer);
            this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.8,[80,0])
    },
    //风切变趋势 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERWindShearTrendLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%30+1
      // url= `maps/img/IMAGER/风切变趋势/`+id+`.png`
      url= `/maps/img/IMAGER/风切变趋势/`+id+`.png`

      // console.log(url)
      
      const extent =[30.2, -40,129.93 ,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.IMAGERWindShearTrendLayer =  new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.IMAGERWindShearTrendLayer);
      const imgurl = `/maps/img/IMAGER/风切变趋势/toolbar.jpg`
      const toolbarextent = [132, -40,139 ,40]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
            this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6,[(extent[0]+toolbarextent[2])/2,(extent[1]+extent[3])/2])
    },
    //降水估计 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[40, -40,120 ,40]
    addIMAGERPrecipitationEstimationLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%30+1
      url= `/maps/img/IMAGER/降水估计/`+ id+ `.png`
      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/降水估计/1.png`
      // }else{
      //   url = `maps/img/IMAGER/降水估计/2.png`
      // }
      // console.log(url)
      
      const extent =[40, -40,120 ,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.IMAGERPrecipitationEstimationLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.IMAGERPrecipitationEstimationLayer);

      const imgurl = `/maps/img/IMAGER/降水估计/toolbar.jpg`
      const toolbarextent = [40, -47,120 ,-41]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
            this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])
    },
    //分层湿度100mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERLayeredHumidity100mbLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%20+1
      url= `/maps/img/SOUNDER/分层湿度100mb/`+ id+ `.png`
      // if(day%2 == 1){
      //    url= `maps/img/SOUNDER/分层湿度100mb/1.png`
      // }else{
      //   url = `maps/img/SOUNDER/分层湿度100mb/2.png`
      // }
      // console.log(url)
      
      const extent = [55,10,110,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      //  this.focusonpoint(3.8,[80,0])
      this.SOUNDERLayeredHumidity100mbLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SOUNDERLayeredHumidity100mbLayer);
      var toolbarextent = [55,4,110,9]
      var imgurl = `/maps/img/SOUNDER/分层湿度100mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
            source: new ImageStatic({
              url: imgurl,//地址
              projection: projection,
              imageExtent: toolbarextent
            })
          })
         this.map.addLayer(this.toolbar )
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])
    },    
    //分层湿度200mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERLayeredHumidity200mbLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%15+1
      url= `/maps/img/SOUNDER/分层湿度200mb/`+ id+ `.png`
      // console.log(url)
      
      const extent = [55,10,110,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SOUNDERLayeredHumidity200mbLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SOUNDERLayeredHumidity200mbLayer);
      var toolbarextent = [55,4,110,9]
      var imgurl = `/maps/img/SOUNDER/分层湿度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
            source: new ImageStatic({
              url: imgurl,//地址
              projection: projection,
              imageExtent: toolbarextent
            })
          })
         this.map.addLayer(this.toolbar )
              this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])

    },   
     //干燥指数 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERaridityIndexLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%17+1
      url= `/maps/img/SOUNDER/干燥指数/`+ id+ `.png`
      // console.log(url)
      
      const extent = [55,10,110,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SOUNDERaridityIndexLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SOUNDERaridityIndexLayer);
            var toolbarextent = [55,4,110,9]
      var imgurl = `/maps/img/SOUNDER/位势高度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
            source: new ImageStatic({
              url: imgurl,//地址
              projection: projection,
              imageExtent: toolbarextent
            })
          })
         this.map.addLayer(this.toolbar )
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])

    },
    //位势高度100mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDEPotentialHeight100mbLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%17+1
      url= `/maps/img/SOUNDER/位势高度100mb/`+ id+ `.png`
      // console.log(url)
      
      const extent = [55,10,110,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SOUNDEPotentialHeight100mbLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SOUNDEPotentialHeight100mbLayer)
      var toolbarextent = [55,4,110,9]
      var imgurl = `/maps/img/SOUNDER/位势高度100mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
            source: new ImageStatic({
              url: imgurl,//地址
              projection: projection,
              imageExtent: toolbarextent
            })
          })
         this.map.addLayer(this.toolbar )
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])

   
    },
    //位势高度200mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDEPotentialHeight200mbLayer(day){
      this.initaddlayer()
      var url = null
      var id = day%17+1
      url= `/maps/img/SOUNDER/位势高度200mb/`+ id+ `.png`
      // console.log(url)
      
      const extent = [55,10,110,40]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SOUNDEPotentialHeight200mbLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SOUNDEPotentialHeight200mbLayer)
      var toolbarextent = [55,4,110,9]
      var imgurl = `/maps/img/SOUNDER/位势高度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
            source: new ImageStatic({
              url: imgurl,//地址
              projection: projection,
              imageExtent: toolbarextent
            })
          })
         this.map.addLayer(this.toolbar )
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8,[(extent[0]+extent[2])/2,(toolbarextent[1]+extent[3])/2])

    },

    //雪盖监测 目前30张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    addSnowDetectionLayer(year,month,day,min){
      this.initaddlayer()
      // console.log(day) 
      var url = null
      // var strday = day<10 ? '0'+day : ''+ day
      // var strmonth = month<10 ? '0'+month : ''+ month
      var strday = day
      var strmonth = month
      if(month >= 9 && year == 2021 ){
        if(min < 12){
          url= "/maps/img/himalaya/2021_Himalaya_am/"+year+"_" + strmonth + "_" + strday + ".png"
        }else{
          url= "/maps/img/himalaya/2021_Himalaya_pm/"+year+"_" + strmonth + "_" + strday + ".png"
        }
      }
      else if(month<=8  && year == 2022){
          if(min < 12){
            url= "/maps/img/himalaya/2021_Himalaya_am/"+year+"_" + strmonth + "_" + strday + ".png"
          }else{
            url= "/maps/img/himalaya/2021_Himalaya_pm/"+year+"_" + strmonth + "_" + strday + ".png"
          }
      }  
      else{
          this.$message({
					message: '结果未上传',
					type: 'warning'
					// type: 'error'
					})
          return
      }
      // url=`maps/img/indexshow/aa1.png`

      
      // console.log(url)
      
    const extent =[72.583875,26.644031,  95.365151, 35.788881]
    // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SnowDetectionLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SnowDetectionLayer)
      this.map.getView().setMinZoom(6);

      this.focusonpoint(6,[(extent[0]+extent[2])/2,(extent[1]+extent[3])/2])

    },
    //  没做！！雪深测 目前30张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    addSnowDeepLayer(year,month,day){
      this.initaddlayer()
      var url = null
      var strday = day<10 ? '0'+day : ''+ day
      var strmonth = month<10 ? '0'+month : ''+ month
      if(year == 2021 && (month == 12 || month == 11|| month == 10|| month == 9))
        url= "/maps/img/snowdeep/" + year + "_" +month + "_" + day + ".png"
      else{
          this.$message({
					message: '结果未上传',
					type: 'warning'
					// type: 'error'
					})
      }
      
      
      // console.log(url)
      
      
    // const extent =[59.875000 , 14.875000,  140.125000, 55.125000]
    const extent =[72.583875,26.644031,  95.365151, 35.788881]
    // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SnowDeepLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SnowDeepLayer)
      this.map.getView().setMinZoom(4.5);

      this.focusonpoint(6.1,[(extent[0]+extent[2])/2,(extent[1]+extent[3])/2])

    },
    addSnowDeep500mLayer(year,month,day){
      this.initaddlayer()
      var url = null
      var strday = day<10 ? '0'+day : ''+ day
      var strmonth = month<10 ? '0'+month : ''+ month
      if(year == 2021 && month == 12 &&(day>=20 || dat<=31))
        url= "/maps/img/snowdeep500/" + year + "_" +month + "_" + day + ".npy.png"
      else{
          this.$message({
					message: '结果未上传',
					type: 'warning'
					// type: 'error'
					})
      }
      
      
      // console.log(url)
      
    const extent =[72.583875,26.644031,  95.365151, 35.788881]
    // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
      // 定义栅格数据的投影信息
      const projection = new Projection({
        code: 'EPSG:4326',
        // code: 'EPSG:3857',
        units: 'degrees',
        extent: extent
        // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
      });
      // var url = '@/assets/sortkinds/test.png'
      // console.log(url)
      this.SnowDeep500mLayer = new ImageLayer({
            source: new ImageStatic({
              url: url,//地址
              projection: projection,
              imageExtent: extent
            })
          })
      this.map.addLayer(this.SnowDeep500mLayer)
      this.map.getView().setMinZoom(6.1);

      this.focusonpoint(6.1,[(extent[0]+extent[2])/2,(extent[1]+extent[3])/2])

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
    creatTyphoonfeature(wind){
        var feature = new Feature({
          title: 'Typhoontest',
          id: 1,
          lon:wind.lon,
          lat:wind.lat,
          lnglat:[wind.lon,wind.lat],
          geometry: new Point([wind.lon,wind.lat]),
          // catagory:catagory,
          // typename:typeName,
          wind:1
      });
      return feature;
    },

    //添加隐藏图层 用来记录台风所示的范围 已经中心点#理论说应该有r半径范围 但是目前没有 只能先确定中心点
    addTyphoonfeatureLayer(wind){//(经度 维度)
       // 设置图层
      this.pointLayer = new VectorLayer({
          source: new VectorSource(),
      });
      const extent = [
        [wind.minlon, wind.minlat],
        [wind.maxlon, wind.minlat],
        [wind.maxlon, wind.maxlat],
        [wind.minlon, wind.maxlat],
      ];
      const polygon = new Polygon([extent]);
      // 创建feature，一个feature就是一个点坐标信息
      const feature =this.creatTyphoonfeature(wind)
      feature.setStyle(
        new Style({
              geometry: polygon,
              radius: 33,
              stroke: new Stroke({
                color: "rgba(24,144,255,0)",
                width: 0.1,
              }),
              fill: new Fill({
                color: "rgba(24,144,255,0)",
              }),
            }));
      this.pointLayer.getSource().addFeatures([feature]);
      // 添加图层
      this.map.addLayer(this.pointLayer);
    },
    findwind(year,month,day,checkwind){
      var id = day%6
      // var wind = (this.winds)[id]
        const date = year +'-'+ month+'-'+day


        this.map.removeLayer(this.pointLayer);
        this.pointDate = date
        this.pointLat = checkwind.lat
        this.pointLon = checkwind.lon
        this.probability = checkwind.probability
        // this.windScale =  checkwind.windscale
        this.windScale =  checkwind.windscale
        this.addTyphoonfeatureLayer(checkwind)
        // console.log(wind.lat)
        // console.log(wind.lon)
      

    },
    //台风识别 目前11张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    async addTyphoonLayer(year,month,day){
      this.initaddlayer()
      const date = year +'-'+ month+'-'+day
      var checkwind = null
      this.winds.forEach((wind)=>{
        if(wind.date == date) 
          checkwind = wind
      })
      // console.log(this.pointDate)
      // const strmonth = month<10 ? "0"+month : ""+month
      // const strday = day<10 ? "0"+day : ""+day
      
      if( checkwind == null){
        this.$message({
					message: '当天无台风或数据未上传',
					type: 'warning'
					// type: 'error'
					})
      }else{
        var url = '/maps/img/Typhon/'+year +month+day+"_IR.png"
        const extent =[30.0, -66.56, 135.0,  30.1]
      // const extent = [83.63764452794805, 25, 94.14344177572586, 25+4.91827620055438]
        // 定义栅格数据的投影信息
        const projection = new Projection({
          code: 'EPSG:4326',
          // code: 'EPSG:3857',
          units: 'degrees',
          extent: extent
          // extent: [83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
        });
        // var url = '@/assets/sortkinds/test.png'
        // console.log(url)
        this.TyphoonLayer = new ImageLayer({
              source: new ImageStatic({
                url: url,//地址
                projection: projection,
                imageExtent: extent
              })
            })
        this.map.addLayer(this.TyphoonLayer)
        this.findwind(year,month,day,checkwind)//把1当作占位符
        const imgurl1 = `/maps/img/Typhon/toolbar.jpg`
        const toolbarextent = [136, -66.56,145.0 ,30.1]
        this.toolbar = new ImageLayer({
          source: new ImageStatic({
            url: imgurl1,//地址
            projection: projection,
            imageExtent: toolbarextent
          })
        })
        this.map.addLayer(this.toolbar)
        this.map.getView().setMinZoom(3.3);
        this.focusonpoint(3.3,[(extent[0]+toolbarextent[2])/2,(extent[1]+extent[3])/2])
      }
    },
    recover(){
      this.map.getView().setZoom(1)
      this.map.getView().setCenter([85.4216, 19.946])
    },
    focusonpoint(zoom,center){
      this.map.getView().setZoom(zoom)
      this.map.getView().setCenter(center)
    },
    imgPointermove(e){
      const feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
      // console.log("featrue:",feature)
      // console.log("e.coordinate:",e.coordinate)
      if (feature && (feature.values_.wind != null && feature.values_.wind != undefined)) {
        // console.log("存在feature.values_.wind ")
        var latlng = feature.values_.lnglat
        // console.log(latlng)
      //   // console.log("geometry",feature.values_.latlng)
      //   this.rwind  = feature.values_.wind
      //   this.pointLat = this.checkLat(latlng[1].toFixed(2))
      //   this.pointLon = this.checkLon(latlng[0].toFixed(2))
      //   this.date = feature.values_.date
      //   // console.log(this.wind,feature.values_.wind)
      //   // console.log("1",this.pointLon,latlng[0].toFixed(2))
      //   // console.log("2",this.pointLat,latlng[0].toFixed(2))
      //   // console.log("2",latlng[1].toFixed(2),latlng[0].toFixed(2))
        this.overlayWindInfo.setPosition(latlng)
      }else{
        this.closeMapWindPopup()
      }
    },
    // // 关闭弹框
    closeMapWindPopup (){
      this.overlayWindInfo.setPosition(undefined)
    },

    addPoints(point){
      // if(point == null || (typeof point) != (typeof this.center)){
      if(point == null){
        // point =this.map.getView().getZoom()
        // console.log(22222)
        // console.log(typeof point)
        return null
      }
      var feature = new Feature({
          geometry: new Point(point),
          latlng:point,
        });
      feature.setStyle(
        new Style({
          image: new CircleStyle({
          radius: 4,
          stroke: new Stroke({
            // color: "blue",
            color:'red',
          }),
          fill: new Fill({
            // color: "rgba(24,144,255,100)",
            color:'red',
          }),
        }),
      }));
      const Source = new VectorSource({
          features: [feature],
      });
      var layer =new VectorLayer({
          source: Source,
      })
      this.points.push(layer);
      // console.log(this.points)
      this.map.addLayer(layer); 
      // console.log(22)
    },
    mapClick(e){
      // console.log('aaa')
      const lonlat = e.coordinate
      // console.log(e.coordinate)
      this.addPoints(lonlat)
      // this.currentCenter = lonlat
      this.pointLonLat = lonlat
      this.currentZoom = this.map.getView().getZoom()
      // console.log(this.pointLonLat)

    },
    movepoint(lon,lat,zoom){
      var center = [lon,lat]
      this.map.getView().setZoom(zoom)
      this.map.getView().setCenter(center)
      this.addPoints(center)
    },
    grids(){
      // var gra = new Graticule({
      //       // map: map, 
      //       strokeStyle: new Stroke({
      //           color: 'rgba(12, 12, 12, 0.8)',
      //           width: 0.6
      //       }),
      //       targetSize: 100
      //   });
      this.grid =new Graticule({
      // the style to use for the lines, optional.
      strokeStyle: new Stroke({
        color: 'white',
        // color: 'rgba(255,120,0,0.9)',
        width: 2,
        lineDash: [0.5, 4],
      }),
      showLabels: true,
      // wrapX: false,
      wrapX: true,
      visible: false,
      zIndex:111

    })  
      this.map.addLayer(this.grid)
    },
    checkgrid(){
      if(this.grid!=null){
        if(this.grid.getVisible()){
          this.grid.setVisible(false)
        }else{
          this.grid.setVisible(true)
        }
      }
    },
  },
  mounted() {
    this.init();
    // this.addTyphoonLayer(1,e)
    // this.addIMAGERWindShearLayer()
    // this.addlayer= this.addIMAGERWindShearTrendLayer(1)
    // this.map.addLayer(this.addlayer)
    // this.map.render()
    // // this.addlayer.setPosition(undefined)
    // this.map.removeLayer(this.addlayer);
    // this.addlayer= this.addIMAGERPrecipitationEstimationLayer(1)
    // this.map.addLayer(this.addlayer)
    // this.map.getView().setZoom(3.8)
    // this.map.getView().setCenter([90,160])
    // this.addSOUNDERLayeredHumidity100mbLayer(1)
    // this.addSOUNDEPotentialHeight200mbLayer(5)
  },

};
</script>

<style scoped>
.map {
  height: 100%;
  background-color: black;
}
#content{
  width: 100%;
  height: 100%;
}
.selececaard{
  /* position:fixed; */
  position:absolute;
  /* position: relative; */
  z-index:998; 
  top:95px;
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
    border-top-color: rgba(255, 255, 255, 0.4);
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.windpopup:before {
    border-top-color:  rgba(255, 255, 255, 0.4);
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
} 
.ol-scale-line-text {
  font-size: 12px;
  color: #333;
  -webkit-font-smoothing: antialiased;
}

.ol-scale-line {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
}

.ol-scale-line-inner {
  font-size: 12px;
  color: #333;
}

.ol-scale-line-bar {
  background-color: #999;
  height: 4px;
}

.ol-scale-line-text {
  font-weight: bold;
}
</style>