import request from '../reques.js';

export default{
    //获取所有类型
    getAllType() {
      return request.get('/type/list');
    },
    // 修改
   updateType(typeDate){
     return request({
        method:'put',
        url:'/type',
        data:typeDate
     })
   },
  // 新增分类
  addType(typeData) {
    return request({
      method:'post',
      url:'/type', 
      data:typeData
    })
  },
  // 删除分类
  deleteType(id) {
    return request({
       method:'delete',
       url:`/type/${id}`
    });
  }
}

