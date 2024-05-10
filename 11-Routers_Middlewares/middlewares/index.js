"use strict"

/*-----------------------------------------*
const middleFunc1 = (req, res, next) => {

    req.message1 = 'middleFunc1 started.'
    next()
    // next('route')
}

const middleFunc2 = (req, res, next) => {
    
    req.message2 = 'middleFunc2 started.'
    next()
}

// module.exports = [middleFunc1,middleFunc2] // array olarak export edebiliriz bu bi yöntem
// array olarak gönderdiysek, array olarak veya tek değişkenle toplu olarak almalıyoz

module.exports = {middleFunc1,middleFunc2} // obje olarak da export edebiliriz bu da bi yöntem
//obje gönderdiysek de obje olarak destructuring ile almalıyız
//nası gönderdiysek öyle alıyoruz


/*-----------------------------------------*/
/*-----------------------------------------*
//? DİĞER  bir export yöntemi;
//bu da direkt en baştan fonksiyonları OBJE olarak gönderir, alacağımız taradfta bunları obje olarak
//destructuring ile almalıyız
module.exports.middleFunc1 = (req, res, next) => {

    req.message1 = 'middleFunc1 started.'
    next()
    // next('route')
}

module.exports.middleFunc2 = (req, res, next) => {
    
    req.message2 = 'middleFunc2 started.'
    next()
}

/*-----------------------------------------*/
//? BİZİM KULLANACAĞIMIZ EXPORT YONTEMİ AŞAĞIDAKİ GİBİ OLACAK;
// burada da obje olarak export edilir,alacağımız tarafta bunları obje olarak
//destructuring ile almalıyız

module.exports = {

    middleFunc1: (req, res, next) => {
        console.log('middleFunc1 started.');
        req.message1 = 'middleFunc1 started.'
        next()
    },
    
    middleFunc2: (req, res, next) => {
        console.log('middleFunc2 started.');
        req.message2 = 'middleFunc2 started.'
        next()
    }

}


/*-----------------------------------------*/