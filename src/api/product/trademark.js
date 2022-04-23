import request from '@/utils/request'

export default {
    getPageList(page, limit) {
        return request({
            url: '/vue-admin-template/product/getTrademarkList',
            method: 'get',
            params: { page, limit }
        })
    },

    addOrUpdate(trademark) {
        if (trademark.id) {
            return request.put('/vue-admin-template/product/update', trademark)
        } else {
            return request.post('/vue-admin-template/product/save', trademark)
        }
    },
    delete(id) {
        return request({
            url: '/vue-admin-template/product/remove',
            method: 'delete',
            params: { id }
        })
    },

    getList() {
        return request({
            url: '/vue-admin-template/product/baseTrademark/getTrademarkList',
            method: 'get',
        })
    },
   
}