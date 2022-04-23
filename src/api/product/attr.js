import request from '@/utils/request'


export default {
    getList(category1Id, category2Id, category3Id) {
        return request({
            url: '/vue-admin-template/product/attrInfoList',
            method: 'get',
            params: { category1Id, category2Id, category3Id }
        })
    },

    delete(attrId) {
        return request({
            url: '/vue-admin-template/product/attr/deleteAttr',
            method: 'delete',
            params: { attrId }
        })
    },

    addOrUpdate(attr) {
        return request({
            url: '/vue-admin-template/product/attr/saveAttrInfo',
            method: 'post',
            data: attr
        })
    }

}