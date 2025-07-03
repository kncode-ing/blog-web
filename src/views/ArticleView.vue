<script>
import BlogView from "@/components/BlogView.vue";
import blogApi from "@/utils/api/blogApi";
import typeApi from "@/utils/api/typeApi";
import tagApi from "@/utils/api/tagApi";
// md转HTML
import MarkdownIt from "markdown-it";
export default {
  name: "articleVue",
  components: {
    BlogView,
  },
  data() {
    return {
      TypeList: [], //分类
      tagList: [], //标签
      articleList: [], //文章
      total: 0,
      searchModel: {
        //  初始值
        pageNo: 1,
        //  默认显示
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.getAllType();
    this.getAllTag();
    this.getArticleList();
    this.$bus.$on("searchA", (data) => {
      this.searchModel.articleTitle = data;
      this.getArticleList();
    });
  },
  activated() {
    this.searchModel.articleTitle = "";
    this.searchModel.articleContentType = "";
    this.searchModel.articleTag = "";
    this.getArticleList();
  },
  beforeDestroy() {
    this.$bus.$off("searchA");
  },
  methods: {
    // 获取博客
    getArticleList() {
      blogApi.getArticleList(this.searchModel).then((res) => {
        this.articleList = res.data.rows;
        this.total = res.data.total;

        const arr = [...this.articleList];
        const md = new MarkdownIt();
        arr.forEach((item) => {
          item.articleContent = md.render(item.articleContent);
        });
        this.articleList = arr;
      });
    },
    // 获取分类
    getAllType() {
      typeApi.getAllType().then((response) => {
        // 获取数据
        this.TypeList = response.data;
      });
    },
    // 获取对应分类
    getType(type) {
      this.searchModel.articleContentType = type;
      this.getArticleList();
    },
    // 获取分类
    getAllTag() {
      tagApi.getAllTag().then((response) => {
        // 获取数据
        this.tagList = response.data;
      });
    },
    // 获取对应分类
    getTag(tag) {
      this.searchModel.articleTag = tag;
      this.getArticleList();
    },
    // 分页
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getArticleList();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getArticleList();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="type">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">分类</span>
        <span class="title"
          >共<span class="total">{{ TypeList.length }}</span
          >类</span
        >
      </div>
      <!-- 分类 -->
      <ul class="list">
        <li
          v-for="item in TypeList"
          :key="item.typeId"
          class="item"
          @click="getType(item.typeType)"
        >
          <a class="ui orange basic left label">{{ item.typeType }}</a>
        </li>
      </ul>
    </div>
    <div class="type">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">标签</span>
        <span class="title"
          >共<span class="total">{{ tagList.length }}</span
          >类</span
        >
      </div>
      <!-- 标签 -->
      <ul class="list">
        <li
          v-for="item in tagList"
          :key="item.tipId"
          class="item"
          @click="getTag(item.tipType)"
        >
          <a class="ui orange basic left label">{{ item.tipType }}</a>
        </li>
      </ul>
    </div>
    <BlogView :article="articleList" :articleTotal="total"></BlogView>
    <!-- 分页组件 -->
    <el-pagination
      class="page"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<style lang="less" scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  .type {
    margin-bottom: 20px;
  }
}

.list {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(152, 152, 152, 0.6);
  border-top: 0;
  .item {
    float: left;
    padding: 10px;
    a {
      color: #ff5019;
    }
  }
}
.page {
  margin: 20px 200px;
}
</style>
