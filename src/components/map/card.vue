<!--
  功能：功能描述
  作者：Skindy
  时间：2023年04月28日 16:19:18
-->
<template>
  <div>
    <el-card class="box-card" style="padding:7px">
        <div class="title">
            {{pointName}}
        </div>   
        <div class="text item">
            经度:{{pointLon}}
        </div>  
        <div class="text item">
            维度:{{pointLat}}
        </div> 
        <div v-if="pointcatagory == 1" class="text item">
            有效波高(cm):{{wave}}
        </div>  
          <!-- <div v-if="pointcatagory == 1" class="text item">
            峰值方向(Deg):
        </div>  
         <div v-if="pointcatagory == 1" class="text item">
            平均周期(s):
        </div>  
        <div v-if="pointcatagory == 1" class="text item">
            水位(m):
        </div>   -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'card',
  props:['pointName','pointLon','pointLat','pointInfo','pointcatagory'],
  data () {
    return {
      EffectiveWaveHeight:null,
      wave:null,
    }
  },
  methods: {},
  mounted(){
    this.wave = (Math.random() * 14).toFixed(2)
  }
}
</script>

<style scoped>
  .title{
      font-size: 14px;
      color: black;
      font-weight: bold;
      margin-bottom: 10px;
      width: 100px;
  }
  .text {
    font-size: 14px;
    color: black;
    /* color: white; */
  }

  .item {
    margin: 5px 0;
    padding: 3px;
    /* background: rgba(31, 233, 233, 0.795); */
    background: white;
    width: 118px;
  }

  .box-card {
    width: 100%;

    background-color: transparent;
    border: 0;
  }
  .el-card ::v-deep .el-card__body, .el-main {
    padding: 5px;
}
</style>
