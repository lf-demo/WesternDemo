<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月12日 17:22:26
-->
<template>
  <div class="bottom">
                <!-- <img class="logoimg" src="@/assets/img/finallogo.png" style="margin-left:20%;margin-right:15px;height: 50px;" alt="">  -->

        <!-- <address><span class="copy"> Copyright© nanjing university of information science &technology</span></address>         -->
        <div class="address">
          <p> <a href="#">关于我们</a><a href="#">用户协议</a><a href="#">免责说明</a></p>
          <address><span class="copy"> 版权所有 © 2023 成都锦江电子系统工程有限公司 南京信息工程大学</span></address>
        </div>
                
            <!-- <img class="logoimg" src="@/assets/img/nxdlogo.png" alt="">  -->

        <!-- <div id="caution" style="display: block;margin-top:6px" > <img src="@/assets/icon/footer_caution.png" alt="不許複製・禁無断転載" name="" class=""></div> -->
        <!-- <div id="footerLink" class="footerLink">          
            <ul>
            <li> <a  href="www.baidu.com">联系我们</a></li>
          </ul>
        </div> -->

  </div>
</template>

<script>
export default {
  name: 'bottom.vue',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.bottom{
    background-color: grey;
    height: 100%;
    border-top: 3px solid rgb(255,140,0);
    font-size: 10pt;
    box-sizing:border-box;
}
.logoimg{
  height: 46px;
  float: left;
  margin-left: 19px;
  margin-top: 8px;
}
.address {
    /* margin-top: 35px; */
    margin-right: 15%;
    text-align: left;
    line-height: 110%;
    margin-left: 38%;
    float: left;
    display: block;
    /* font-style: italic; */
}
.address address{
  font-style: italic;
}
.address p {
  margin-top: 15px;
  margin-left: 17%;
}
.address p a{
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;

    text-decoration: none;
    color: #fff;
    margin: 0 32px 10px 0;
    display: inline-block;
}
.address .copy {
    font-size: 77%;
    color: rgb(200,200,200);
}
.footerLink{
    position: absolute;
    width: 68px;
    height: 18px;
    top: 10px;
    right: 10px;
    margin: 0px;
    padding: 0px;
    text-align: left;display: flex;
}
.footerLink ul{
    /* position:absolute; */
        /* position:fixed; */
    /* top: 10px; */
    /* bottom: 0px; */
    /* right: 11px;
    bottom: 15px; */
    /* bottom: 0px; */
    margin: 0px;
    /* margin-bottom: 15px;/ */
    padding: 0px;
    list-style-type: none;

}
.footerLink ul li {
    margin: 0px;
    float: left;
    background-image: url('@/assets/icon/linkmarker.png');
    background-position: 0px 5px;
    padding-left: 14px;
    background-repeat: no-repeat;
}
#footer_container a:visited {
    color: #FFF;
    text-decoration: none;
}
</style>
