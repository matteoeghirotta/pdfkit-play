import * as fs from 'fs'
import * as ejs from 'ejs'
import * as puppeteer from 'puppeteer'

function render(data: ejs.Data): string {
    const template = fs.readFileSync(`${__dirname}/../../src/puppeteer/template.ejs`)
        .toString()

    return ejs.render(template, data)
}

async function createPdf(html: string, path: string) {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.setContent(html)
    await page.pdf({ path, format: 'A4', printBackground: true })
    await browser.close()
}

const html = render({ image: 'https://test-images.quimmo.it/auctions/16156/images/01.jpg' })
console.log(html)
createPdf(html, 'puppeteer.pdf')
    .then(() => console.log('success!'))

