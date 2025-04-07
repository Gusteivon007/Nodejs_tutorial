let prompt = require("prompt-sync");
prompt = prompt();

console.log("Somar, subtrair, multiplicar e dividir dois números");

const n1 = parseFloat(prompt("digite o primeiro número:"));
const n2 = parseFloat(prompt("digite o segundo número:"));


console.log(` a soma do primeiro com o segundo número : ${n1 + n2}`);
console.log(" a subtração entre n1 e n2 (n1-n2) é: ", n1 + n2`);
console.log(` a multiplicação do primeiro e do segundo: ${ n1*n2}`);
console.log(` a subtração entre n1 e n2(n1 - n2) é: n1 + n2`);