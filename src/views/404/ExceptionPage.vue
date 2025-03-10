<template>
  <div class="exception">
    <div class="con">
      <img src="@/assets/imgs/404.svg" class="img" />
      <div class="content">
        <h1>404</h1>
        <div class="desc">抱歉，你访问的页面不存在</div>
        <div class="actions">
          <a-button type="primary" @click="handleToHome">返回首页</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exception",
  methods: {
    handleToHome() {
      this.$router.push({ path: "/home/home/index" });
    }
  }
};
</script>

<style lang="less" scoped>
.exception {
  height: 100%;
  position: relative;

  > .con {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .content {
    display: inline-block;
    margin-left: 50px;
    transform: translateY(60px);

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>
