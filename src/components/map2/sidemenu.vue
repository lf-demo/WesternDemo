<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月14日 15:47:58
-->
<template>
        <div id='map_container'>
            <div id='sidemenu'>

                <div id="geoinfoGroup">
                    <div class='sublbl'>地理图层</div>
                    <button id='geo0' type='button' value='0' style="margin-bottom:3px;margin-top:4px;margin-right:1px;background-color: rgb(60, 60, 60);" v-on:click="mapchange()">
                        <div>国界线</div>
                    </button>
                     <button id='geo1' type='button' value='2' style="margin-bottom:3px;margin-top:4px;margin-left:1px;background-color: rgb(60, 60, 60);" v-on:click="grib()">
                            <!-- <div>维度/经度 (5deg)</div> -->
                            <div>纬度/经度</div>
                    </button>

                    <!-- <button id='geo3' type='button' value='3'>
                        <div>River</div>
                    </button> -->
                </div>



                <div id='user_location'>
                    <div class=' sublbl'>位置变更
                    </div>
                    <table>
                        <tr>
                            <td>纬度:</td>
                            <td><input type='text' name='ulat' id='ulat'  value="37"></td>
                        </tr>
                        <tr style="margin-top:2px">
                            <td>经度:</td>
                            <td><input type='text' name='ulon' id='ulon'  value="140"></td>
                        </tr>
                                                <tr style="margin-top:2px">
                        <td>图层等级:</td>
                            <td><input type='text' name='uzoom' id='uzoom'  value="1"></td>
                        </tr>
                    </table>
                    <div style="margin-bottom:3px;margin-top:4px">
                        <button type='button' name='move_c' style=" font-size:13px;padding:1px 0" v-on:click="movepoint">移动中心</button>
                        <!-- <button type='button' name='save_c'>Save Location to Cookie</button> -->
                        <!-- <button type='button' name='clear_c'>Clear cookie</button> -->

                    </div>
                </div>

            </div>
        </div>
</template>

<script>

export default {

  name: 'sidemenu.vue',
  props:["currentZoom","pointLonLat"],

  data () {
    return {
        mapstate:false,
        lon:null,
        lat:null,
        zoom:null,
        geo0clicked:false,
        geo1clicked:false,
    }
  },
  mounted(){
    document.getElementById('ulat').value=''
    document.getElementById('ulon').value=''
    document.getElementById('uzoom').value=''

  },
  methods: {
    mapchange(){
        this.$parent.clearmap()
        var button = document.getElementById('geo0');
        if(this.geo0clicked){
            button.style.backgroundColor = 'rgb(60, 60, 60)';
            this.geo0clicked = false
        }else{
            button.style.backgroundColor='rgb(50, 205, 50)';
            this.geo0clicked = true
        }
    },
    movepoint(){
        this.lat = document.getElementById('ulat').value
        this.lon = document.getElementById('ulon').value
        this.zoom = document.getElementById('uzoom').value
        if(this.lat == null || this.lat == ''){
            this.$message({
                message: '格式不正确',
                type: 'warning'
            // type: 'error'
            })
            return null
        }
        if(this.lon == null || this.lon == ''){
            this.$message({
                message: '格式不正确',
                type: 'warning'
            // type: 'error'
            })
            return null
        }
        if(this.zoom == null || this.zoom == ''){
            this.$message({
                message: '格式不正确',
                type: 'warning'
            // type: 'error'
            })
            return null
        }

        this.$parent.movepoint(this.lon,this.lat,this.zoom)
    },
    grib(){
        this.$parent.checkgrid()
        var button = document.getElementById('geo1');
        if(this.geo1clicked){
            button.style.backgroundColor = 'rgb(60, 60, 60)';
            this.geo1clicked = false
        }else{
            button.style.backgroundColor='rgb(50, 205, 50)';
            this.geo1clicked = true
        }
    }
  },
  watch:{
    pointLonLat(){
        document.getElementById('ulat').value=this.pointLonLat[1].toFixed(3)
        document.getElementById('ulon').value=this.pointLonLat[0].toFixed(3)
        document.getElementById('uzoom').value=this.currentZoom.toFixed(1)

    },
    currentZoom(){
        document.getElementById('uzoom').value=this.currentZoom.toFixed(1)
    }
  },
}
</script>

<style scoped>
</style>
