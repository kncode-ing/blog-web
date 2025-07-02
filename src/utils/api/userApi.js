import request from '../reques.js';

export default{
    // 获取所有文章
  getAllUser(){
     return request({
      method:'get',
      url:'/user/all'
     })
  },
    getUserList(searchModel){//查询条件
      return request({
        url: '/user/list',//路径
        method: 'get',
        params:{//参数
          pageNo: searchModel.pageNo,
          pageSize: searchModel.pageSize,
          username: searchModel.username,
        }
      });
    },
      register(data) {
      return request({
        url: '/user/register',
        method: 'post',
        data
      })
    },
    //添加用户
    addUser(user){
      return request({
        url: '/user',
        method: 'post',
        data: user
      });
    },
    //修改用户
    updateUser(user){
      return request({
        url: '/user',
        method: 'put',
        data: user
      });
    },
    //判断添加还是修改
    saveUser(user){
      if(user.id == null && user.id == undefined){//添加
        return this.addUser(user);
      }
      return this.updateUser(user);//修改
    },
    getUserById(id){
      return request({
        url: `/user/${id}`,
        method: 'get'
      });
    },
    // 删除
    deleteUserById(id){
      return request({
        url: `/user/${id}`,
        method: 'delete'
      });
    },
 }