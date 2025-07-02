<script>
// import EditorView from "@/components/EditorView.vue";

export default {
  name: "AboutVue",
  methods: {
    manager() {
      this.$router.push({
        name: "manager",
      });
    },
  },
};
</script>

<template>
  <div class="ui container">
    <sui-segment attached="top">
      <sui-image
        circular
        src="../static/tou.jpg"
        size="tiny"
        vertical-align="middle"
      />
      <span>肯纳</span>
      <sui-button
        color="orange"
        content="管理博文"
        floated="right"
        @click="manager"
      />
    </sui-segment>
    <sui-segment attached>
      <h2 is="sui-header" icon text-align="center">
        <sui-header-content>关于我</sui-header-content>
      </h2>
      <p>
        我是一个独立开发者，23届应届生，软件工程专业，喜欢前端，喜欢写代码，有时间会完成更多的项目。
      </p>
      <p>爱好：喜欢编程，正在完成更多的项目，喜欢玩游戏，热爱生活</p>
    </sui-segment>
    <!-- <sui-segment attached="bottom">
      <p>This segment is on bottom</p>
    </sui-segment> -->
  </div>
</template>

<style lang="less" scoped></style>
