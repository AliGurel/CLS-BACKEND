'use strict'

module.exports = (req, res, next) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    //http://127.0.0.1:8000/blog/posts?search[title]=test&filter[published]=1&sort[createdAt]=asc

    //? FILTERING // URL?filter[key1]=value1&filter[key2]=value2
    // console.log(req.query);
    /*clg sonucu; veriler req.query içinde bir obje içinde key-value olarak döndürülüyor
        {
        search: { title: 'test' },
        filter: { published: '1' },
        sort: { createdAt: 'asc' }
        }
    */
    //yukarıdaki clg sonucu dönen veriden anlaşılacağı üzere, req.query.search dersek örneğin title='test' gelecek.
    const filter = req.query?.filter || {} // query de filter boşsa, veri gelmezse boş obje olarak kalsın
    // console.log(filter); //http://127.0.0.1:8000/blog/posts?filter[blogCategoryId]=6640d4140b05ba3d08bb3654
    //dönen sonuç ; { blogCategoryId: '6640d4140b05ba3d08bb3654' }

    //?SEARCHING
    // URL?search[key1]=value1&search[key2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // URL query lerde true/false yazılmaz 1/0 yazılır

    const search = req.query?.search || {} //uery de search boşsa sonuc gelmezse boş obje kalsın
    //http://127.0.0.1:8000/blog/posts?search[title]=0 title&search[content]=test // title içinde '0 title' ve content içinde 'test' geçenleri getir eşit olanlar değil
    // console.log(search) //bu query den dönen sonuç ; { title: '0 title', content: 'test' }

    //eğer search i, filter gibi direkt { title: '0 title', content: 'test' } bu örnekteki gibi find() metodunun içinde koyarsak içinde geçenleri değil eşit olanlar arar. Bu da işimize yaramaz, bunun için Regex kullanıcaz;

    //? { title: '0 title', content: 'test' } elimizde bu veri var ama bu haliyle işimize yaramıyor, bu veriyi     { title: { $regex: '0 title' }, content: { $regex: 'test' } } buradaki formata regex ile çevireceğiz
    // bu formatı https://www.mongodb.com/docs/manual/reference/operator/query/regex/ den aldı

    for (let key in search) {
        search[key] = { $regex: search[key], $options: 'i' } // büyük hafr küçük harf duyarlı değil olur options i ile beraber
    }
    // console.log(search) // çıktı formatı;
    /*
        {
        title: { '$regex': '0 title', '$options': 'i' },
        content: { '$regex': 'test', '$options': 'i' }
        }
    */
    //? URL query de filter, sort, search sıralaması önemli değil !
    //http://127.0.0.1:8000/blog/posts?search[title]=test 10&filter[published]=1&sort[createdAt]=asc
    //http://127.0.0.1:8000/blog/posts?filter[published]=1&sort[createdAt]=asc&search[title]=test 10
    // yukardaki ikisi de aynı sonucu verir
    //Bu URL leri göndermek FE nin işi

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

    res.getModelList = async function (Model, populate = null) {
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