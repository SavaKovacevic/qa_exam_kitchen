import menu from '../pageObjects/menuItemsCheck'

const baseUrl = Cypress.config().baseUrl;
describe('Problem 2 Menu', () => {

    const check = new menu();
    it('Choose 6 objects and check bill', () => {
        // LOAD PAGE
        cy.visit(baseUrl + 'menu')
        cy.get('.subheading', {timeout:10000}).should('be.visible').and('contain', 'Specialties')

        // ARRAY FOR INDIVIDUAL PRICES
        let prices = [];

        // MENU ITEMS
        const indexes = [0, 0, 1, 2, -1, -2]
        for(let i = 0; i < indexes.length; i++){
            cy.get('.menus .text .btn').eq(indexes[i]).click().then(() => {
                check.selectListItem(i)
                check.addToArray(prices, indexes[i])
            })
        }

        // COMPARE SUM OF INDIVIDUAL PRICES AND TOTAL PRICE
        cy.get('#ukupno').invoke('text').then((text) => {
            const finalPrice = text.replace('$', '')
            const total = prices.reduce((a, b) => a + b, 0);
            expect(Number(finalPrice)).to.eq(total)
        });
    })
})
