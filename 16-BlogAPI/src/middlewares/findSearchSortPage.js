'use strict'

module.exports = (req, res, next) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    //http://127.0.0.1:8000/blog/posts?search[title]=test&filter[published]=1&sort[createdAt]=asc

    // FILTERING // URL?filter[key1]=value1&filter[key2]=value2
    const filter = req.query?.filter || {} // filterden veri gelmezse boş obje olarak kalsın

    //SEARCHING
    // URL?search[key1]=value1&search[key2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    const search = req.query?.search || {} // sonuc gelmezse boş obje kalsın
    //console.log(search)
    // URL query lerde true/false yazılmaz 1/0 yazılır

    //? { title: 'test', content: 'test' } -> { title: { $regex: 'test' }, content: { $regex: 'test' } }
    for (let key in search) {
        search[key] = { $regex: search[key], $options: 'i' } // büyük hafr küçük harf duyarlı değil olur options i ile beraber
    }
    //console.log(search)

    //SORTING
    // URL?sort[key1]=asc&sort[key2]=desc
    // asc: A-Z - desc: Z-A // asc:1 desc:-1 deprecated oldu
    const sort = req.query?.sort || {}
    //console.log(sort);

    //PAGINATION
    // URL?page=3&limit=10

    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20) // lmit 0 dan büyükse kabul et, değilse 20 olark default değer ata // env deki değerler her zaman str dir, o ndenle number a çevirdik
    //console.log('limit', limit)

    //Page
    let page = Number(req.query?.page)
    // page = page > 0 ? page : 1
    page = page > 0 ? (page - 1) : 0 // Backend 'de sayfa sayısı her zmaan page-1 olarak hesaplanmalı.
    //console.log('page', page)

    //SKIP
    // LIMIT 20, 10
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)
    //console.log('skip', skip)

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // const data = await BlogPost.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit)

    res.getModelList = async function (Model,populate = null) {
        return await Model.find({ ...filter, ...search }).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    // Details:
    res.getModelListDetails = async (Model) => {

        const data = await Model.find({ ...filter, ...search })

        let details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.length / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }
    next()
}