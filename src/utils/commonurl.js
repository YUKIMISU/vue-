//测试环境使用地址
let baseurl = "http://192.168.3.26:6026";
// let baseurl = "http://192.168.22.37:6026";
//线上打包使用地址
// let baseurl = "http://report.wsloan.com:8888/workorderapi";  
export function getUploadUrl(){
    let uploadUrl = baseurl+'/upload.do';
    // let uploadUrl = baseurl+'/projectManage/uploadFile';
    return uploadUrl;
}

export function getRequestUrl(){
    let requestUrl = baseurl;
    // let requestUrl = baseurl+'/projectManage';
    return requestUrl;
}