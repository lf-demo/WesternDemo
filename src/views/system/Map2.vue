<template>
  <div id="content">
    <div id="map" ref="rootMap" class="map"></div>
    <selectcard class="selececaard"></selectcard>
    <windcard id="windpopup" class="windpopup" :pointDate="pointDate" :pointLon="pointLon" :pointLat="pointLat"
              :probability="probability" :windScale="windScale"></windcard>
    <!-- <windcard id="windpopup" class="windpopup" :pointLon = "pointLon" :date = "date" :pointLat = "pointLat" :wind = "rwind"></windcard> -->
    <sidemenu :currentZoom="currentZoom" :pointLonLat="pointLonLat"></sidemenu>
  </div>
</template>

<script>
import "ol/ol.css";
import {Map, View, Feature, Overlay, Graticule} from 'ol'
// import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from 'ol/source/XYZ'
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import {Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer} from "ol/layer";
import {Vector as VectorSource, ImageStatic} from "ol/source";
import {fromLonLat, transform, Projection} from 'ol/proj'
// import {Graticule} from 'ol/Graticule'
import Point from "ol/geom/Point";
import {Icon, Style, Circle as CircleStyle, Stroke, Fill, Text} from "ol/style";
import {Select} from 'ol/interaction'
// import {condition} from 'ol/events'
import Selectcard from '@/components/map2/selectcard'
import windcard from '@/components/map2/windcard'
import sidemenu from '@/components/map2/sidemenu'
import {Polygon} from 'ol/geom';
// import Selectcard from '@/components/map2/selectcard.vue';

export default {
  name: 'Map2',
  data() {
    return {
      map: null,
      // mapUrltitle:`maps/overlay/{z}/{x}/{y}.png`,
      addlayer: null,
      overlayWindInfo: null,
      IMAGERLorticityLaye: null,
      IMAGERWindShearLayer: null,
      IMAGERWindShearTrendLayer: null,
      IMAGERPrecipitationEstimationLayer: null,
      SOUNDERLayeredHumidity100mbLayer: null,
      SOUNDERLayeredHumidity200mbLayer: null,
      SOUNDERaridityIndexLayer: null,
      SOUNDEPotentialHeight100mbLayer: null,
      SOUNDEPotentialHeight200mbLayer: null,
      TyphoonLayer: null,
      SnowDetectionLayer: null,
      SnowDeepLayer: null,
      SnowDeep500mLayer: null,
      pointLayer: null,//:null,
      currentZoom: 5,
      pointLonLat: null,
      points: [],
      currentCenter: [85.4216, 19.946],
      mapstate: true,
      gridstate: true,
      grid: null,
      winds: [],
      pointDate: null,
      pointLon: null,
      pointLat: null,
      probability: null,
      windScale: null,
      layers1: null
    };
  },
  components: {
    Selectcard,
    windcard,
    sidemenu,
  },
  methods: {
    initMap() {
      this.layers1 = [
        new TileLayer({
          source: new TileWMS({
            url: "http://localhost:8088/geoserver/platform/wms",
            // url: "geoserver/platform/wms",
            // Layers需要指定要显示的图层名
            params: {LAYERS: "platform:world", TILED: true},
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
      var map1 = new Map({
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
          maxZoom: 19,// 最大缩放级别
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
    clearmap() {

      // if(this.layers1!=null){
      if (this.layers1[0].getVisible()) {
        this.layers1[0].setVisible(false)
        // console.log(this.layers1[0].getVisible())
      } else {
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
            params: {LAYERS: "platform:world", TILED: true},
            // serverType明显为geoserver
            serverType: "geoserver",
            // Countries have transparency, so do not fade tiles:
            transition: 0,
          }),
          visible: true,
          zIndex: 110
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
          maxZoom: 15,// 最大缩放级别
          renderBuffer: 20, // 调整渲染缓冲区
        }), controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false
        }).extend([
          new ScaleLine({
            // bar: true,
            text: true,
            minWidth: 20,
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
    checkLayer(layer) {
      if (layer == null || layer == [])
        layer = null
      else {
        this.map.removeLayer(layer);
        this.addlayer = null
      }
    },
    initaddlayer() {
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
      this.points = []
    },

    //200hpa相对涡量 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERLorticityLayer(day) {

      this.initaddlayer()
      var url = null
      var id = day % 31 + 1
      // url= `maps/img/IMAGER/200hpa相对涡量/`+id+`.png`
      url = `/maps/img/IMAGER/200hpa相对涡量/` + id + `.png`

      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/200hpa相对涡量/1.png`
      // }else{
      //   url = `maps/img/IMAGER/200hpa相对涡量/2.png`
      // }
      // console.log(url)

      const extent = [30.3, -40, 129.7, 39.6]
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
      const toolbarextent = [132, -40, 139, 40]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6, [(extent[0] + toolbarextent[2]) / 2, (extent[1] + extent[3]) / 2])
      // this.map.addLayer(this.IMAGERLorticityLayer);
    },
    //风切变 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERWindShearLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 30 + 1
      //  url= `maps/img/IMAGER/风切变/`+id+`.png`
      url = `/maps/img/IMAGER/风切变/` + id + `.png`
      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/风切变/1.png`
      // }else{
      //   url = `maps/img/IMAGER/风切变/2.png`
      // }
      // console.log(url)

      const extent = [30.2, -40, 129.92, 40]
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

      this.focusonpoint(3.8, [80, 0])
    },
    //风切变趋势 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[30, -40,129.7 ,40]
    addIMAGERWindShearTrendLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 30 + 1
      // url= `maps/img/IMAGER/风切变趋势/`+id+`.png`
      url = `/maps/img/IMAGER/风切变趋势/` + id + `.png`

      // console.log(url)

      const extent = [30.2, -40, 129.93, 40]
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
      this.IMAGERWindShearTrendLayer = new ImageLayer({
        source: new ImageStatic({
          url: url,//地址
          projection: projection,
          imageExtent: extent
        })
      })
      this.map.addLayer(this.IMAGERWindShearTrendLayer);
      const imgurl = `/maps/img/IMAGER/风切变趋势/toolbar.jpg`
      const toolbarextent = [132, -40, 139, 40]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6, [(extent[0] + toolbarextent[2]) / 2, (extent[1] + extent[3]) / 2])
    },
    //降水估计 目前只有两张图 通过day来判断 如果奇数为1反之为2 EXTENT =[40, -40,120 ,40]
    addIMAGERPrecipitationEstimationLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 30 + 1
      url = `/maps/img/IMAGER/降水估计/` + id + `.png`
      // if(day%2 == 1){
      //    url= `maps/img/IMAGER/降水估计/1.png`
      // }else{
      //   url = `maps/img/IMAGER/降水估计/2.png`
      // }
      // console.log(url)

      const extent = [40, -40, 120, 40]
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
      const toolbarextent = [40, -47, 120, -41]
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(3.6);

      this.focusonpoint(3.6, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])
    },
    //分层湿度100mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERLayeredHumidity100mbLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 20 + 1
      url = `/maps/img/SOUNDER/分层湿度100mb/` + id + `.png`
      // if(day%2 == 1){
      //    url= `maps/img/SOUNDER/分层湿度100mb/1.png`
      // }else{
      //   url = `maps/img/SOUNDER/分层湿度100mb/2.png`
      // }
      // console.log(url)

      const extent = [55, 10, 110, 40]
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
      var toolbarextent = [55, 4, 110, 9]
      var imgurl = `/maps/img/SOUNDER/分层湿度100mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])
    },
    //分层湿度200mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERLayeredHumidity200mbLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 15 + 1
      url = `/maps/img/SOUNDER/分层湿度200mb/` + id + `.png`
      // console.log(url)

      const extent = [55, 10, 110, 40]
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
      var toolbarextent = [55, 4, 110, 9]
      var imgurl = `/maps/img/SOUNDER/分层湿度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])

    },
    //干燥指数 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDERaridityIndexLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 17 + 1
      url = `/maps/img/SOUNDER/干燥指数/` + id + `.png`
      // console.log(url)

      const extent = [55, 10, 110, 40]
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
      var toolbarextent = [55, 4, 110, 9]
      var imgurl = `/maps/img/SOUNDER/位势高度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])

    },
    //位势高度100mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDEPotentialHeight100mbLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 17 + 1
      url = `/maps/img/SOUNDER/位势高度100mb/` + id + `.png`
      // console.log(url)

      const extent = [55, 10, 110, 40]
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
      var toolbarextent = [55, 4, 110, 9]
      var imgurl = `/maps/img/SOUNDER/位势高度100mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])


    },
    //位势高度200mb 目前只有两张图 通过day来判断 如果奇数为1反之为2 extend=[55,10,110,40]
    addSOUNDEPotentialHeight200mbLayer(day) {
      this.initaddlayer()
      var url = null
      var id = day % 17 + 1
      url = `/maps/img/SOUNDER/位势高度200mb/` + id + `.png`
      // console.log(url)

      const extent = [55, 10, 110, 40]
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
      var toolbarextent = [55, 4, 110, 9]
      var imgurl = `/maps/img/SOUNDER/位势高度200mb/toolbar.jpg`
      this.toolbar = new ImageLayer({
        source: new ImageStatic({
          url: imgurl,//地址
          projection: projection,
          imageExtent: toolbarextent
        })
      })
      this.map.addLayer(this.toolbar)
      this.map.getView().setMinZoom(4.8);

      this.focusonpoint(4.8, [(extent[0] + extent[2]) / 2, (toolbarextent[1] + extent[3]) / 2])

    },

    //雪盖监测 目前30张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    addSnowDetectionLayer(year, month, day, min) {
      this.initaddlayer()
      // console.log(day)
      var url = null
      // var strday = day<10 ? '0'+day : ''+ day
      // var strmonth = month<10 ? '0'+month : ''+ month
      var strday = day
      var strmonth = month
      if (month >= 9 && year == 2021) {
        if (min < 12) {
          url = "/maps/img/himalaya/2021_Himalaya_am/" + year + "_" + strmonth + "_" + strday + ".png"
        } else {
          url = "/maps/img/himalaya/2021_Himalaya_pm/" + year + "_" + strmonth + "_" + strday + ".png"
        }
      } else if (month <= 8 && year == 2022) {
        if (min < 12) {
          url = "/maps/img/himalaya/2021_Himalaya_am/" + year + "_" + strmonth + "_" + strday + ".png"
        } else {
          url = "/maps/img/himalaya/2021_Himalaya_pm/" + year + "_" + strmonth + "_" + strday + ".png"
        }
      } else {
        this.$message({
          message: '结果未上传',
          type: 'warning'
          // type: 'error'
        })
        return
      }
      // url=`maps/img/indexshow/aa1.png`


      // console.log(url)

      const extent = [72.583875, 26.644031, 95.365151, 35.788881]
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

      this.focusonpoint(6, [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2])

    },
    //  没做！！雪深测 目前30张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    addSnowDeepLayer(year, month, day) {
      this.initaddlayer()
      var url = null
      var strday = day < 10 ? '0' + day : '' + day
      var strmonth = month < 10 ? '0' + month : '' + month
      if (year == 2021 && (month == 12 || month == 11 || month == 10 || month == 9))
        url = "/maps/img/snowdeep/" + year + "_" + month + "_" + day + ".png"
      else {
        this.$message({
          message: '结果未上传',
          type: 'warning'
          // type: 'error'
        })
      }


      // console.log(url)


      // const extent =[59.875000 , 14.875000,  140.125000, 55.125000]
      const extent = [72.583875, 26.644031, 95.365151, 35.788881]
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

      this.focusonpoint(6.1, [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2])

    },
    addSnowDeep500mLayer(year, month, day) {
      this.initaddlayer()
      var url = null
      var strday = day < 10 ? '0' + day : '' + day
      var strmonth = month < 10 ? '0' + month : '' + month
      if (year == 2021 && month == 12 && (day >= 20 || dat <= 31))
        url = "/maps/img/snowdeep500/" + year + "_" + month + "_" + day + ".npy.png"
      else {
        this.$message({
          message: '结果未上传',
          type: 'warning'
          // type: 'error'
        })
      }


      // console.log(url)

      const extent = [72.583875, 26.644031, 95.365151, 35.788881]
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

      this.focusonpoint(6.1, [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2])

    },
    //创建台风信息展示
    createOverlayWindInfo() {
      this.overlayWindInfo = new Overlay({
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
    creatTyphoonfeature(wind) {
      var feature = new Feature({
        title: 'Typhoontest',
        id: 1,
        lon: wind.lon,
        lat: wind.lat,
        lnglat: [wind.lon, wind.lat],
        geometry: new Point([wind.lon, wind.lat]),
        // catagory:catagory,
        // typename:typeName,
        wind: 1
      });
      return feature;
    },

    //添加隐藏图层 用来记录台风所示的范围 已经中心点#理论说应该有r半径范围 但是目前没有 只能先确定中心点
    addTyphoonfeatureLayer(wind) {//(经度 维度)
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
      const feature = this.creatTyphoonfeature(wind)
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
    findwind(year, month, day, checkwind) {
      var id = day % 6
      // var wind = (this.winds)[id]
      const date = year + '-' + month + '-' + day


      this.map.removeLayer(this.pointLayer);
      this.pointDate = date
      this.pointLat = checkwind.lat
      this.pointLon = checkwind.lon
      this.probability = checkwind.probability
      // this.windScale =  checkwind.windscale
      this.windScale = checkwind.windscale
      this.addTyphoonfeatureLayer(checkwind)
      // console.log(wind.lat)
      // console.log(wind.lon)


    },
    //台风识别 目前11张图 通过day来判断 31 为1 extend=[83.63764452794805, 45.522127022756756, 94.14344177572586, 50.440403203311135]
    async addTyphoonLayer(year, month, day) {
      this.initaddlayer()
      const date = year + '-' + month + '-' + day
      var checkwind = null
      this.winds.forEach((wind) => {
        if (wind.date == date)
          checkwind = wind
      })
      // console.log(this.pointDate)
      // const strmonth = month<10 ? "0"+month : ""+month
      // const strday = day<10 ? "0"+day : ""+day

      if (checkwind == null) {
        this.$message({
          message: '当天无台风或数据未上传',
          type: 'warning'
          // type: 'error'
        })
      } else {
        var url = '/maps/img/Typhon/' + year + month + day + "_IR.png"
        const extent = [30.0, -66.56, 135.0, 30.1]
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
        this.findwind(year, month, day, checkwind)//把1当作占位符
        const imgurl1 = `/maps/img/Typhon/toolbar.jpg`
        const toolbarextent = [136, -66.56, 145.0, 30.1]
        this.toolbar = new ImageLayer({
          source: new ImageStatic({
            url: imgurl1,//地址
            projection: projection,
            imageExtent: toolbarextent
          })
        })
        this.map.addLayer(this.toolbar)
        this.map.getView().setMinZoom(3.3);
        this.focusonpoint(3.3, [(extent[0] + toolbarextent[2]) / 2, (extent[1] + extent[3]) / 2])
      }
    },
    recover() {
      this.map.getView().setZoom(1)
      this.map.getView().setCenter([85.4216, 19.946])
    },
    focusonpoint(zoom, center) {
      this.map.getView().setZoom(zoom)
      this.map.getView().setCenter(center)
    },
    imgPointermove(e) {
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
      } else {
        this.closeMapWindPopup()
      }
    },
    // // 关闭弹框
    closeMapWindPopup() {
      this.overlayWindInfo.setPosition(undefined)
    },

    addPoints(point) {
      // if(point == null || (typeof point) != (typeof this.center)){
      if (point == null) {
        // point =this.map.getView().getZoom()
        // console.log(22222)
        // console.log(typeof point)
        return null
      }
      var feature = new Feature({
        geometry: new Point(point),
        latlng: point,
      });
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 4,
            stroke: new Stroke({
              // color: "blue",
              color: 'red',
            }),
            fill: new Fill({
              // color: "rgba(24,144,255,100)",
              color: 'red',
            }),
          }),
        }));
      const Source = new VectorSource({
        features: [feature],
      });
      var layer = new VectorLayer({
        source: Source,
      })
      this.points.push(layer);
      // console.log(this.points)
      this.map.addLayer(layer);
      // console.log(22)
    },
    mapClick(e) {
      // console.log('aaa')
      const lonlat = e.coordinate
      // console.log(e.coordinate)
      this.addPoints(lonlat)
      // this.currentCenter = lonlat
      this.pointLonLat = lonlat
      this.currentZoom = this.map.getView().getZoom()
      // console.log(this.pointLonLat)

    },
    movepoint(lon, lat, zoom) {
      var center = [lon, lat]
      this.map.getView().setZoom(zoom)
      this.map.getView().setCenter(center)
      this.addPoints(center)
    },
    grids() {
      // var gra = new Graticule({
      //       // map: map,
      //       strokeStyle: new Stroke({
      //           color: 'rgba(12, 12, 12, 0.8)',
      //           width: 0.6
      //       }),
      //       targetSize: 100
      //   });
      this.grid = new Graticule({
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
        zIndex: 111

      })
      this.map.addLayer(this.grid)
    },
    checkgrid() {
      if (this.grid != null) {
        if (this.grid.getVisible()) {
          this.grid.setVisible(false)
        } else {
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

#content {
  width: 100%;
  height: 100%;
}

.selececaard {
  /* position:fixed; */
  position: absolute;
  /* position: relative; */
  z-index: 998;
  top: 95px;
}

.windpopup {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.6);
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
  border-top-color: rgba(255, 255, 255, 0.4);
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
