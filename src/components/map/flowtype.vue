<!--
  功能：功能描述
  作者：Skindy
  时间：2023年04月27日 12:16:45
-->
<template>
  <div id='flowtype'>  
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title" class="ftitle">
          <span class="ftitle">  <i class="el-icon-picture-outline-round"></i> 站点标签 </span>
        </template>
        <div style="padding-left:19px;">
            <template>
              <el-checkbox-group 
                v-model="checkedType"
                style="margin-bottom:3px;">
                 
              <el-checkbox v-for="(type,index) in types"  :label="type" :key="index"  id="index" @change="itemselect(index)">{{type}}</el-checkbox>
            </el-checkbox-group>
          </template>

        </div>
        
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
  const typeOptions = ['浮标', '站点'];
  export default {
    name: 'flowtype',
    data () {
      return {
         checkedType: [],
         types: typeOptions,
      }
    },
    methods: {
      handleClick() {
          alert('button click');
        },
      itemselect(i){
        this.dis = event.target.checked
        // console.log(this.dis)
        // console.log("点击了",i+1)
        if(!this.dis){
          // this.$parent.removeByType(i+1)
          this.$parent.deletemarkers(i+1)
        }
        else{
          // this.$parent.createByType(i+1)
          this.$parent.addmarkers(i+1)
          //           this.$parent.addMarkerByType(i+1)

        }
        // this.$parent.createByType(i+1)
        // this.$parent.removeByType(i+1)

        // print(document.getElementById(i))
      }
    }
  }
</script>

<style scoped>
  #flowtype{
    width:144px; 
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  /* .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  } */
  .el-collapse,.el-collapse-item__wrap {
        border: none;
  }
  
  .el-collapse{
    /* background-color: #47c4ff; */
    filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.8 ; /*半透明*/ 
    padding-left:19px;
  }
  .ftitle{
    padding-left: 19px;
  }
  /* .el-checkbox__label {
          line-height: 20px;
          padding-left: 8px;
        } */
  </style>
