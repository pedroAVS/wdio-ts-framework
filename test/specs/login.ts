import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'
import {LoginConstants} from '../data/constants.js'
import data from '../resources/logindata.json' assert {type: "json"}
import { faker } from '@faker-js/faker'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login(data.valid.user, data.valid.password)
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            LoginConstants.LOGIN_SUCCESS_MSG)
    })

    it('should not login with invalid credentials', async () => {
        await LoginPage.open()
        for (let x: number=10; x != 0; x--){
            await LoginPage.login(faker.name.fullName(), faker.random.alphaNumeric(17))
            await expect(SecurePage.flashAlert).toHaveTextContaining(
                LoginConstants.LOGIN_FAILED_MSG)
        }
    })
})


