<script>
import blogApi from "../utils/api/blogApi";
import typeApi from "@/utils/api/typeApi";
import tagApi from "@/utils/api/tagApi";

export default {
  name: "createVue",
  data() {
    return {
      article: {},
      typeList: [],
      tagList: [],
      tempFile: [], //临时存储上传的图片
      fileUrl: [], //存储上传的图片链接
      // titleError: false, //标题验证
      // contentError: false, //正文验证
      articleTitle: "", //文章标题
      articleContent: "", //文章内容
      currentTitle: "原创", //原创标题
      currentType: "其他", //文章分类
      currentTag: null, //标签
      articlePic: "", //图片
      articleDescription: "", //转载说明
      isComment: true, //是否可以评论
      isTip: true, //是否可以打赏
      isDes: true, //转载
      dropdownOptions: [
        { text: "原创", value: "原创" },
        { text: "转载", value: "转载" },
        { text: "翻译", value: "翻译" },
      ],
      dropdownType: [],
      dropdownTag: [],
    };
  },
  mounted() {
    this.getTag();
    this.getType();
  },

  methods: {
    //获取分类
    getType() {
      typeApi.getAllType().then((res) => {
        this.typeList = res.data;
        this.dropdownType = res.data.map((item) => ({
          key: item.typeId,
          text: item.typeType,
          value: item.typeType,
        }));
      });
    },
    // 获取标签
    getTag() {
      tagApi.getAllTag().then((res) => {
        this.tagList = res.data;
        this.dropdownTag = res.data.map((item) => ({
          key: item.tipId,
          text: item.tipType,
          value: item.tipType,
        }));
      });
    },
    //创建文章对象
    createArticle() {
      this.article.articleTitle = this.articleTitle.trim(); //文章标题
      this.article.userId = Math.floor(Math.random() * 5) + 1; //发布人id
      this.article.articlePicture = this.articlePic; //主图
      this.article.articleContent = this.articleContent.trim(); //正文
      this.article.articleTime = new Date()
        .toISOString()
        .slice(0, 19) // 截取 '2025-06-17T12:30:00'
        .replace("T", " ") // 替换为 '2025-06-17 12:30:00'
        .slice(0, 10);
      if (this.currentTag === null) {
        this.article.articleTag = "其他"; // 标签
      } else {
        this.article.articleTag = this.currentTag.join(" "); // 标签
      }
      this.article.articleContentType = this.currentType; //文章分类
      this.article.articleDescription = this.articleDescription; //转载说明
      this.article.articleType = this.currentTitle; //原创类型
      this.article.articleWatch = 0; //观看数
      this.article.articleLike = 0; //喜欢数
      this.article.articleIscomment = this.isComment; //可评论的
      this.article.articleIstip = this.isTip; //可赞赏的
    },
    // 清空
    clearData() {
      console.log(this.$refs.md);
      console.log(this.$refs.md.$editor);
      (this.articleTitle = " "), //文章标题
        (this.articleContent = " "), //文章内容
        (this.currentTitle = "原创"), //原创标题
        (this.currentType = null), //文章分类
        (this.currentTag = null), //标签
        (this.articlePic = ""), //图片
        (this.articleDescription = ""); //转载说明
      this.fileUrl = [];
      this.tempFile = [];
    },
    //修改
    updataTypeTag() {
      // 分类
      const selectedTypeObj = {};
      const targetObj = this.dropdownType.find(
        (item) => item.value === this.article.articleContentType
      );
      selectedTypeObj.typeId = targetObj.key;
      selectedTypeObj.typeType = targetObj.value;
      const curObj = this.typeList.find(
        (item) => item.typeType === this.article.articleContentType
      );
      selectedTypeObj.typeNum = curObj.typeNum + 1;
      typeApi.updateType(selectedTypeObj);

      // 标签
      const arr = this.article.articleTag.split(" ");
      const selectedTagObj = {};
      const tagObj = arr.map((tag) =>
        this.dropdownTag.find((item) => item.value === tag)
      );
      tagObj.forEach((item) => {
        selectedTagObj.tipId = item.key;
        selectedTagObj.tipType = item.value;
        const curTObj = this.tagList.find((tip) => tip.tipType === item.value);
        selectedTagObj.tipNum = curTObj.tipNum + 1;
        tagApi.updateTag(selectedTagObj);
      });
    },
    //发布
    async submitArticle() {
      // 校验标题是否有值
      if (!this.articleTitle.trim()) {
        // 标题为空，提示用户
        // this.titleError = true;
        this.$message({
          type: "error",
          message: "请输入文章标题！！！",
        });
        return;
      }
      // 校验内容是否有值
      if (!this.articleContent.trim()) {
        // this.contentError = true;
        this.$message({
          type: "error",
          message: "请输入文章内容！！！",
        });
        return;
      }
      // 校验主图是否有值
      if (!this.articlePic) {
        this.$message({
          type: "error",
          message: "必须选择主图",
        });
        return;
      }

      await this.upAllImage();
      this.createArticle();
      blogApi
        .submitArticle(this.article)
        .then((response) => {
          this.$message({
            message: response.message, // 提示内容
            type: "success", // 提示类型，positive 表示成功类的样式，还有 info、warning、negative 等
          });
          // 发布成功，对应的标签或类型增加
          this.updataTypeTag();
          // 清空内容
          this.clearData();
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            content: "文章发布失败，请重试",
            type: "negative",
            center: true,
          });
        });
    },

    // 点击按钮，触发文件选择框
    openFileDialog() {
      const input =
        this.$refs.fileInput.$el.querySelector('input[type="file"]');
      if (input) {
        this.loading = true;
        input.click();
      } else {
        console.error("未找到文件选择框");
      }
    },

    // element ui 上传成功后返回结果，图片的地址
    handleSuccess(res) {
      this.articlePic = res.message;
      this.loading = false;
      console.log(this.articlePic);
    },
    // 图片删除暂存
    delImage(file) {
      this.tempFile.forEach((item, index) => {
        if (item.id === file[0]) {
          this.tempFile.splice(index, 1);
        }
      });

      // try {
      //   blogApi.deleteArticleImage(file[0].slice(28));
      // } catch (error) {
      //   this.$message({
      //     type: "error",
      //     message: "图片删除失败",
      //   });
      // }
    },

    // 图片上传暂存
    uploadImage(index, file) {
      // 构建 FormData
      const formData = new FormData();
      formData.append("file", file);

      const obg = { id: index, file: formData };
      this.tempFile.push(obg);
    },
    // 图片上传
    async upAllImage() {
      // 上传所有图片并替换链接（用 Promise.all 确保全部完成）
      const uploadTasks = this.tempFile.map(async (item) => {
        try {
          const res = await blogApi.uploadArticleImage(item.file);
          if (res.code === 20000) {
            const imageUrl = `http://localhost:9999/image/${res.message}`;
            // 调用编辑器方法替换链接
            this.$refs.md.$img2Url(item.id, imageUrl);
          }
        } catch (error) {
          this.$message({ type: "error", message: "图片上传失败" });
        }
      });
      // 等待所有上传和替换完成
      await Promise.all(uploadTasks);
    },
  },
  watch: {
    // 监听标题的变化
    articleTitle: function () {
      if (this.articleTitle === "") {
        this.titleError = true;
      } else {
        this.titleError = false;
      }
    },
    // 监听内容的变化
    articleContent: function () {
      if (this.articleContent === "") {
        this.contentError = true;
      } else {
        this.contentError = false;
      }
    },
  },
};
</script>

<template>
  <div class="ui container">
    <form method="post" class="ui form" @submit.prevent>
      <!-- 标题 -->
      <div class="field">
        <div class="ui left labeled input" id="my-dropdown">
          <div class="ui compact orange dropdown label">
            <sui-dropdown
              text="原创"
              :options="dropdownOptions"
              v-model="currentTitle"
              style="z-index: 9999 !important"
            />
          </div>
          <sui-input
            type="text"
            name="title"
            placeholder="请输入标题"
            v-model="articleTitle"
          />
          <!-- <sui-label v-if="titleError" basic color="red" pointing="left"
            >请输入标题！！！</sui-label
          > -->
        </div>
      </div>
      <!-- 正文 -->
      <div class="field">
        <mavon-editor
          v-model="articleContent"
          ref="md"
          :toolbarsFlag="true"
          :subfield="true"
          :editable="true"
          :scrollStyle="true"
          :autofocus="false"
          @imgDel="delImage"
          @imgAdd="uploadImage"
          style="height: 500px"
        />
      </div>
      <!-- 标签和分类 -->
      <div class="two fields">
        <!-- 分类 -->
        <div class="field">
          <div class="ui left labeled action input">
            <label class="ui compact orange basic label">分类</label>
            <sui-dropdown
              style="z-index: 9999 !important"
              class="ui fluid selection dropdown"
              fluid
              placeholder="请选择分类"
              :options="dropdownType"
              v-model="currentType"
            />
          </div>
        </div>
        <!-- 标签 -->
        <div class="field">
          <div class="ui left labeled action input">
            <label class="ui compact orange basic label">标签</label>
            <sui-dropdown
              class="ui fluid selection dropdown"
              fluid
              multiple
              search
              placeholder="请选择标签"
              :options="dropdownTag"
              v-model="currentTag"
              style="z-index: 9999 !important"
            />
          </div>
        </div>
      </div>

      <!-- 主图 -->
      <div class="inline fields">
        <div class="field">
          <div class="ui left a image">
            <a class="ui orange basic label" @click="openFileDialog"
              >选择主图</a
            >
            <!-- 隐藏的文件上传控件，通过点击上方a链接来加载，用于实际选择文件 -->
            <el-upload
              ref="fileInput"
              style="display: none"
              action="/api/article/upload"
              :on-success="handleSuccess"
            >
            </el-upload>
          </div>
        </div>
        <div class="field">
          <sui-image
            v-if="articlePic"
            :src="'http://localhost:9999/image/' + articlePic"
            size="medium"
          />
        </div>
      </div>
      <!-- 管理功能 -->
      <div class="inline fields">
        <div class="field">
          <div class="ui checkbox">
            <sui-checkbox label="转载" v-model="isDes" />
          </div>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <sui-checkbox label="赞赏" v-model="isTip" />
          </div>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <sui-checkbox label="评论" v-model="isComment" />
          </div>
        </div>
      </div>
      <!-- 转载说明 -->
      <div class="field" v-show="isDes">
        <div class="ui left labeled input">
          <label class="ui compact orange basic label">转载说明</label>
          <input
            type="text"
            name="title"
            placeholder="转载说明"
            v-model="articleDescription"
          />
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="ui right aligned container">
        <sui-button color="grey" content="取消" @click="clearData" />

        <!-- <sui-button color="red" content="保存" />  -->

        <sui-button
          type="submit"
          color="orange"
          content="发布"
          @click="submitArticle"
        />
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped></style>
