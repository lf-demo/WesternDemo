<template>
    <div>
        <div id="map" style="height: 500px"></div>
        <div v-html="queryReturnData"></div>
    </div>
</template>

<script>
// import {createBaseMap} from '@/utils/MapInitUtil'
import {createWMSLayer, createWFSLayer, createQueryLayer, featureStyle} from 'ol/layer'
import {MultiLineString} from 'ol/geom';
import {WFS} from 'ol/format';
import Feature from 'ol/Feature';
import {Stroke, Style} from 'ol/style';
import getUid from 'ol/util';
import {
    and as andFilter,
    equalTo as equalToFilter,
    like as likeFilter,
} from 'ol/format/filter';

export default {
    name: 'HelloWorld',
    props: {},
    data() {
        return {
            map: null,
            queryReturnData: {},
            queryLayerId: null,
        }
    },
    mounted() {
        this.map = createBaseMap("map");
        this.addRailwayWMSLayer();
        // this.addRailwayWFSLayer(); //查询不加这个图层。
        this.bindMapClick();
    },
    methods: {
        /**
         * 添加铁路路线图图WMS服务
         */
        addRailwayWMSLayer() {
            this.map.addLayer(createWMSLayer());
        },
        /**
         * 添加铁路路线图图WFS服务
         */
        addRailwayWFSLayer() {
            this.map.addLayer(createWFSLayer());
        },

        /**
         * 绑定地图的点击事件
         */
        bindMapClick() {
            this.map.on(['click'], (evt) => {
                let layerArr = this.map.getLayers().getArray();

                if (!layerArr || layerArr.length < 2) {
                    //定义的地图有两个图层。第一个是底图OSM，第二个是WMS
                    return;
                }
                let source = layerArr[1].getSource();
                //获取要素信息url
                let url1 = source.getFeatureInfoUrl(
                    evt.coordinate, //选中要素坐标
                    this.map.getView().getResolution(),//分辨率
                    'EPSG:4326', //坐标系
                    {'INFO_FORMAT': 'text/html', "QUERY_LAYERS": 'railway:LuoYangRailway'});//返回信息格式html，查询图层
                if (url1) {
                    //防止跨域去掉URL头部
                    this.axios.post(url1.replace("http://127.0.0.1:8090", "")).then((response) => {
                        //显示查询结果
                        this.queryReturnData = response.data;
                    });
                }

                //返回Json格式URL
                let url2 = source.getFeatureInfoUrl(
                    evt.coordinate,
                    this.map.getView().getResolution(),//分辨率
                    'EPSG:4326',
                    {'INFO_FORMAT': 'application/json', "QUERY_LAYERS": 'railway:LuoYangRailway'});
                if (url2) {
                    //防止跨域去掉URL头部
                    this.axios.post(url2.replace("http://127.0.0.1:8090", "")).then((response) => {
                        if (response.data.features && response.data.features.length > 0) {
                            //获取第一个要素的name属性
                            let name = response.data.features[0].properties.name;
                            //查询WFS，name相同的要素（选中整条铁路线）
                            this.queryWFS(equalToFilter('name', name))
                        }
                    });
                }
            });

        },
        queryWFS(filter) {
            let featureRequest = new WFS().writeGetFeature({
                srsName: 'EPSG:4326', // 空间参考系统(坐标系)
                featureNS: "http://localhost:8090/geoserver/railway", // 工作区命名空间 URI
                featurePrefix: 'railway', //要素的命名空间前缀
                featureTypes: ['LuoYangRailway'],//所要访问的图层
                outputFormat: 'application/json',
                filter: filter //查询条件
            });
            this.axios.post("/geoserver/railway/wfs",
                new XMLSerializer().serializeToString(featureRequest), //参数转换成xml
                {headers: {'Content-Type': 'text/xml'}} //请求头
            ).then((response) => {
                if (!response.data.features) {
                    return;
                }

                if (this.queryLayerId) {
                    //删除之前的查询图层
                    let layerArr = this.map.getLayers().getArray();
                    layerArr.forEach((layer) => {
                        if (layer.ol_uid === this.queryLayerId) {
                            this.map.removeLayer(layer);
                            this.queryLayerId = null;
                        }
                    })
                }
                //创建查询图层
                let queryLayer = createQueryLayer();
                this.queryLayerId = queryLayer.ol_uid; //保存图层UID
                for (const item of response.data.features) {
                    let geometry = new MultiLineString(item.geometry.coordinates)
                    let feature = new Feature({
                        geometry: geometry,
                    });
                    feature.setStyle([
                        new Style({
                            stroke: new Stroke({color: 'blue', width: 6})
                        })
                    ]);
                    queryLayer.getSource().addFeature(feature);
                }
                this.map.addLayer(queryLayer)
            });
        }
    }
}
</script>