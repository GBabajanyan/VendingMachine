const fs = require('fs');
const encryptData = fs.readFileSync('./data.json')
const data = JSON.parse(encryptData);
const products = data.products
const currencySet = data.moneyAvailable

const readline = require('readline-sync');

const logic = require('./logic')
const getMoney = logic.getMoney
const giveChange = logic.giveChange
const printProducts = logic.printProducts

printProducts(products)
var getID = readline.questionInt("Insert ID of the product you want to buy \n");
let product
for (const item of products) {
    if (getID == item.id && item.count > 0) product = item
}
if (product) {
    const [moneySet, change] = getMoney(product.cost, product.name)
    for (const key in currencySet) {
        currencySet[key] += moneySet[key]
    }
    product.count--
    console.log(`You've got 1 ${product.name}`, change ? `and ${change} drams back` : ``);
    if (change !== 0) {
        giveChange(change, currencySet)
    }
} else {
    console.log("A product with inserted ID doesn't exist");
}
fs.writeFileSync('./data.json', JSON.stringify(data, null, 4));

