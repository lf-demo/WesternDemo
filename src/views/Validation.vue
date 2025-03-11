<!--
  功能：功能描述
  作者：Skindy
  时间：2023年05月13日 14:07:54
-->
<template>
  <div style="background:white">
    <Headers style="margin-bottom:35px"/>
       <div class="container">
        <div class="l_part">
            <form method="post" action="" enctype="multipart/form-data" name="form_menu">
                <div class="menu" style="margin-top:19px">

                    <br />
                    <br />
                </div>
            </form>
        </div>
        <div class="r_part">
            <span style="font-size:10pt;">

            </span>
            <span style="font-size:20pt;margin-left:40%">
                台风分类以及强度估计
            </span>
            <span style="font-size:16pt;margin-left:20px">

            </span>
            <div id="sg_area">
                <table>
                    <tr>
                        <th>

                        </th>
                        <th style="font-size:14pt; text-align: center;">
                            定强估计散点图
                        </th>
                        <th style="font-size:14pt; text-align: center;">
                            飞机侦察散点图
                        </th>
                        <th style="font-size:14pt; text-align: center;">
                            台风等级定强偏差图
                        </th>
                    </tr>
                    <tr>
                        <th style="font-size:10pt;width:120px">
                            (a) 定强估计
                        </th>
                        <td>
                            <img src="@/assets/validation/scatter.png" style="width:270px;" />
                        </td>

                        <td>
                            <img src="@/assets/validation/recon.png" style="width:270px;" />
                        </td>

                        <td>
                            <img src="@/assets/validation/bic_class_ty_space.png" style="width:270px;" />
                        </td>

                    </tr>
                </table>

                <table style="margin-top: 30px;">
                    <tr>
                        <th style="font-size:10pt;width:120px">
                            (b) 台风分类损失图
                        </th>
                        <td style="text-align: center;">
                            <a target="_blank">
                                <img src="@/assets/validation/loss曲线图.png" alt="">
                            </a>
                            <p style="font-size: 20px;">
                                <strong>Accuracy(准确率) = TP / N</strong>
                            </p>
                            <p>其中，TP 表示模型正确分类的样本数，N 表示总样本数。</p>
                        </td>
                    </tr>
                </table>

                <table style="margin-top: 80px;">
                    <tr>
                        <th style="font-size:10pt; width: 90px;">
                            (c) 台风分类个例验证图
                        </th>
                        <td>
                            <tr>
                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_8_-47.0_33.2_45.0_217.5_988.0_IR.png" />
                                    <p style="text-align: center;">经度：13.96纬度：98.87</p>
                                    <p style="text-align: center;">等级：强热带风暴(Top-1:94%); <br>等级：热带风暴(Top-2:87%);</p>
                                    <p style="text-align: center;">时间：20221220 <br>实际等级：强热带风暴;</p>
                                </td>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_178_-95.5_20.3_75.0_102.5_981.0_IR.png"  />
                                    <p style="text-align: center; ">经度：-95.5 纬度：20.3</p>
                                    <p style="text-align: center; ">等级：台风(Top-1:92%);
                                        <br>等级：强热带风暴(Top-2:89%);
                                    </p>
                                    <p style="text-align: center;">时间：20210310 <br>实际等级：台 风;</p>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_447_-70.4_20.7_145.0_130.0_922.0_IR.png" />
                                    <p style="text-align: center;">经度：-70.4 纬度：20.7</p>
                                    <p style="text-align: center;">等级：超强台风(Top-1:98%); <br>等级：台风(Top-2:71%);
                                    </p>
                                    <p style="text-align: center;">时间：20221220 <br>实际等级：超强台风;</p>
                                </td>
                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_98_-88.1_36.7_25.0_0.0_1002.0_IR.png"  />
                                    <p style="text-align: center; ">经度：-88.1 纬度：36.7</p>
                                    <p style="text-align: center; ">等级：台风(Top-1:92%);
                                        <br>等级：强热带风暴(Top-2:89%);
                                    </p>
                                    <p style="text-align: center;">时间：20210510 <br>实际等级：台 风;</p>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_313_-96.0_26.7_100.0_97.5_946.0_IR.png" />
                                    <p style="text-align: center;">经度：-96.0 纬度：26.7</p>
                                    <p style="text-align: center;">等级：超强台风(Top-1:98%); <br>等级：台风(Top-2:71%);
                                    </p>
                                    <p style="text-align: center;">时间：20211228 <br>实际等级：超强台风;</p>
                                </td>


                                    </tr>
                                    <tr>
                                        <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_487_-88.1_34.8_15.0_0.0_1003.0_IR.png" />
                                    <p style="text-align: center;">经度：-88.1 纬度：34.8</p>
                                    <p style="text-align: center;">等级：热带低压(Top-1:94%); <br>等级：热带风暴(Top-2:87%);</p>
                                    <p style="text-align: center;">时间：20221221 <br>实际等级：热带低压;</p>
                                </td>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_503_-38.3_11.8_32.0_5.0_1008.0_IR.png"  />
                                    <p style="text-align: center; ">经度：15.9 纬度：92.06</p>
                                    <p style="text-align: center; ">等级：热带风暴(Top-1:92%);
                                        <br>等级：强热带风暴(Top-2:89%);
                                    </p>
                                    <p style="text-align: center;">时间：20221225 <br>实际等级：热带风暴;</p>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_506_-40.0_12.2_40.0_22.5_1006.0_IR.png" />
                                    <p style="text-align: center;">经度：-40.0 纬度：12.2</p>
                                    <p style="text-align: center;">等级：强台风(Top-1:88%); <br>等级：台风(Top-2:87%);
                                    </p>
                                    <p style="text-align: center;">时间：20211221<br>实际等级：台 风;</p>
                                </td>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_1814_-125.6_15.9_60.0_50.0_995.0_IR.png"  />
                                    <p style="text-align: center; ">经度：-125.6 纬度：15.9</p>
                                    <p style="text-align: center; ">等级：强台风(Top-1:92%);
                                        <br>等级：热带风暴(Top-2:89%);
                                    </p>
                                    <p style="text-align: center;">时间：20210528 <br>实际等级：强台风;</p>

                                <td style="padding-left: 15px;">
                                    <img src="@/assets/validation/2017_1818_-127.8_16.3_80.0_67.5_980.0_IR.png" />
                                    <p style="text-align: center;">经度：-127.8 纬度：16.3</p>
                                    <p style="text-align: center;">等级：超强台风(Top-1:98%); <br>等级：强台风(Top-2:71%);
                                    </p>
                                    <p style="text-align: center;">时间：20210520 <br>实际等级：超强台风;</p>
                                </td>


                            </tr>
                </table>

                <table style="margin-top: 80px;">
                    <tr>
                        <th style="font-size:10pt; width: 80px;">
                            (c) 积雪识别效果
                        </th>
                        <td style="padding-left: 50px;">
                            <img src="@/assets/validation/snow.png" />
                            <p style="text-align: center; font-size: 12px;">
                                积雪分类精度为0.9381，总精度为0.9437，验证指标和网络测试集精度相当，达到了预期效果。其中M1-M4为高山地区积雪带，M5、M6为人口居住地区日常积雪</p>
                        </td>
                    </tr>

                    <tr style="text-align: center;">
                        <th style="padding-top: 60px;width:120px">实验结果数据</th>
                        <td style="text-align: center; padding-left: 230px; padding-top: 50px;">
                            <table style="text-align: center;">
                                <tr style="text-align: center;">
                                    <th>数据编号</th>
                                    <th>过境时间</th>
                                    <th>轨道行号</th>
                                    <th>轨道列号</th>
                                    <th>积雪分类精度</th>
                                    <th>总精度</th>
                                </tr>
                                <tr >
                                    <td>M1</td>
                                    <td>2018/09/25</td>
                                    <td>035</td>
                                    <td>145</td>
                                    <td>0.9389</td>
                                    <td>0.9587</td>
                                </tr>
                                <tr>
                                    <td>M2</td>
                                    <td>2018/10/02</td>
                                    <td>035</td>
                                    <td>146</td>
                                    <td>0.9346</td>
                                    <td>0.9389</td>
                                </tr>
                                <tr>
                                    <td>M3</td>
                                    <td>2018/11/24</td>
                                    <td>034</td>
                                    <td>149</td>
                                    <td>0.9563</td>
                                    <td>0.9546</td>
                                </tr>
                                <tr>
                                    <td>M4</td>
                                    <td>2019/11/19</td>
                                    <td>030</td>
                                    <td>141</td>
                                    <td>0.9264</td>
                                    <td>0.9346</td>
                                </tr>
                                <tr>
                                    <td>M5</td>
                                    <td>2019/12/05</td>
                                    <td>029</td>
                                    <td>141</td>
                                    <td>0.9268</td>
                                    <td>0.9364</td>
                                </tr>
                                <tr>
                                    <td>M6</td>
                                    <td>2020/02/07</td>
                                    <td>029</td>
                                    <td>141</td>
                                    <td>0.9458</td>
                                    <td>0.9482</td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
    </div>

<div id="footerWrapper"> <bottom></bottom></div>

  </div>
</template>

<script>
import Headers from "@/components/header2"
import bottom from "@/components/bottom.vue"
export default {
  name: 'Validation.vue',
  data () {
    return {}
  },
  methods: {},
  components: {
    Headers,
    bottom
  },
}
</script>

<style scoped>
/* @import url('https://www.eorc.jaxa.jp/ptree/validation/css/h8-validation_main_v2.css'); */
/* @import url('https://www.eorc.jaxa.jp/ptree/validation/css/h8-validation_main_v2.css'); */
.container{
    margin-left: 100px;
}
</style>
