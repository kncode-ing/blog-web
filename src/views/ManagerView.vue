<script>
// import BlogView from "@/components/BlogView.vue";
import blogApi from "@/utils/api/blogApi";
import typeApi from "@/utils/api/typeApi";
import tagApi from "@/utils/api/tagApi";
import userApi from "@/utils/api/userApi";
export default {
  name: "ManagerVue",
  components: {
    // BlogView,
  },
  data() {
    return {
      articleList: [], //文章
      userList: [],
      TypeList: [], //分类
      tagList: [], //标签
      total: 0,
      searchModel: {
        //  初始值
        pageNo: 1,
        //  默认显示
        pageSize: 10,
      },
    };
  },
  activated() {
    this.getArticleList();
  },
  methods: {
    // 获取用户信息
    getUser() {
      userApi.getAllUser().then((res) => {
        this.userList = res.data;
      });
    },
    // 获取博客
    getArticleList() {
      blogApi.getArticleList(this.searchModel).then((res) => {
        this.articleList = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 获取分类
    getAllType() {
      typeApi.getAllType().then((response) => {
        // 获取数据
        this.TypeList = response.data;
      });
    },
    // 获取分类
    getAllTag() {
      tagApi.getAllTag().then((response) => {
        // 获取数据
        this.tagList = response.data;
      });
    },
    addT(name) {
      this.$prompt(`请输入${name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          const t = {};
          if (name === "type") {
            t.typeType = value;
            t.typeNum = 0;
            typeApi.addType(t).then((res) => {
              this.getAllType();
              this.$message({
                type: "success",
                message: res.message,
              });
            });
          } else {
            t.tipType = value;
            t.tipNum = 0;
            tagApi.addTag(t).then((res) => {
              this.getAllTag();
              this.$message({
                type: "success",
                message: res.message,
              });
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 删除
    delT(name, t, id) {
      if (id <= 6) {
        this.$message({
          type: "error",
          message: "此博客不能删除，用于展示",
        });
        return;
      }
      this.$confirm(`此操作将永久删除${t}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (name === "type") {
            typeApi.deleteType(id).then(() => {
              this.getAllType();
            });
          } else if (name === "tag") {
            tagApi.deleteTag(id).then(() => {
              this.getAllTag();
            });
          } else {
            blogApi.deleteArticle(id).then(() => {
              this.getArticleList();
            });
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getArticleList();
    this.getAllType();
    this.getAllTag();
    this.getUser();
  },
};
</script>

<template>
  <div class="content">
    <div class="type">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">管理分类</span>
        <a class="title" @click="addT('type')">新增分类</a>
      </div>
      <!-- 分类 -->
      <ul class="list">
        <li v-for="item in TypeList" :key="item.typeId" class="item">
          <span class="ui orange basic left label">{{ item.typeType }}</span>
          <sui-icon
            name="delete"
            class="orange del"
            @click="delT('type', item.typeType, item.typeId)"
          />
        </li>
      </ul>
    </div>
    <div class="type">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">管理标签</span>
        <a class="title" @click="addT('tag')">新增标签</a>
      </div>
      <!-- 标签 -->
      <ul class="list">
        <li v-for="item in tagList" :key="item.tipId" class="item">
          <span class="ui orange basic left label">{{ item.tipType }}</span>
          <sui-icon
            name="delete"
            class="orange del"
            @click="delT('tag', item.tipType, item.tipId)"
          />
        </li>
      </ul>
    </div>
    <div class="blog">
      <!-- 博客总数 -->
      <div class="m-header">
        <span class="title">管理博客</span>
        <span class="title"
          >共<span class="total">{{ total }}</span
          >篇</span
        >
      </div>
      <!-- 博客内容 -->
      <div class="article">
        <ul class="article-list">
          <li
            class="article-item"
            v-for="item in articleList"
            :key="item.articleId"
          >
            <div class="m-blog">
              <span class="article-title">{{ item.articleTitle }}</span>
              <div class="article-content clearfix">
                <p>{{ item.articleContent }}</p>
                <img
                  :src="'http://localhost:9999/image/' + item.articlePicture"
                  class="article-img"
                />
              </div>
              <div class="article-detail">
                <!-- 用户信息 -->
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
            </div>

            <div class="edit">
              <!-- <el-button
                class="cli"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button> -->
              <el-button
                class="cli"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delT('article', item.articleTitle, item.articleId)"
              ></el-button>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!total" class="none">暂无博客</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../assets/blog.css";
.content {
  width: 1000px;
  margin: 0 auto;
  .type {
    margin-bottom: 20px;
    a {
      cursor: pointer;
    }
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
    .del {
      cursor: pointer;
      transition: all linear 0.2s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

.article-item {
  display: flex;
  .m-blog {
    width: 90%;
  }
  .edit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .cli {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      margin-left: 20px;
    }
  }
}
</style>
