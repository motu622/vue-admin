import request from '@/utils/request'

export default {
    getCategory1() {
        return request({
            url: '/vue-admin-template/product/getCategory1',
            method: 'get'
        })
    },
    getCategory2(category1Id) {
        return request({
            url: '/vue-admin-template/product/getCategory2',
            method: 'get',
            params: { category1Id }
        })
    },
    getCategory3(category2Id) {
        return request({
            url: '/vue-admin-template/product/getCategory3',
            method: 'get',
            params: { category2Id }
        })
    }

}