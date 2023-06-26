module.exports = {
    'Demo'(browser) {
        const UsernameSelector = "input[name='user-name']"
        const PasswordSelector = "input[name='password']"
        const enterButton = "input[name='login-button']"
        const sauceLabs = "#add-to-cart-sauce-labs-backpack"
        browser
            .url('https://www.saucedemo.com/')
            .setValue(UsernameSelector,"standard_user")
            .setValue(PasswordSelector,"secret_sauce")
            .click(enterButton)
            .click(sauceLabs)
            .click(".shopping_cart_link")
            .pause(3000)
            .click("#checkout")
            .setValue('input[name="firstName"]',"Asish")
            .setValue('input[name="lastName"]',"singh")
            .setValue('input[name="postalCode"]',"410112")
            .click('input[name="continue"]')
            .click('button[name="finish"]')
            .saveScreenshot("tests_output/img.png")
    }
};