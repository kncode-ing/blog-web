<script>
import MarkdownIt from "markdown-it";

import blogApi from "@/utils/api/blogApi";
import comApi from "@/utils/api/comApi";
import userApi from "@/utils/api/userApi";
export default {
  name: "DetailVue",
  data() {
    return {
      showPopup: false,
      article: {},
      renderedContent: "",
      tag: [],
      user: {},
      userList: [],
      comList: [],
      commentContent: "",
      total: 0,
      searchModel: {
        //  初始值
        pageNo: 1,
        //  默认显示
        pageSize: 5,
      },
    };
  },
  methods: {
    // 返回
    back() {
      //使用back实现浏览器后退行为，这样savedPosition就有值
      this.$router.back();
    },
    // 获取用户信息
    getUser() {
      userApi.getAllUser().then((res) => {
        this.userList = res.data;
      });
    },
    // 根据id获取当前博客
    getArticleById() {
      blogApi.getArticleById(this.$route.params.id).then((res) => {
        this.article = res.data;
        this.searchModel.articleId = this.article.articleId;
        this.tag = this.article.articleTag.split(" ");
        this.getUserById();
        this.getCom();
        this.updateArticle();
        const md = new MarkdownIt();
        this.renderedContent = md.render(this.article.articleContent);
      });
    },
    getUserById() {
      userApi.getUserById(this.article.userId).then((res) => {
        this.user = res.data;
      });
    },
    // 获取评论
    getCom() {
      comApi.getCommentList(this.searchModel).then((res) => {
        this.comList = res.data.rows;
        this.total = res.data.total;
      });
    },
    // 修改博客观看次数
    updateArticle() {
      if (this.$route.params.route !== "FileVue") {
        this.article.articleWatch = this.article.articleWatch + 1;
        blogApi.updateArticle(this.article);
      }
    },
    // 发布评论
    submitCom() {
      if (this.commentContent === "") {
        alert("请输入内容再发布！！！");
        return;
      }
      const com = {};
      com.articleId = this.article.articleId; //博客id
      com.userId = Math.floor(Math.random() * 5) + 1; //评论人id
      com.commentContent = this.commentContent; //评论内容
      com.commentTime = new Date() //评论时间
        .toISOString()
        .slice(0, 19) // 截取 '2025-06-17T12:30:00'
        .replace("T", " "); // 替换为 '2025-06-17 12:30:00'
      comApi.addComment(com).then((res) => {
        this.commentContent = "";
        this.$message({
          message: res.message,
          type: "success",
        });
      });
    },
    // 分页
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCom();
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo;
      this.getCom();
    },
  },
  mounted() {
    this.getArticleById();
    this.getUser();
  },
};
</script>

<template>
  <div class="ui container m-container">
    <a class="ui basic orange label m-back" @click="back">返回</a>
    <sui-segments raised>
      <!-- 头部 -->
      <sui-segment class="m-header">
        <sui-list class="ui horizontal link list">
          <sui-list-item>
            <sui-image
              :src="'http://localhost:9999/image/' + user.userAvatar"
              class="ui avatar image"
            />
            <div class="content">
              <a href="#">{{ user.userUsername }}</a>
            </div>
          </sui-list-item>
          <sui-list-item>
            <sui-icon name="calendar" /> {{ article.articleTime }}
          </sui-list-item>
          <sui-list-item>
            <sui-icon name="eye" /> {{ article.articleWatch }}
          </sui-list-item>
          <!-- <sui-list-item>
            <sui-icon name="like" />
            {{ article.articleLike }}
          </sui-list-item> -->
        </sui-list>
      </sui-segment>
      <!-- 图片 -->
      <sui-segment>
        <sui-image
          :src="'http://localhost:9999/image/' + article.articlePicture"
          centered
        />
      </sui-segment>
      <!-- 正文 -->
      <sui-segment>
        <!-- 原创 -->
        <div class="ui right aligned basic segment">
          <div class="ui basic orange label">{{ article.articleType }}</div>
        </div>
        <!-- 标题 -->
        <h2 is="sui-header" icon text-align="center">
          <sui-header-content>{{ article.articleTitle }}</sui-header-content>
        </h2>
        <!-- 内容 -->
        <div class="m-content">
          <div class="markdown-content" v-html="renderedContent"></div>
        </div>
        <!-- 标签 -->
        <div class="m-content">
          <div
            class="ui basic left pointing red label"
            v-for="(i, index) in tag"
            :key="index"
          >
            {{ i }}
          </div>
        </div>
        <!-- 赞赏 -->
        <div
          v-show="article.articleIstip"
          class="ui center aligned basic segment"
          style="position: relative"
        >
          <sui-button
            slot="trigger"
            basic
            color="orange"
            @click="showPopup = !showPopup"
            >赞赏</sui-button
          >
          <sui-grid centered v-show="showPopup" class="m-popup">
            <sui-grid-column text-align="center" :width="5">
              <sui-image src="../static/pay.jpg" size="small" />
              <sui-card-content>
                <sui-card-description> 支付宝 </sui-card-description>
              </sui-card-content>
            </sui-grid-column>
            <sui-grid-column text-align="center" :width="5">
              <sui-image src="../static/pay.jpg" size="small" />
              <sui-card-content>
                <sui-card-description> 支付宝 </sui-card-description>
              </sui-card-content>
            </sui-grid-column>
          </sui-grid>
        </div>
      </sui-segment>
      <!-- 博客信息 -->
      <sui-segment>
        <sui-grid class="m-grid-info">
          <sui-grid-row>
            <sui-grid-column :width="12" class="m-info">
              <div>
                <a href="#">作者：{{ user.userUsername }}</a>
                <p>发表时间：{{ article.articleTime }}</p>
                <p>版权声明：{{ article.articleDescription || "暂无声明" }}</p>
                <p>
                  公众号转载：{{ article.articleDescription || "赞无公众号" }}
                </p>
              </div>
            </sui-grid-column>
            <sui-grid-column :width="3">
              <sui-image src="../static/wx.jpg" size="small" />
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-segment>
      <!-- 热门评论 -->
      <sui-segment v-show="article.articleIscomment" color="orange">
        <sui-comment-group>
          <h3 is="sui-header" dividing>热门评论</h3>
          <sui-comment v-for="item in comList" :key="item.commentId">
            <sui-comment-content
              v-for="user in userList"
              :key="user.userId"
              v-show="item.userId === user.userId"
            >
              <sui-comment-avatar
                :src="'http://localhost:9999/image/' + user.userAvatar"
                style="margin-right: 10px"
              />
              <a is="sui-comment-author">{{ user.userUsername }}</a>
              <sui-comment-metadata>
                <div>{{ item.commentTime }}</div>
              </sui-comment-metadata>
              <sui-comment-text>{{ item.commentContent }}</sui-comment-text>
              <!-- <sui-comment-actions>
                <sui-comment-action>Reply</sui-comment-action>
              </sui-comment-actions> -->
            </sui-comment-content>
            <!-- <sui-comment-group v-if="item.commentReply">
              <sui-comment>
                <sui-comment-avatar src="../static/p1.jpeg" />
                <sui-comment-content>
                  <a is="sui-comment-author">Jenny Hess</a>
                  <sui-comment-metadata>
                    <div>{{ item.commentTime }}</div>
                  </sui-comment-metadata>
                  <sui-comment-text>
                    {{ item.commentContent }}
                  </sui-comment-text>
                  <sui-comment-actions>
                    <sui-comment-action>Reply</sui-comment-action>
                  </sui-comment-actions>
                </sui-comment-content>
              </sui-comment>
            </sui-comment-group> -->
          </sui-comment>
          <sui-comment>
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
          </sui-comment>
        </sui-comment-group>
      </sui-segment>
      <!-- 不允许评论 -->
      <sui-segment v-show="!article.articleIscomment">
        <h2 is="sui-header" icon text-align="center">
          <sui-header-content>博客不允许评论</sui-header-content>
        </h2>
      </sui-segment>
      <!-- 发布评论 -->
      <sui-segment color="orange">
        <sui-segments>
          <sui-segment>
            <sui-form>
              <sui-form-field>
                <label>发布评论</label>
                <textarea v-model="commentContent"></textarea>
              </sui-form-field>
              <sui-form-field>
                <sui-button class="orange" @click="submitCom">发布</sui-button>
              </sui-form-field>
              <!-- <sui-form-fields inline>
                <sui-form-field inline width="five">
                  <input type="text" placeholder="请输入姓名" />
                </sui-form-field>
                <sui-form-field inline width="five">
                  <input type="text" placeholder="请输入邮箱" />
                </sui-form-field>
                <sui-form-field width="two">
                  <sui-button type="submit" class="orange">发布</sui-button>
                </sui-form-field>
              </sui-form-fields> -->
            </sui-form>
          </sui-segment>
        </sui-segments>
      </sui-segment>
    </sui-segments>
  </div>
</template>

<style lang="less" scoped>
.m-back {
  position: fixed;
  left: 1300px;
}
.m-container {
  width: 60rem;
}
.m-content {
  width: 100%;
  padding: 20px 40px;
  .markdown-content {
    img {
      width: 500px;
      height: auto; /* 高度自动等比例缩放 */
      display: block; /* 去除底部间隙 */
      margin: 0 auto 1rem; /* 居中并添加底部间距 */
    }
  }
}
.m-popup {
  position: absolute !important; /* 脱离文档流 */
  z-index: 9999 !important; /* 确保层级高 */
  top: -110px;
  left: 250px;
}
.m-grid-info {
  background-color: #f9ffec;
  .m-info {
    margin-left: 50px;
    color: rgb(103, 103, 255);
    a {
      display: block;
      margin-top: 10px;
      margin-bottom: 10px;
      text-decoration-line: underline;
      color: rgb(103, 103, 255);
    }
  }
}
.page {
  margin-left: 180px;
}
</style>
