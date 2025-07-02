<script>
// 导入组件
import BlogView from "@/components/BlogView.vue";
// 导入接口
import blogApi from "@/utils/api/blogApi";
import typeApi from "@/utils/api/typeApi";
import tagApi from "@/utils/api/tagApi";
// md转HTML  npm install markdown-it 安装md转HTML在组件中使用
import MarkdownIt from "markdown-it";
// npm install github-markdown-css 安装md样式
import "github-markdown-css/github-markdown.css";
export default {
  name: "HomeVue",
  components: {
    BlogView,
  },
  data() {
    return {
      TypeList: [], //分类
      TagList: [], //标签
      newArticle: [], //最新
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
    this.$bus.$on("search", (data) => {
      this.searchModel.articleTitle = data;
      this.getArticleList();
    });
  },
  beforeDestroy() {
    this.$bus.$off("search");
  },
  activated() {
    this.searchModel.articleTitle = this.$store.state.searchText;
    this.getArticleList();
  },
  // deactivated() {
  //   this.$store.state.searchText = "";
  // },
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
        arr.sort((a, b) => {
          const dateA = new Date(a.articleTime);
          const dateB = new Date(b.articleTime);
          return dateB - dateA;
        });
        this.newArticle = arr.slice(0, 5);
      });
    },
    // 获取分类
    getAllType() {
      typeApi.getAllType().then((response) => {
        // 获取数据
        this.TypeList = response.data;
        this.TypeList = this.TypeList.slice(0, 6);
      });
    },
    // 获取对应分类
    getType(type) {
      this.searchModel.articleTag = "";
      this.searchModel.articleContentType = type;
      this.getArticleList();
    },
    // 获取标签
    getAllTag() {
      tagApi.getAllTag().then((response) => {
        // 获取数据
        this.TagList = response.data;
        this.TagList = this.TagList.slice(0, 7);
      });
    },
    // 获取对应标签
    getTag(tag) {
      this.searchModel.articleContentType = "";
      this.searchModel.articleTag = tag;
      this.getArticleList();
    },
    // 更多
    more() {
      this.$router.push({
        name: "article",
      });
    },
    // 发布文章
    toArticle() {
      this.$router.push({
        name: "create",
      });
    },
    // 详情页
    toDetail(id) {
      this.$router.push({
        name: "detail",
        params: {
          id,
          route: "HomeVue",
        },
      });
    },
    // 分页
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getArticleList();
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getArticleList();
    },
  },
};
</script>

<template>
  <!-- 博客 -->
  <div class="content">
    <!-- 帖子 -->
    <div class="blog">
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

    <!-- 侧边栏 -->
    <div class="card">
      <!-- 分类 -->
      <div class="article-kind">
        <!-- 头部 -->
        <div class="r-header">
          <div class="kind">
            <img src="../../public/static/fenlei.png" alt="" />
            <span>分类</span>
          </div>
          <span class="more" @click="more"
            >more&nbsp;<img src="../../public/static/htmal5icon45.png"
          /></span>
        </div>
        <!-- 内容 -->
        <div class="kind-content">
          <ul class="list">
            <li
              v-for="item in TypeList"
              :key="item.typeId"
              class="item"
              @click="getType(item.typeType)"
            >
              <!-- 分类名称 -->
              <span>{{ item.typeType }}</span>
              <!-- 分类总数 -->
              <div class="ui orange basic left pointing label">
                {{ item.typeNum }}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 标签 -->
      <div class="article-tag">
        <!-- 标签头部 -->
        <div class="r-header">
          <div class="kind">
            <img src="../../public/static/24gl-tags4.png" alt="" />
            <span>标签</span>
          </div>
          <span class="more" @click="more"
            >more&nbsp;<img src="../../public/static/htmal5icon45.png" alt=""
          /></span>
        </div>
        <!-- 标签总类 -->
        <div class="tag-type">
          <ul>
            <li
              v-for="item in TagList"
              :key="item.TipId"
              class="tag-item"
              @click="getTag(item.tipType)"
            >
              <a class="ui orange basic left pointing label">
                {{ item.tipType }}&nbsp;&nbsp;{{ item.tipNum }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 推荐 -->
      <div class="article-news">
        <!-- 头部 -->
        <div class="r-header">
          <div class="kind">
            <img src="../../public/static/tuijian.png" alt="" />
            <span>最新推荐</span>
          </div>
          <span class="more" @click="more"
            >more&nbsp;<img src="../../public/static/htmal5icon45.png" alt=""
          /></span>
        </div>
        <!-- 最新内容 -->
        <div class="news-content">
          <ul class="list">
            <li
              v-for="item in newArticle"
              :key="item.articleId"
              class="item"
              @click="toDetail(item.articleId)"
            >
              <span>{{ item.articleTitle }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  display: flex;
  width: 100%;
}
.blog {
  margin-right: 20px;
}
.page {
  margin: 20px 180px 0 180px;
}

// 侧边栏
.article-kind,
.article-tag,
.article-news {
  width: 300px;
  // height: 335px;
  border: 1px solid rgba(152, 152, 152, 0.6);
  margin-bottom: 30px;
}
// 卡片头部
.r-header {
  display: flex;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  justify-content: space-between;
  border-bottom: 2px solid #ff5019;
  background-color: #f0f0f0;
  .kind {
    padding-left: 10px;
    img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
  }
  .more {
    padding-right: 10px;
    color: #ff5019;
    img {
      width: 15px;
      height: 15px;
      vertical-align: middle;
    }
    &:hover {
      cursor: pointer;
      background-color: #e0e0e0;
    }
  }
}
// 分类内容
.kind-content {
  .list {
    margin: 20px;
    border: 1px solid rgba(152, 152, 152, 0.6);
    .item {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-bottom: 1px solid rgba(152, 152, 152, 0.6);
      &:last-child {
        border: 0;
      }
      div {
        float: right;
        margin-right: 10px;
        margin-top: 5px;
      }
    }
  }
}
// 标签内容
.article-tag {
  height: 200px;
  .tag-type {
    margin-top: 4px;
    .tag-item {
      float: left;
      margin: 0 15px 10px 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
// 最新推荐
.article-news {
  // height: 335px;
  .list {
    .item {
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-bottom: 1px solid rgba(152, 152, 152, 0.6);
      &:last-child {
        border: 0;
      }
      div {
        float: right;
        margin-right: 10px;
        margin-top: 5px;
        color: #ff5019;
      }
    }
  }
}

//
.item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
