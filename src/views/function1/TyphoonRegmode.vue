<template>
  <main class="main">
    <!-- <header class="heared">
      <span class="head-logo">台风识别</span>
      <ul class="head-ul">
        <li><a href="videlctr.html">台风识别</a></li>
      </ul>
      <div class="head-right"><span id="time"></span><span>Admin</span></div>
    </header> -->
    <section class="section commanBox">

        <!--左侧区域-->
        <div class="boxLeft">
            <!--视频监控-->
            <!-- <div class="boxLeftVideoTop">识别区域</div> -->
            <div class="clear"></div>
            <div class="boxLeftVideoBox">
                <div class="boxLeftVideoTop">台风识别区域</div>
                <div class="BoxConTop"><span class="BoxconTopLeft">经纬度(xxx--xxx) &nbsp; &nbsp; 台风概率：91%</span><span
                        class="BoxconTopRight"><img src="@/assets/images/ico.png" /> </span></div>
                <div class="boxLeftVideoBoxCon">
                    <!-- <img src="../assets/img/1.png" alt=""> -->
                </div>
                <div class="clear"></div>
                <div class="BoxConTop">
                    <span class="BoxconTopLeft">经纬度(xxx--xxx) &nbsp; &nbsp; 台风概率：92%</span><span
                        class="BoxconTopRight"><img src="@/assets/images/ico.png" /> </span></div>
                <div class="boxLeftVideoBoxCon2">

                </div>
            </div>
            <div class="clear"></div>

        </div>
        <div class="boxCenter">
                <!--地图区域-->
                <div class="boxCenterdown">
                    <div class="boxCenterMap">
                    </div>
                </div>

                <div class="boxCenter_down">
                    <ul class="boxCenter_list">
                        <li>时间：xxxx</li>
                        <li>经纬度范围：xxxx</li>
                        <li>热带气旋强度等级：xxxx</li>
                        <li>最大持续风速：xxxx</li>

                    </ul>
                </div>
        </div>

    </section>

  </main>
</template>

<script>
</script>

<style>
.boxLeftVideoBoxCon {
    width: 98%;
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
    height: 100px;
    padding-bottom: 15px;
    background-image: url("@/assets/images/map_bg.png");
    float: left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
}
</style>
