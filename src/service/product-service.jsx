/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Product{
    // 获取商品列表
    getProductList(listParam){
      
        return _mm.request({
            type    : 'post',
            url     : 'http://localhost:8080/reportServer/dataCollect/getMyTaskByUserId',
            data    : JSON.stringify({perPage: '10',startIndex: '0', currentPage: '0',userId: '1' })
        });
    }
    // 获取商品详情
    getTaskInfo(taskId){
        return _mm.request({
            type    : 'post',
            url     : 'http://localhost:8080/reportServer/dataCollect/getTaskAndUsersByid',
            data    : JSON.stringify({ taskId:taskId  })
        });
    }
     // 获取模板详情
     getTaskTemplate(taskId){
        return _mm.request({
            type    : 'post',
            url     : 'http://localhost:8080/reportServer/dataCollect/createHtmlForReact/'+taskId,
            data    : null
        });
    }
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        
        return result;
    }
    // 保存商品
    saveProduct(product){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/save.do',
            data    : product
        });
    }
    /*
    *  品类相关
    */
    // 根据父品类id获取品类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/get_category.do',
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/add_category.do',
            data    : category
        });
    }
    // 修改品类名称
    updateCategoryName(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }
}

export default Product;