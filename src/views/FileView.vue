<script>
import blogApi from "@/utils/api/blogApi";
// md转HTML
import MarkdownIt from "markdown-it";
export default {
  name: "FileVue",
  data() {
    return {
      articleList: [], //文章
    };
  },
  mounted() {
    this.getArticleList();
  },
  computed: {
    // 使用reduce函数进行年份分组
    groupedArticles() {
      return this.articleList.reduce((acc, article) => {
        const year = new Date(article.articleTime).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
      }, {});
    },
    // 对年份进行降序排序
    sortYears() {
      return Object.keys(this.groupedArticles).sort((a, b) => b - a);
    },
  },
  methods: {
    // 获取博客
    getArticleList() {
      blogApi.getAllArticle().then((res) => {
        this.articleList = res.data;
        const arr = [...this.articleList];
        const md = new MarkdownIt();
        arr.forEach((item) => {
          item.articleContent = md.render(item.articleContent);
        });
        this.articleList = arr;
      });
    },
    // 详情页
    toDetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id,
          route: "FileVue",
        },
      });
    },
  },
};
</script>

<template>
  <div class="content">
    <div class="total">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">归档</span>
        <span class="title"
          >共<span class="total">{{ articleList.length }}</span
          >篇博客</span
        >
      </div>
    </div>

    <div class="year-type">
      <div v-for="(year, index) in sortYears" :key="index" class="items">
        <h1>{{ year }} 年</h1>
        <ul class="list">
          <li
            v-for="article in groupedArticles[year]"
            :key="article.articleId"
            class="item"
            @click="toDetail(article.articleId)"
          >
            <span class="title">{{ article.articleTitle }}</span>
            <div class="ui basic orange label">{{ year }}</div>
            <div class="ui basic red label">{{ article.articleType }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  .total {
    margin-bottom: 20px;
  }
}

.year-type {
  margin-top: 50px;
  .items {
    margin-top: 50px;
  }
  h1 {
    text-align: center;
  }
  .list {
    border: 1px solid rgba(152, 152, 152, 0.6);
  }
  .item {
    height: 40px;
    padding: 10px 0 0 20px;
    border-bottom: 1px solid rgba(152, 152, 152, 0.6);
    &:last-child {
      border: 0;
    }
    .title {
      margin-right: 20px;
    }
    div {
      margin-top: -4px;
      &:last-child {
        float: right;
        margin-right: 20px;
      }
    }
    &:hover {
      background-color: #f7f7f7;
      cursor: pointer;
    }
  }
}
.page {
  margin: 20px 300px;
}
</style>
