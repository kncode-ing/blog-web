<script>
import userApi from "@/utils/api/userApi";

export default {
  name: "blogView",
  props: ["article", "articleTotal"],
  data() {
    return {
      userList: [],
      List: [],
    };
  },
  methods: {
    // 获取用户信息
    getUser() {
      userApi.getAllUser().then((res) => {
        this.userList = res.data;
      });
    },
    // 点击博客进入详情页
    toDetail(item) {
      this.$router.push({
        name: "detail",
        params: {
          id: item.articleId,
          route: "blogView",
        },
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
<template>
  <div class="blog">
    <!-- 博客总数 -->
    <div class="m-header">
      <span class="title">博客</span>
      <span class="title"
        >共<span class="total">{{ articleTotal }}</span
        >篇</span
      >
    </div>
    <!-- 博客内容 -->
    <div class="article">
      <ul class="article-list">
        <li
          class="article-item"
          v-for="item in article"
          :key="item.articleId"
          @click="toDetail(item)"
        >
          <!-- 标题 -->
          <span class="article-title">{{ item.articleTitle }}</span>
          <div class="article-content clearfix">
            <!-- 正文 -->
            <div v-html="item.articleContent" class="cont"></div>
            <!--  -->
            <img
              :src="'http://localhost:9999/image/' + item.articlePicture"
              class="article-img"
            />
          </div>
          <div class="article-detail">
            <div
              v-for="user in userList"
              :key="user.userId"
              v-show="item.userId === user.userId"
            >
              <img
                :src="'http://localhost:9999/image/' + user.userAvatar"
                class="aur"
              />
              <span class="article-name">{{ user.userUsername }}</span>
            </div>
            <!-- <img src="../../public/static/p1.jpeg" alt="" class="aur" />
            <span class="article-name">李海东</span> -->
            <div class="article-time">
              <img src="../../public/static/riqi.png" alt="" />
              <span>{{ item.articleTime }}</span>
            </div>
            <div class="article-watch">
              <img src="../../public/static/chakan.png" alt="" />
              <span>{{ item.articleWatch }}</span>
            </div>
            <span class="article-type">{{ item.articleType }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!articleTotal" class="none">暂无博客</div>
  </div>
</template>

<style lang="less" scoped>
@import "../assets/blog.css";
.article {
  .article-item {
    &:hover {
      border: 1px solid #ff5019;
    }
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
