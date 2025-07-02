import request from '../reques.js';

export default{
    //获取所有标签
    getAllTag() {
      return request.get('/tag/list');
    },
    // 修改标签
   updateTag(tagDate){
     return request({
        method:'put',
        url:'/tag',
        data:tagDate
     })
   },
  // 新增标签
  addTag(tagData) {
    return request({
      method:'post',
      url:'/tag', 
      data:tagData
    })
  },
  // 删除标签
  deleteTag(id) {
    return request({
       method:'delete',
       url:`/tag/${id}`
    });
  }
}

