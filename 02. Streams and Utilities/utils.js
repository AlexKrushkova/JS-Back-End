// Local Module

// 1-ви начин на експортиране

// function sum(a, b) {
//     return a + b;
// }

// module.exports = {
//     sum,
// };



// 2-ри начин на експортиране

// Ако искаме всеки път да се инициализира на ново

// module.exports = function(config) {
//     return {
//         sum,
//         test
//     }
// }



// 3-ти начин на експортиране:

// module.exports.sum = function(a,b) {
//     return a + b;
// }

// module.exports.sub = function(a,b) {
//     return a - b;
// }