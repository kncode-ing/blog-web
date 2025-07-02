import request from "../reques.js";

export default {
  // 获取所有文章
  getAllArticle(){
     return request({
      method:'get',
      url:'/article/all'
     })
  },
  //获取查询条件
   getArticleList(searchModel){//查询条件
      return request({
        url: '/article/list',//路径
        method: 'get',
        params:{//参数
          pageNo: searchModel.pageNo,
          pageSize: searchModel.pageSize,
          articleTitle: searchModel.articleTitle,
          articleContentType:searchModel.articleContentType,
          articleTag:searchModel.articleTag
        }
      });
    },
    // 获取id
   getArticleById(id){
      return request({
        method:'get',
        url:`/article/${id}`,
      })
   },
    // 图片上传
  uploadArticleImage(data) {
    return request({
      method: 'post',
      url: '/article/upload', // 这里的路径要和后台接口的映射路径一致，比如后台是 /upload，这里要对应好
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
   // 删除图片
  deleteArticleImage(fileName) {
    return request({
      url: `/article/deleteImage`,
      method: 'delete',
      params:{
        fileName:fileName
      }
    });
  },
  // 发布文章
  submitArticle(articleData) {
    return request({
      method: "post",
      url: "/article",
      data: articleData,
    });
  },
  // 删除文章
  deleteArticle(id) {
    return request({
      method: "delete",
      url: `/article/${id}`,
    });
  },
  // 修改文章
  updateArticle(article){
    return request({
      url:'/article',
      method:'put',
      data:article
    })
  }
};
