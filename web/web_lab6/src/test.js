const { Builder, By, Key, until } = require('selenium-webdriver');
const date = "20.12.2022";
const count = 3;
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Перейти по URL
        await driver.get('http://localhost:8080/'); 
        await driver.sleep(1000)
        await driver.findElement(By.xpath('/html/body/div/div/header/div[2]/div/button[1]')).click(); //авторизовались
        await driver.sleep(1000)
        await driver.findElement(By.xpath('//*[@id="app"]/div/header/div[1]/a[2]')).click(); //перешли на страницу с биржей
        await driver.sleep(1000)
        let oldMoney = +(await driver.findElement(By.xpath('//*[@id="app"]/div/header/div[2]/p[2]')).getText()).slice(21); //взяли баланс без акций
        let i = 0;
        let price = 0;
        while(true){
            let text = await driver.findElement(By.xpath('//*[@id="app"]/div/header/div[2]/div/div/p[2]')).getText();
            i += 1
            if(text.slice(0, 10) === date){
                price = +text.slice(12);
                for(let n = 0; n < count; n++){
                    await driver.findElement(By.xpath('//*[@id="app"]/div/header/div[2]/div/div/button[1]')).click(); //купили первую акциб
                }
                break;
            }
        }

        let newMoney = +(await driver.findElement(By.xpath('//*[@id="app"]/div/header/div[2]/p[2]')).getText()).slice(21); //взяли баланс без акций
        console.log(price);
        console.log(oldMoney);
        console.log(newMoney);
        if(+newMoney == +oldMoney - 3*price) console.log(`CORRECT!\nБаланс без учета акций изменился верно после покупки ${count} акций в день ${date}`)
        else console.log(`FAILED...\nБаланс без учета акций изменился неверно после покупки ${count} акций в день ${date}`)

        await driver.sleep(2000)
        
    }
    finally {
        await driver.quit();
    }
})();

//*[@id="app"]/div/header/div[2]/div/div/button[1] покупка акции

//*[@id="app"]/div/header/div[2]/div/div/p[2]