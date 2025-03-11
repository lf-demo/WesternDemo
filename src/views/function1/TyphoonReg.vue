<template>
  <div id="content">
        <section class="" id="main">
            <div class="boxLeft">
                <!--视频监控-->
                <div class="boxLeftVideoTop" style="margin-top:10px;">识别区域</div>
                <!-- <div class="clear"></div> -->
                <div class="boxLeftVideoBox">
                    <div class="boxLeftVideoTop" style="margin-top:3px;padding:3px">台风识别区域</div>
                    <div class="BoxConTop">
                      <span class="BoxconTopLeft">经纬度(63.80° E--17.52° N) &nbsp; &nbsp; 台风概率：91%</span>
                      <span  class="BoxconTopRight"><img src="@/assets/images/ico.png" /> </span>
                      <span class="BoxconTopLeft" style="width:100%;  margin-bottom: 1px;">风力等级：强热带风暴</span>
                    </div>
                    <div class="boxLeftVideoBoxCon">
                        <!-- <img src="../assets/img/1.png" alt=""> -->
                    </div>
                    <!-- <div class="clear"></div> -->
                    <div class="BoxConTop" style="margin-top:5px">
                      <span class="BoxconTopLeft">经纬度(134.46° E--17.98° N) &nbsp; &nbsp; 台风概率：92%</span>
                      <span class="BoxconTopRight"><img src="@/assets/images/ico.png" /> </span>
                      <span class="BoxconTopLeft" style="width:100% ; ">风力等级：强热带风暴</span>
                    </div>
                    <div class="boxLeftVideoBoxCon">  </div>
                </div>
            </div>
            <div class="boxCenter">
                <!--地图区域-->
                <!-- <div class="boxLeftVideoTop">识别区域</div> -->
                <div class="boxCenterdown" style="margin-top: 56px;">
                    <div class="boxCenterMap">
                    </div>
                </div>

                <div class="boxCenter_down">
                    <ul class="boxCenter_list">
                        <li>时间：2022年8月22日</li>
                        <li>经纬度范围：30°E-135°E 60°S-40°N</li>
                        <!-- <li>热带气旋强度等级：xxxx</li> -->
                        <!-- <li>最大持续风速：xxxx</li> -->

                    </ul>
                </div>
         </div>
        </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

#main {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  /* background-size: 100% 100%; */
  /* overflow: hidden; */
}
.boxLeftVideoBoxCon {
    width: 95%;
    margin: 2%;
    /* margin: 0 auto; */
    background-image: url("@/assets/img/1.png");
    background-size: 100% 100%;
}

.boxLeftVideoBoxCon2 {
    width: 95%;
    background-image: url("@/assets/img/2.png");
    background-size: 100% 100%;
}

ul {
    list-style: none;
}

.boxCenter_list {
    padding: 15px 0 0 15px;
}

.boxCenter_down{
    width: 98%;
    height: 75px;
    padding-bottom: 15px;
    background-image: url("@/assets/images/map_bg.png");
    float: left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
}
</style>
