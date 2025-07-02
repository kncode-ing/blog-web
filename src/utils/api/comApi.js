import request from '../reques.js';

export default{
  //获取查询条件
   getCommentList(searchModel){//查询条件
      return request({
        url: '/comment/list',//路径
        method: 'get',
        params:{//参数
          pageNo: searchModel.pageNo,
          pageSize: searchModel.pageSize,
          userId: searchModel.userId,
          articleId:searchModel.articleId
        }
      });
    },
    // 修改评论
   updateComment(comData){
     return request({
        method:'put',
        url:'/comment',
        data:comData
     })
   },
  // 发布评论
  addComment(comData) {
    return request({
      method:'post',
      url:'/comment', 
      data:comData
    })
  },
  // 删除评论
  deleteCommentById(id) {
    return request({
       method:'delete',
       url:`/comment/${id}`
    });
  }
}

