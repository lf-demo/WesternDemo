<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月03日 17:00:04
-->
<template>
  <div>
        <div class="text item">
            经度:{{pointLon}}
        </div>  
        <div class="text item">
            维度:{{pointLat}}
        </div> 
        <div class="text item">
            时间:{{date}}
        </div>
        <div class="text item">
            台风强度:{{wind}}
        </div>
  </div>
</template>

<script>
export default {
  name: 'windcard.vue',
   props:['date','pointLon','pointLat','wind'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>
