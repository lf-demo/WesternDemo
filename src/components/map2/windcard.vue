<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月03日 17:00:04
-->
<template>
  <div>
        <div class="text item">
            时间:{{pointDate}}
        </div>
        <div class="text item">
            经度:{{lon}}
            <!-- 经度:{{lon}} -->
        </div>  
        <div class="text item">
            维度:{{lat}}
        </div> 
        <div class="text item">
            台风概率:{{likehood}}
        </div>
        <div class="text item">
            台风强度:{{ws}}
        </div>
        <!-- <div class="text item">
            时间:{{date}}
        </div>
        <div class="text item">
            经度:{{pointLon}}
        </div>  
        <div class="text item">
            维度:{{pointLat}}
        </div> 
        <div class="text item">
            台风概率:{{probability}}
        </div>
        <div class="text item">
            台风等级:{{wind}}
        </div> -->
  </div>
</template>

<script>
export default {
  name: 'windcard',
  props:["pointDate","pointLon", "pointLat" , "probability", "windScale"],
  data () {
    return {
        date:null,
        lon:null,
        lat:null,
        likehood:null,//概率
        ws:null,//台风强度
    }
  },
  methods: {
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
  },
  mounted(){
    // console.log(this.ws)
    // console.log(this.pointLon)
    // console.log(this.pointLat)
    // console.log(this.probability)
    // console.log(this.windScale)
    // this.lon = this.pointLon<0 ? (this.pointLon *(-1)) +"° W" :this.pointLon +"° E"
    // this.lat = this.pointLat<0 ? (this.pointLat *(-1)) +"° S" :this.pointLat +"° N"
    // this.likehood = this.probability * 100 +"%"
  },
  watch:{
    pointLon(){
         this.lon = this.pointLon<0 ? (this.pointLon.toFixed(2) *(-1)) +"° W" :this.pointLon.toFixed(2) +"° E"
    },
    pointLat(){
        this.lat = this.pointLat<0 ? (this.pointLat.toFixed(2) *(-1)) +"° S" :this.pointLat.toFixed(2) +"° N"
    },
    probability(){
        this.likehood = (this.probability * 100 ).toFixed(2) +"%"
    },
    windScale(){
        // console.log(this.windScale)
        this.ws = this.checkTWind(this.windScale)
    }
  }
}
</script>

<style scoped>
</style>
