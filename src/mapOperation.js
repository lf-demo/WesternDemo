/**
 * 这个文件用于对 openlayers 中 的 map 常用的 相关操作 进行封装 作为平时项目的工具使用
 *  我的天地图 本地开发的key ： 036b8f2c434072539f8e1444c9fc0448
 * 到服务器时的key 5807f5639110eed5c4d035ae5de30da8
 *
 * 函数说明 1. zoom 级别 控制、修改默认值等等
 *         2. wmts 地图 的初始化
 *         3. 根据经纬度、或者经纬度数组添加point
 *         4. 注册点击事件用于判定feature
 *         5. 根据名字隐藏图层
 *         6. 绘制两点之间的 线段 根据经纬度数组
 *
 * @ol Vesion 6.6.1
 * @version v1.0.0
 * @code Skindy
 */
import "ol/ol.css";
import Map from "ol/Map";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import View from "ol/View";
import Overlay from 'ol/Overlay';
import {WMTS as WMTS, Vector as VectorSource, XYZ} from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import {getTopLeft, getWidth} from "ol/extent";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Feature} from "ol";
import {Point, LineString, Polygon, Circle} from "ol/geom";
import {Fill, Stroke, Style, Text} from "ol/style";
import {fromCircle} from 'ol/geom/Polygon';

// 类型检查
function type(obj) {
    var s = Object.prototype.toString.call(obj);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

export default class OLMAP {
    /**
     * OLMAP 构造器
     * @param {map实例} map2d
     * @param {默认缩放级别} defaultZoomlevel
     */
    constructor(map2d = null, defaultZoomlevel = 10) {
        this.map2d = map2d
        this.defaultZoomLevel = defaultZoomlevel
        this.targetId = 'map'
    }

    //  获取 与 配置 的属性
    setTargetId(id) {
        this.targetId = id;
    }

    getMap2d() {
        return this.map2d;
    }

    setDefaultZoomLevel(level) {
        this.setDefaultZoomLevel = level;
    }

    /**
     * 根据EPSG：4326坐标系 新建瓦片地图.....
     * @param {*} centerPosition 中心点的经纬度坐标
     * @notice 参数不能为空
     */
    mapInit(centerPosition) {
        // 如果传进来的 map2d的参数为null，说明需要新建一个map地图
        if (this.map2d == null) {
            // 地图注记 与 底图的相关配置
            var projection = getProjection("EPSG:4326");
            var projectionExtent = projection.getExtent();
            var size = getWidth(projectionExtent) / 256;
            var resolutions = new Array(14);
            var matrixIds = new Array(14);
            for (var z = 0; z < 14; ++z) {
                // generate resolutions and matrixIds arrays for this WMTS
                resolutions[z] = size / Math.pow(2, z);
                matrixIds[z] = z;
            }
            let layer = new TileLayer({
                opacity: 1, source: new XYZ({
                    url: 'http://127.0.0.1:8080/map/roadmap/{z}/{x}/{y}.png', wrapX: true, tileSize: [512, 512]
                }), visible: true
            });

            var map = new Map({
                layers: [layer], target: this.targetId, view: new View({
                    center: centerPosition, zoom: this.defaultZoomLevel, minZoom: 6, projection: projection
                })
            });

            this.map2d = map;
        }
    }

    /**
     * @param {index} 想要初始化的地图类型的相关索引 支持：矢量图、影像图、地形图，分别对应 0 1 2
     * @param {key} 天地图 中申请的秘钥key
     * @param {*} centerPosition 中心点的经纬度坐标
     * @notice 参数不能为空
     */
    tiandituInit(index, key, centerPosition) {
        if (type(index) != 'number') {
            throw ("方法tiandituInit的index参数必须是0~2之间的数字")
        }
        // 如果传进来的 map2d的参数为null，说明需要新建一个map地图
        if (this.map2d == null) {

            let layerArr = this.JudgeBaseAndNoteByType(index);
            // 地图注记 与 底图的相关配置
            var projection = getProjection("EPSG:4326");
            var projectionExtent = projection.getExtent();
            var size = getWidth(projectionExtent) / 256;
            var resolutions = new Array(14);
            var matrixIds = new Array(14);
            for (var z = 0; z < 14; ++z) {
                // generate resolutions and matrixIds arrays for this WMTS
                resolutions[z] = size / Math.pow(2, z);
                matrixIds[z] = z;
            }
            let layer_Base = new TileLayer({
                opacity: 1, source: new WMTS({
                    url: 'http://t{0-7}.tianditu.gov.cn/' + layerArr[0] + '_c/wmts?tk=' + key,
                    layer: layerArr[0],
                    matrixSet: "c",
                    format: "tiles",
                    style: "default",
                    projection: projection,
                    tileGrid: new WMTSTileGrid({
                        origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds
                    }),
                    wrapX: true
                }), visible: true
            })

            let layer_Note = new TileLayer({
                opacity: 1, source: new WMTS({
                    url: 'http://t{0-7}.tianditu.gov.cn/' + layerArr[1] + '_c/wmts?tk=' + key,
                    layer: layerArr[1],
                    matrixSet: "c",
                    format: "tiles",
                    style: "default",
                    projection: projection,
                    tileGrid: new WMTSTileGrid({
                        origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds
                    }),
                    wrapX: true
                }), visible: true
            });


            var map = new Map({
                layers: [layer_Base, layer_Note], target: this.targetId, view: new View({
                    center: centerPosition, zoom: this.defaultZoomLevel, minZoom: 4, projection: projection
                })
            })

            this.map2d = map
        }
    }


    tiandituInit2(curShowLayerIndex, centerPosition) {
        console.log("地图坐标", curShowLayerIndex);
        var projection = getProjection("EPSG:4326");
        var projectionExtent = projection.getExtent();
        var size = getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            // generate resolutions and matrixIds arrays for this WMTS
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        // 开发者凭证密钥
        let key = "d338c03dbed859950e662f8738fb3e75";
        // 图层相关配置
        // 暂时 数组长度为6  后续添加 配置 如果要添加新的图层 记得在judgeTileLayerType 添加新的键值对
        let layersLength = 6;
        let layersOption = new Array(layersLength);

        for (let i = 0; i < layersLength; i++) {
            // 参数 typeString 用于指定引用 source 源的 layer 类型
            // visibleStatus 表示一开始渲染时，仅显示第一个相关的矢量底图与注记
            let typeString = this.judgeTileLayerType(i);
            console.log("i=", i, typeString);

            let visibleStatus = (i == curShowLayerIndex[0] || i == curShowLayerIndex[1]);

            console.log("visibleStatus", visibleStatus);

            layersOption[i] = new TileLayer({
                opacity: 1, source: new WMTS({
                    url: 'http://t{0-7}.tianditu.gov.cn/' + typeString + '_c/wmts?tk=' + key,
                    layer: typeString,
                    matrixSet: "c",
                    format: "tiles",
                    style: "default",
                    projection: projection,
                    tileGrid: new WMTSTileGrid({
                        origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds
                    }),
                    wrapX: true
                }), visible: visibleStatus
            });
        }
        console.log("curShowLayerIndex........", curShowLayerIndex);
        var map = new Map({
            layers: layersOption, target: this.targetId, view: new View({
                center: centerPosition, zoom: this.defaultZoomLevel, minZoom: 4, projection: projection
            }),
        });
        this.map2d = map;
    }


    // TileLayer 默认配置 只需要一个layertype ,key用于拼接天地图地址
    defaultTileLayer(layerType, key) {
        var projection = getProjection("EPSG:3857");
        var projectionExtent = projection.getExtent();
        var size = getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z
        }
        let defaultTileLayer = new TileLayer({
            opacity: 1, source: new WMTS({
                url: 'http://t{0-7}.tianditu.gov.cn/' + layerType + '_w/wmts?tk=' + key,
                layer: layerType,
                matrixSet: "w",
                format: "tiles",
                style: "default",
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds
                }),
                wrapX: true
            }), visible: true
        });
        return defaultTileLayer;
    }

    // 根据 约定的 类型的索引 判别 底图 与 注记图 需要渲染的layer类型
    JudgeBaseAndNoteByType(index) {
        let map = [['vec', 'cva'],  // 矢量图
            ['ter', 'cta'],  //地形图
            ['img', 'cia']  //影像地图
        ]
        return map[index]
    }

    /**
     * 设置缩放级别
     * @param {zoomNum} 缩放数值
     * @param {isDefault} 是否使用默认值设置，若为true 则忽略第一个参数
     */
    setZoom(zoomNum, isDefault) {
        let defaultZoomLevel = this.defaultZoomLevel;
        let view = this.map2d.getView();
        let zoom = view.getZoom();
        if (isDefault) {
            view.setZoom(defaultZoomLevel);
        } else {
            view.setZoom(zoom + zoomNum);
        }
    }

    /**
     * 绘制要素点 同时加入地图图层
     * @param {coordinate} 坐标数组 接收经纬度坐标
     * @param {Function} callback 这个函数参数用于对feature进行自定义的设置
     * @return {features} 要素数组
     */
    drawPoint(coordinate, callback) {
        // 存放转换成EPSG: 3857位置数组
        let positions = [];
        // 要素数组
        let features = [];
        type(coordinate) == 'array' ? positions = coordinate : [coordinate];
        for (let i in positions) {
            let feature = new Feature({
                geometry: new Point(positions[i])
            })
            // 如果callback 没有传入参数
            if (callback !== undefined) {
                callback(feature, i);
            }
            features.push(feature);
        }
        return features;
    }

    /**
     * 绘制两点之间的线条
     * @param {pointArr} 经纬度数组
     * @return {feature} 要素
     * @notice 暂时没有配置~
     */
    drawLine(pointArr) {
        let feature = new Feature({
            geometry: new LineString(pointArr)
        });

        feature.setStyle(new Style({
            stroke: new Stroke({
                color: "#000", width: 1
            }), fill: new Fill({
                color: "#000"
            })
        }));

        return feature;
    }


// create new vector layer
    createVectorLayer() {
        let layer = new VectorLayer({})
        return layer;
    }

// create new vector source
    createVectorSource() {
        let source = new VectorSource({});
        return source;
    }

    /**
     * 弹框\\\\
     * @param {*} element dom节点
     * @returns
     */
    createOverlay(element) {
        var overlay = new Overlay({
            element, autoPan: true, autoPanAnimation: {
                duration: 250
            }, stopEvent: false
        });
        return overlay;
    }


    /**
     * 根据经纬度坐标画圆 注意  注意该函数 不可轻易复用！
     * @Tips 这个函数主要适用于需求是一个圆 加上文字在圆的右边的浮动、、文字在圆的边上的位置没有写
     * @param {*} centerPosition 中心点经纬度坐标
     * @param {*} radius 半径 单位为米 可以为空，默认值为2000
     * @param {*} callback 自定义设置 比如style 比如 设置属性 等等
     * @param {*} color 线条颜色
     * @param {*} text 提示文字
     * @return {*} features
     */
    drawCircle(centerPosition, radius = 2000, callback, color = '#fff', text = '') {
        let features = []
        let coords;
        for (let i = 0; i < centerPosition.length; i++) {
            let EPSGTransCoord = fromLonLat(centerPosition[i])
            let circle = new Circle(EPSGTransCoord, radius)
            let feature = new Feature({
                geometry: fromCircle(circle).transform('EPSG:3857', 'EPSG:4326')
            })
            let coord = feature.getGeometry().getLinearRings()[0].getCoordinates()[0]
            coords = feature.getGeometry().getLinearRings()[0].getCoordinates();
            let featureText = new Feature({
                geometry: new Point(coord)
            })
            featureText.setStyle(new Style({
                text: new Text({
                    font: '14px Microsoft YaHei', text: text, textAlign: "right", // 对齐方式
                    textBaseline: "middle", // 文本基线
                    fill: new Fill({
                        color: color
                    }), offsetX: -5
                })
            }))

            if (callback !== undefined && typeof callback === 'function') {
                callback(feature, i, color, coords)
            }

            features.push(feature, featureText)

        }
        return {features, coords};
    }


    /**
     * 绘制椭圆 这个函数用于 表示聚焦状态
     * @param {*} centerPosition coord数组
     * @param {*} baseNum 表示基数 默认值乘以基数
     * @param {*} callback
     * @returns
     */
    drawEllipseCircle(centerPosition, baseNum = 1, callback) {
        let features = []
        for (let i = 0; i < centerPosition.length; i++) {
            let feature = new Feature({
                geometry: this.genEllipseGeom(400 * baseNum, 240 * baseNum, centerPosition[i])
            })
            if (type(callback) === 'function') {
                callback(feature, i)
            }
            features.push(feature)
        }
        return features;
    }


    /**
     * 返回椭圆的多边形
     * @param {*} radiusMajor 长半轴
     * @param {*} radiusMinor 短半轴
     * @param {*} center coord
     * @returns
     */
    genEllipseGeom(radiusMajor, radiusMinor, center) {
        var circle = new Circle(fromLonLat(center), radiusMinor);
        var polygon = fromCircle(circle, 64).transform('EPSG:3857', 'EPSG:4326');
        polygon.scale(radiusMajor / radiusMinor, 1);
        return polygon;
    }


    /**
     * 根据名字隐藏图层
     * @param {*} name 给图层设置的名字
     */
    hideLayer(name) {
        let layers = this.map2d.getLayers();
        for (let i = 0, len = layers.getLength(); i < len; i++) {
            let curItem = layers.item(i)
            if (curItem.get(name) != null) {
                curItem.setVisible(false);
            }
        }
    }

    /**
     * 注册feature判断事件
     * @param {*} type 暂时只拥有click 与 hover(pointermove实现)  接收字符串类型如'click'
     * @param {Function} callback 执行的回调函数
     */
    signupFeatureEvents(type, callback) {
        let eventName = type == 'click' ? 'singleclick' : 'pointermove';
        const _this = this;
        this.map2d.map.on(eventName, function (ev) {
            let pixel = ev.pixel;
            let feature = _this.map2d.map.forEachFeatureAtPixel(pixel, function (feature) {
                return feature;
            })
            callback(pixel, feature)
        })
    }

    /**
     * 根据图层名字查找图层 实例
     * @param {*} name 图层名字
     * @return {layer} 如果存在图层则返回图层实例，否则返回null
     */
    findLayerByName(name) {
        let layers = this.map2d.getLayers();
        for (let i = 0, len = layers.getLength(); i < len; i++) {
            let curItem = layers.item(i)
            if (curItem.get(name) != null) {
                return curItem;
            }
        }
        return null;
    }

    /**
     * 创建一个默认的polygon
     * @param {*} coordArray 经纬度数组
     * @return {*} feature 返回geo为polygon的feature
     */
    drawPolygon(coordArray) {
        let geo = new Polygon([coordArray])
        let feature = new Feature({
            geometry: geo
        })
        return feature
    }

    judgeTileLayerType(index) {
        let ret;
        let map = {
            0: "vec", 1: "cva", 2: "ter", 3: "cta", 4: "img", 5: "cia"
        };
        for (let i in map) {
            if (index === i) {
                ret = map[i];
            }
        }
        return ret;
    }
}
