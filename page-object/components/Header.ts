export class Header{
    profile: any;
    chat: any;
    messageBtn: any;
    messages: any;
    constructor(page){
        this.profile = page.locator('//div[@class="user-photo-message"]')
        this.chat = page.locator('//button[@class="header__menu header__menu--messages"]')
        this.messageBtn = page.locator('//button[@class="header__menu header__menu--exist"]')
        this.messages = page.locator('//ul[@class="menu-notifications-list ng-tns-c149-26 ng-star-inserted"]/li')
    }
    async clickFirstMessage(){
        await this.messageBtn.click()
        await this.messages.all()[0].click()
    }
}
