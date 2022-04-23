const { config } = require('@vue/test-utils')
const Mock = require('mockjs')

const skuDemo = Mock.mock({
    'sku|15': [
        {
            category3Id: '@id',
            'price|1-20': 20,
            tmId: '',
            'isSale|0-1': 1,
            "weight|50-100": 100,
            skuName: '@cword(2,4)',
            skuDefaultImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg2%2FM00%2F00%2F0B%2FChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652333594&t=e717b47586040697662f79d2b148fd41',
            skuDesc: '@cword(6,10)',
            'skuAttrValueList|3-5': [
                {
                    attrName: '@cword(2,3)',
                    valueName: '@cword(2,3)'    
                }
            ],
            'skuImageList|4-6': [
                {
                    imgName: '@string("aeiou", 5)',
                    imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg2%2FM00%2F00%2F0B%2FChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652333594&t=e717b47586040697662f79d2b148fd41',
                    spuImgId: '@id',
                }
            ],
            skuSaleAttrValueList: []
        }
    ]
})
const data = Mock.mock({
    'data|10': [
        {
            'categoryChild|3-6': [
                {
                    'categoryChild|2-10': [
                        {

                            categoryName: "@cword(2,4)",
                            categoryId: "@id",
                            'categoryChild|2-5': [
                                {
                                    attrName: "@cword(2,4)",
                                    'imgList|5-10': [
                                        {
                                            id: "@id",
                                            imgName: '@string("aeiou", 5)',
                                            imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdesk-fd.zol-img.com.cn%2Ft_s960x600c5%2Fg2%2FM00%2F00%2F0B%2FChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http%3A%2F%2Fdesk-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652333594&t=e717b47586040697662f79d2b148fd41',
                                            spuId: '@id'
                                        }
                                    ],

                                    'spuSaleAttrList|2': [
                                        {
                                            baseSaleAttrId: '@id',
                                            saleAttrName: '',
                                            'spuSaleAttrValueList|2-3': [
                                                {
                                                    saleAttrValueName: '@cword(2,3)',
                                                    id: '@id'
                                                }
                                            ]
                                        }
                                    ],
                                    id: '@id',
                                    'tmId|1-3': 3,
                                    categoryId: "@id",
                                    description: '@cword(3,5)',
                                    spuName: '@cword(2,4)',
                                    'attrValueList|2-4': [
                                        {
                                            id: '@id',
                                            valueName: "@cword(2,4)"
                                        },
                                    ],
                                    sku: skuDemo.sku
                                }
                            ]

                        }
                    ],
                    categoryName: "@cword(2,4)",
                    categoryId: "@id"
                }
            ],
            categoryName: "@cword(2,4)",
            categoryId: "@id"
        }
    ]
})

let demo = []
let spuDemo = []
let spuList = []
let trademarkListDemo = [
    {
        id: 1,
        name: '华为',
    },
    {
        id: 2,
        name: '小米',
    }, {
        id: 3,
        name: '苹果'
    }
]
let baseSaleAttrListDemo = [
    {
        id: 1,
        name: '颜色',
    },
    {
        id: 2,
        name: '版本',
    },
    {
        id: 3,
        name: '尺码',
    },
    {
        id: 4,
        name: '类别',
    },
]
let category3Id = ''
module.exports = [
    {
        url: '/vue-admin-template/product/getCategory1',
        type: 'get',
        response: config => {
            let list = []
            data.data.forEach(item => {
                list.push({
                    id: item.categoryId,
                    name: item.categoryName
                })
            })
            return {
                code: 20000,
                data: list
            }
        }
    },
    {
        url: '/vue-admin-template/product/getCategory2',
        type: 'get',
        response: config => {
            let list = []
            data.data.forEach(item => {
                if (config.query.category1Id === item.categoryId) {
                    item.categoryChild.forEach(item2 => {
                        list.push({
                            id: item2.categoryId,
                            name: item2.categoryName
                        })
                    })
                }
            })
            return {
                code: 20000,
                data: list
            }
        }
    },
    {
        url: '/vue-admin-template/product/getCategory3',
        type: 'get',
        response: config => {
            let list = []
            data.data.forEach(item => {
                item.categoryChild.forEach(item2 => {
                    if (config.query.category2Id === item2.categoryId) {
                        item2.categoryChild.forEach(item3 => {
                            list.push({
                                id: item3.categoryId,
                                name: item3.categoryName
                            })
                        })
                    }

                })
            })
            return {
                code: 20000,
                data: list
            }
        }
    },
    {
        url: '/vue-admin-template/product/attrInfoList',
        type: 'get',
        response: config => {
            let list = []
            data.data.forEach(item => {
                category3Id = config.query.category3Id
                item.categoryChild.forEach(item2 => {
                    if (config.query.category2Id === item2.categoryId) {
                        item2.categoryChild.forEach(item3 => {
                            if (config.query.category3Id === item3.categoryId) {
                                list = item3.categoryChild
                                demo = item3.categoryChild
                            }
                        })
                    }

                })
            })
            return {
                code: 20000,
                data: list
            }
        }
    },
    {
        url: '/vue-admin-template/product/attr/saveAttrInfo',
        type: 'post',
        response: config => {
            let flag = 1
            demo.forEach(item => {
                if (item.categoryId === config.body.categoryId) {
                    item.attrName = config.body.attrName
                    item.attrValueList = config.body.attrValueList
                    flag = 0
                }
            })
            if (flag) {
                demo.push(config.body)
            }
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/attr/deleteAttr',
        type: 'delete',
        response: config => {
            demo.forEach((item, index) => {
                if (item.categoryId === config.query.attrId) {
                    demo.splice(index, 1)
                }
            })
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/getSpuList',
        type: 'get',
        response: config => {
            let list = []
            let { page, limit, category2Id, category3Id } = config.query
            data.data.forEach(item => {
                item.categoryChild.forEach(item2 => {
                    if (category2Id === item2.categoryId) {
                        item2.categoryChild.forEach(item3 => {
                            if (category3Id === item3.categoryId) {
                                list = item3.categoryChild.slice((page - 1) * limit, page * limit)
                                item3.categoryChild.forEach(item4 => {
                                    item4.category3Id = category3Id
                                })
                                spuDemo = item3.categoryChild
                            }
                        })
                    }

                })
            })
            return {
                code: 20000,
                data: list,
                total: spuDemo.length,
                size: parseInt(limit),
                current: parseInt(page),
                pages: Math.ceil(spuDemo.length / limit)
            }
        }
    },
    {
        url: '/vue-admin-template/product/spuImageList',
        type: 'get',
        response: config => {
            let imgList = []
            spuDemo.forEach(item => {
                if (item.categoryId === config.query.spuId) {
                    imgList = item.imgList
                    spuList = item
                }
            })
            return {
                code: 20000,
                data: imgList

            }
        }
    },
    {
        url: '/vue-admin-template/product/baseTrademark/getTrademarkList',
        type: 'get',
        response: config => {

            return {
                code: 20000,
                data: trademarkListDemo,
            }
        }
    },
    {
        url: '/vue-admin-template/product/getSpuById',
        type: 'get',
        response: config => {
            spuDemo.forEach(item => {
                if (item.spuSaleAttrList[0] && item.spuSaleAttrList[0].saleAttrName === '') {
                    item.spuSaleAttrList[0].saleAttrName = baseSaleAttrListDemo[0].name
                    item.spuSaleAttrList[1].saleAttrName = baseSaleAttrListDemo[1].name
                }
            })
            const { categoryId, spuName, description, id, tmId, spuSaleAttrList } = spuDemo.find(item => {
                return item.categoryId === config.query.spuId
            })
            return {
                code: 20000,
                data: {
                    category3Id: categoryId,
                    spuName,
                    description,
                    tmId,
                    id,
                    spuImageList: null,
                    spuSaleAttrList: spuSaleAttrList,
                },
                data1: spuDemo
            }
        }
    },
    {
        url: '/vue-admin-template/product/baseSaleAttrList',
        type: 'get',
        response: config => {

            return {
                code: 20000,
                data: baseSaleAttrListDemo
            }
        }
    },
    {
        url: '/vue-admin-template/product/savaSpuInfo',
        type: 'post',
        response: config => {
            const { description, spuImageList, spuName, spuSaleAttrList, tmId } = config.body
            let obj = {
                spuName,
                imgList: spuImageList,
                description,
                id: new Date().valueOf().toString(),
                spuSaleAttrList,
                tmId,
                categoryId: (new Date().valueOf() + 1).toString()
            }
            spuDemo.push(obj)
            return {
                code: 20000,
                data: spuSaleAttrList
            }
        }
    },
    {
        url: '/vue-admin-template/product/updateSpuInfo',
        type: 'post',
        response: config => {
            const { description, spuImageList, spuName, spuSaleAttrList } = config.body
            spuList.description = description
            spuList.imgList = spuImageList
            spuList.spuName = spuName
            spuList.spuSaleAttrList = spuSaleAttrList
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/spu/deleteSpu',
        type: 'delete',
        response: config => {
            spuDemo.forEach((item, index) => {
                if (config.query.spuId === item.categoryId) {
                    spuDemo.splice(index, 1)
                }
            })
            return {
                code: 20000,
            }
        }
    },
    {
        url: '/vue-admin-template/product/spuSaleAttrList',
        type: 'get',
        response: config => {
            let { spuSaleAttrList } = spuDemo.find(item => {
                if (item.spuSaleAttrList[0] && item.spuSaleAttrList[0].saleAttrName === '') {
                    item.spuSaleAttrList[0].saleAttrName = baseSaleAttrListDemo[0].name
                    item.spuSaleAttrList[1].saleAttrName = baseSaleAttrListDemo[1].name
                }
                return item.categoryId === config.query.spuId
            })
            return {
                code: 20000,
                data: spuSaleAttrList


            }
        }
    },
    {
        url: '/vue-admin-template/product/sku/saveSkuInfo',
        type: 'post',
        response: config => {
            let list = config.body
            spuList.attrValueList.forEach(item => {
                list.skuAttrValueList.forEach(item2 => {
                    if (item.id === item2.valueId) {
                        item2.valueName = item.valueName
                        item2.attrName = spuList.attrName
                    }
                })

            })
            skuDemo.sku.push(list)
            return {
                code: 20000,
                data: spuList.sku,
            }
        }
    },
    {
        url: "/vue-admin-template/product/sku/findSpuInfoByKeyword",
        type: 'get',
        response: config => {
            let arr = []
            skuDemo.sku.forEach(item => {
                if (item.category3Id === config.query.keyword) {
                    item.isSale = 0
                    arr.push(item)
                }
            })
            return {
                code: 20000,
                data: arr
            }
        }
    },
    {
        url: "/vue-admin-template/product/list",
        type: 'get',
        response: config => {
            const { page, limit } = config.query
            let arr = skuDemo.sku.slice((page - 1) * limit, page * limit)
            return {
                code: 20000,
                data: {
                    records: arr,
                    total: skuDemo.sku.length
                }
            }
        }
    },
    {
        url: "/vue-admin-template/product/onSale",
        type: 'get',
        response: config => {
            skuDemo.sku.forEach(item => {
                if (item.category3Id === config.query.skuId) {
                    item.isSale = 1
                }
            })
            return {
                code: 20000,
                data: 111
            }
        }
    },
    {
        url: "/vue-admin-template/product/cancelSale",
        type: 'get',
        response: config => {
            skuDemo.sku.forEach(item => {
                if (item.category3Id === config.query.skuId) {
                    item.isSale = 0
                }
            })
            return {
                code: 20000,
                data: 111
            }
        }
    },
    {
        url: "/vue-admin-template/product/getSkuById",
        type: 'get',
        response: config => {
            let list = []
            skuDemo.sku.forEach(item => {
                if (item.category3Id === config.query.skuId) {
                    list = item
                }
            })
            return {
                code: 20000,
                data: list
            }
        }
    },

]