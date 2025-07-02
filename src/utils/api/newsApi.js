import request from '../reques.js';

export default{
    //获取所有类型
    getAllNews() {
      return request.get('/news/list');
    },
    // 修改
   updateNews(newsDate){
     return request({
        method:'put',
        url:'/news',
        data:newsDate
     })
   },
  // 新增分类
  addNews(newsData) {
    return request({
      method:'post',
      url:'/news', 
      data:newsData
    })
  },
  // 删除分类
  deleteNews(id) {
    return request({
       method:'delete',
       url:`/news/${id}`
    });
  }
}

