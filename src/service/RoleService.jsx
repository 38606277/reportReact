import   HttpService  from '../util/HttpService.jsx';
class Role{
    
    getRoleList(listParam){
        return HttpService.post(
            '/reportServer/role/getRoleList',
            JSON.stringify(listParam)
         );
    }
    getRoleInfo(roleId){
        return HttpService.post('/reportServer/role/getRoleInfoById',roleId);
    }
    saveRoleInfo(roleInfo){
        if(roleInfo._id=='null'){
            return HttpService.post('/reportServer/role/addRole',JSON.stringify(roleInfo));
        }else{
            return HttpService.post('/reportServer/role/updateRole',JSON.stringify(roleInfo));
        }
    }
    delRole(id){
        return HttpService.post('/reportServer/role/deleteRole',id);
    }
    getUserListByRoleId(roleId){
        return HttpService.post('/reportServer/role/getUserListByRoleId',roleId);
    }
    saveUserId(params){
        return HttpService.post('/reportServer/role/saveOrupdateUserId',JSON.stringify(params));
    }
}

export default Role;