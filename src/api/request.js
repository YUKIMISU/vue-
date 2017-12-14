import fetch from '../utils/fetch'
//login登陆
export function login(data){
  return fetch({
    url:'/workorder/user/login.do',
    method:'post',
    data:data
  })
}

//我的工单标题
export function myWorkOrder(data){
  return fetch({
    url:'/workOrderForPhone/myWorkOrder.do',
    method:'post',
    data:data
  })
}
//创建一条工单开始
//创建一条工单
export function addWorkOrder(data){
  return fetch({
    url:'/workorder/addWorkOrder.do',
    method:'post',
    data:data
  })
}
//获取一级类型
export function showTypeBySupIdAndGroup(data){
  return fetch({
    url:'/showTypeBySupIdAndGroup.do',
    method:'post',
    data:data
  })
}
//获取二级工单类型
export function showTypeBySupId(data){
  return fetch({
    url:'/showTypeBySupId.do',
    method:'post',
    data:data
  })
}
//工单处理人
export function getPeopleInfoByWorkOrderTypeId(data){
  return fetch({
    url:'/autoassign/getPeopleInfoByWorkOrderTypeId.do',
    method:'post',
    data:data
  })
}
//紧急程度
export function showFlg(data){
  return fetch({
    url:'/showFlg.do',
    method:'post',
    data:data
  })
}
//获取一条工单详情页
export function getOneworkorder(data){
  return fetch({
    url:'/workOrderForPhone/getOneworkorder.do',
    method:'post',
    data:data
  })
}
//回复信息
export function getRelevantPeopleBywoId(data){
  return fetch({
    url:'/workorderflow/getRelevantPeopleBywoId',
    method:'post',
    data:data
  })
}
//获取回复信息
export function addMessage(data){
  return fetch({
    url:'/workorderflow/addMessage.do',
    method:'post',
    data:data
  })
}
//处理中心
export function showCentreInfo(){
  return fetch({
    url:'/showCentreInfo.do',
    method:'post',
   
  })
}
//处理部门
export function showDeptnoInfo(data){
  return fetch({
    url:'/showDeptnoInfo.do',
    method:'post',
    data:data
  })
}
//处理组
export function showGroupInfo(data){
  return fetch({
    url:'/showGroupInfo.do',
    method:'post',
    data:data
  })
}
//处理人
export function findUserByGroupId(data){
  return fetch({
    url:'/findUserByGroupId.do',
    method:'post',
    data:data
  })
}
//指派
export function toDeptManage(data){
  return fetch({
    url:'/workorderflow/toDeptManage.do',
    method:'post',
    data:data
  })
}
//驳回
export function returnBack(data){
  return fetch({
    url:'/workorderflow/returnBack.do',
    method:'post',
    data:data
  })
}
//提审
export function submitWorkOrder(data){
  return fetch({
    url:'/workorderflow/submitWorkOrder.do',
    method:'post',
    data:data
  })
}
//移交
export function turnOver(data){
  return fetch({
    url:'/workorderflow/turnOver.do',
    method:'post',
    data:data
  })
}
//验收工单
export function finishWorkOrder(data){
  return fetch({
    url:'/workorderflow/finishWorkOrder.do',
    method:'post',
    data:data
  })
}
//退回工单
export function backWorkOrder(data){
  return fetch({
    url:'/workorderflow/backWorkOrder.do',
    method:'post',
    data:data
  })
}
//认领工单
export function claimWorkOrder(data){
  return fetch({
    url:'/workorderflow/claimWorkOrder.do',
    method:'post',
    data:data
  })
}
//待验收工单x详情页
export function beCheckWorkOrder(data){
  return fetch({
    url:'/workOrderForPhone/beCheckWorkOrder.do',
    method:'post',
    data:data
  })
}
//退出登陆
export function logout(){
  return fetch({
    url:'/workorder/user/logout.do',
    method:'get',
  })
}
//上传
export function upload(data){
  console.log('update')
  return fetch({
    url:'/upload.do',
    // method:'post',
    method:'post',
    data:data
  })
}
//自动登录
export function autoLogin(data){
  return fetch({
    url:'/workorder/user/autoLogin.do',
    method:'get',
    params:data
  })
}
//监控中的工单
export function wocontrol(data){
  return fetch({
    url:'/workOrderForPhone/wocontrol.do',
    method:'post',
    data:data
  })
}