const Mock = require('mockjs')


const data = Mock.mock({
    'records|30': [{
        id: '@id',
        tmName: '@cword(2)',
        logoUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg2%2FM00%2F00%2F0B%2FChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652333594&t=e717b47586040697662f79d2b148fd41',
    }]
})


module.exports = [
    {
        url: '/vue-admin-template/product/getTrademarkList',
        type: 'get',
        response: config => {
            let { page, limit } = config.query
            const records = data.records
            return {
                code: 20000,
                data: {
                    records: records.slice((page - 1) * limit, page * limit),
                    total: records.length,
                    size: parseInt(limit),
                    current: parseInt(page),
                    pages: Math.ceil(records.length / limit)

                }
            }
        }
    },
    // {
    //     url: '/vue-admin-template/product/baseTrademark/getTrademarkList',
    //     type: 'get',
    //     response: config => {
    //         const records = data.records
    //         return {
    //             code: 20000,
    //             records,
    //         }
    //     }
    // },
    {
        url: '/vue-admin-template/product/update',
        type: 'put',
        response: config => {
            let { id } = config.body
            data.records.forEach(item => {
                if (item.id === id) {
                    item.tmName = config.body.tmName
                    item.logoUrl = config.body.logoUrl
                }
            })
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/save',
        type: 'post',
        response: config => {
            data.records.push(config.body)
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/remove',
        type: 'delete',
        response: config => {
            let { id } = config.query
            data.records.forEach((item, index) => {
                if (item.id === id) {
                    data.records.splice(index, 1)
                }
            })
            return {
                code: 20000,
            }
        }
    }
]