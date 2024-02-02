import { Header } from "./components/Header"
export class BasePage{
    readonly page: any
    readonly header: Header
    constructor(page){
        this.page = page
        this.header = new Header(page)
    }
    async visit(url){
        await this.page.goto(url)
    }
}
