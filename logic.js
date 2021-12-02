const fs = require('fs');
const encryptData = fs.readFileSync('./data.json')
const data = JSON.parse(encryptData);
const currencies = data.acceptableCurrency
const moneySet = data.moneyAvailable

const readline = require('readline-sync');

module.exports = {
    //-----------PRINTING PRODUCTS-----------
    printProducts: (products)=>{
        console.log('-------------\nPRODUCTS\n-------------');
        for (const product of products) {
            const other = product.count ? product.cost + 'dram' : "Not Available"
            console.log(product.id + ' : ' + product.name + ' : ' + other);
        }
        console.log('-------------');
    }
    //-----------TAKING ORDER-----------
    getMoney: (need, name) => {
        let givenMoney = module.exports.getMoneySet()
        let money = readline.questionInt(`Youll need ${need} drams for 1 ${name}\nIf you answer 0, your the proccess will be killed and your money will be lost\n`);
        let check = module.exports.moneyValidityCheck(money)
        if (!check) {
            givenMoney[`c${money}`]++
            while (money < need) {
                let newMoney = readline.questionInt(`Youll need ${product.cost - money} more drams\n`);
                let anotherCheck = module.exports.moneyValidityCheck(newMoney)
                if (!anotherCheck) {
                    givenMoney[`c${newMoney}`]++
                    money += newMoney
                } else {
                    console.log(anotherCheck);
                }
            }
        }
        else {
            console.log(check);
            module.exports.getMoney(need, name)
        }
        return [givenMoney, money > need ? money - need : 0]
    },
    moneyValidityCheck: (money) => {
        let message = ""
        if (money <= 0 || !currencies.includes(money)) {
            message += "You've inserted an invalid currency"
        } if (money == 0) {
            process.kill(process.pid);
        } else {

        }
        return message
    },
    getMoneySet: () => {
        let emptyMonSet = { ...moneySet }
        for (const key in emptyMonSet) {
            emptyMonSet[key] = 0
        }
        return emptyMonSet
    },
    //-----------GIVING CHANGE-----------
    giveChange: (change, currencySet) => {
        console.log('The Change is:');
        let ch = change
        for (let i = Object.keys(currencySet).length - 1; i >= 0; i--) {
            let key = Object.keys(currencySet)[i]
            let keyCoin = parseInt(key.replace('c', ''))
            if (ch - keyCoin >= 0) {
                console.log(parseInt(ch / keyCoin) + ' ' + keyCoin + 's');
                currencySet[key] -= parseInt(ch / keyCoin)
                ch -= parseInt(ch / keyCoin) * keyCoin
            }
        }
    }

}