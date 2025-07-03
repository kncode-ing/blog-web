<script>
import FooterView from "./views/FooterView.vue";
export default {
  name: "App",
  data() {
    return {
      sText: "",
    };
  },
  components: {
    FooterView,
  },
  methods: {
    userInfo() {
      this.$router.push({
        name: "about",
      });
    },
    // 搜索博客
    searchT() {
      if (this.$route.name === "home") this.$bus.$emit("search", this.sText);
      if (this.$route.name === "article")
        this.$bus.$emit("searchA", this.sText);
      // localStorage.setItem("search", this.searchText);
      this.sText = "";
    },
    //
    toUp() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<template>
  <div class="m-body">
    <div class="nav clearfix">
      <span class="title">Blog</span>
      <ul class="nav-list">
        <li class="nav-item">
          <RouterLink to="/" active-class="active" exact>首页</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/article" active-class="active">文章</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/file" active-class="active">归档</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" active-class="active">关于我</RouterLink>
        </li>
        <!-- <li class="nav-item">
          <RouterLink to="/detail" active-class="active">详情</RouterLink>
        </li> -->
      </ul>
      <!-- 输入框 -->
      <div class="search">
        <div
          v-show="this.$route.name === 'home' || this.$route.name === 'article'"
        >
          <input
            type="text"
            class="search-content"
            placeholder="请输入"
            v-model="sText"
          />
          <i class="iconfont icon-sousuo1 ser" @click="searchT"></i>
          <!-- <img
            src="../public/static/sousuo.png"
            alt="搜索"
            @click="searchT"
            class="ser"
          /> -->
        </div>
      </div>
      <div class="user">
        <RouterLink to="/create" active-class="active">发布文章</RouterLink>
        <!-- <div class="userinfo" @click="userInfo">
          <sui-image src="./static/p1.jpeg" class="avatar" />
          <span>李海东</span>
        </div> -->
      </div>
    </div>
    <div class="main-content">
      <!-- 缓存需要的路由组件，可结合 include 指定具体组件 -->
      <keep-alive exclude="DetailVue">
        <RouterView></RouterView>
      </keep-alive>
      <i class="iconfont icon-zhiding up" @click="toUp"></i>
    </div>

    <!-- 底部 -->
    <FooterView></FooterView>
  </div>
</template>

<style scoped lang="less">
.m-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.nav {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  z-index: 9999;
  background-color: black;
  .title {
    // float: left;
    margin-left: 150px;
    // margin-right: 20px;
    margin-top: 15px;
    color: #ff5019;
    font-weight: 700;
    font-size: 22px;
  }
}
a {
  color: white;
}
// 导航
.nav-list {
  // float: left;
  height: 50px;
  width: 450px;
  .nav-item {
    float: left;
    height: 50px;
    font-size: 20px;
    margin: 0 20px 0 0;
    padding: 0 10px;
    line-height: 50px;
    &:hover {
      background-color: #4a4a4a;
    }
  }
}
// 搜索
.search {
  // float: left;
  position: relative;
  height: 50px;
  width: 300px;
  input {
    height: 30px;
    width: 300px;
    margin: 10px 0 0 0;
    border: 1px solid #989898;
    border-radius: 15px;
    padding-left: 10px;
    color: #989898;
    background-color: black;
    &:hover {
      border: 1px solid white;
    }
  }
  .ser {
    position: absolute;
    top: 15px;
    left: 85%;
    cursor: pointer;
    color: #ff5019;
  }
}
// 活动导航栏
.active {
  color: #ff5019;
}
// 用户
.user {
  // float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  a {
    margin-right: 50px;
    border: 2px solid #ff5019;
    border-radius: 5px;
    padding: 5px;
  }
  span {
    font-size: 14px;
    color: white;
    margin-left: 5px;
  }
  .userinfo {
    cursor: pointer;
  }
}

// 内容
.main-content {
  width: 1200px;
  margin: 100px auto;
}
.up {
  position: fixed;
  top: 700px;
  right: 150px;
  border: 1px solid #ff5019;
  border-radius: 15px;
  padding: 10px;
  color: #ff5019;
  cursor: pointer;
  z-index: 999;
  &:hover {
    background-color: #ff5019;
    color: white;
  }
  &:active {
    color: black;
  }
}
</style>
