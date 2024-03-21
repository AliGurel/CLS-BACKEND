//*******************TERNARY**************//

//tek satırlı if yapısıdır
// Koşul ? ifade1 : ifade2

// Koşul ? ifade1 : "" // else kısmı olmayacaksa yani tek koşulluysa bu şekilde bırakılabilir

const not = 50
const result = not >=50 ? "GECTI " : "KALDI"

// console.log(result);


//***********SHORT CIRCUIT **************/
const hizmetyili = 5
let maas = 10000

hizmetyili >= 5 && (maas *= 1.1) // koşul doğru ise sağdaki ifadeyi çalıştır


hizmetyili >= 5 || (maas *= 1.1) // koşul yanlış ise sağdaki ifadeyi çalıştır

/***********************FUNCTION************* */

//1. yontem, Classic,, bu tarz tanımlama hoisted olur, yani arka planda js bunu globalscope a atar ve dosyanın en başına taşır
function carp(a,b){
    console.log(a*b);
}
//carp(5,10)

// 2. Yontem => Expression

const topla = function (a,b){
    console.log(a+b);
}

//topla(8,9)

// ARROW FUNCTION

const cikar = (a,b) => a-b // süslü olmadan diekt ifade yazılırsa return eder

console.log(cikar(10,4)); 
