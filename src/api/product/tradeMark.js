import request from '@/utils/request'
//
export const reqTradeMarkList =(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`, method:'get'})
//新增品牌
export const reqUpdateTradeMark =(trademark)=>{
    if(!trademark?.id){
        request({url:'/admin/product/baseTrademark/save', method:'post',data:trademark})
    }else{
        request({url:'/admin/product/baseTrademark/update', method:'put',data:trademark})
    }
}