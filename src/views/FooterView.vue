<script>
export default {
  name: "footerView",
  methods: {
    toHome() {
      this.$router.replace({
        name: "home",
      });
    },
  },
};
</script>
<template>
  <div class="footer">
    <div class="footer-content">
      <div class="item">
        <img src="../../public/static/wx.jpg" />
      </div>
      <div class="item blog-info">
        <h4>最新博客</h4>
        <router-link to="/">首页</router-link>
        <router-link to="/article">文章</router-link>
        <router-link to="/about">关于我</router-link>
      </div>
      <div class="item user-info">
        <h4>联系我</h4>
        <p>Email:jdu@163.com</p>
        <p>QQ :128548772</p>
      </div>
      <div class="item intro">
        <h4>Blog</h4>
        <p>这是我的个人博客、文章都是测试使用，项目主要用于求职，提升竞争力</p>
      </div>
    </div>
    <div class="copyright">
      <p>Copyright@2024-2026 Conan Designed by Conan</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.footer {
  width: 100%;
  height: 350px;
  background: black;
}
.footer-content {
  display: flex;
  justify-content: space-around;
  img {
    width: 150px;
    height: 150px;
  }
  .item {
    height: 160px;
    margin-top: 75px;
    border-right: 1px solid #2e2e2e;
    padding: 0 120px 0 50px;
  }
  p,
  h4 {
    color: #b9b9b9;
  }
  .intro {
    width: 500px;
    padding: 0;
    border: 0;
  }
}
.blog-info,
.user-info,
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    margin-bottom: 10px;
    color: #6c6c6c;
    &:hover {
      color: white;
      cursor: pointer;
    }
  }
  p {
    margin-bottom: 10px;
    color: #6c6c6c;
  }
}
.copyright {
  width: 1600px;
  margin: 20px auto;
  border-top: 1px solid #2e2e2e;
  p {
    margin-top: 50px;
    text-align: center;
    color: #6c6c6c;
  }
}
</style>
