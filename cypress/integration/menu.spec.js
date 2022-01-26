import menu from '../pageObjects/menuItemsCheck'

let baseUrl = Cypress.config().baseUrl;
describe('Problem 2 Menu', () => {

    const check = new menu();
    it('Choose 6 objects and check bill', () => {
        // LOAD PAGE
        cy.visit(baseUrl + 'menu')
        cy.get('.subheading', {timeout:10000}).should('be.visible').and('contain', 'Specialties')

        // ARRAY FOR INDIVIDUAL PRICES
        let prices = [];

        // MENU ITEMS
        cy.get('.menus .text .btn').eq(0).as('food1')
        cy.get('.menus .text .btn').eq(1).as('food2')
        cy.get('.menus .text .btn').eq(2).as('food3')
        cy.get('.menus .text .btn').eq(-1).as('dessert1')
        cy.get('.menus .text .btn').eq(-2).as('dessert2')

        // ADD FOOD 1
        cy.get('@food1').click().then(() => {
            check.selectListItem(0, 'Stuffed veal with pomigrante 17$')
            check.addToArray(prices, 0)
        })

        // ADD ONE MORE FOOD 1
        cy.get('@food1').click().then(() => {
            check.selectListItem(1, 'Stuffed veal with pomigrante 17$')
            check.addToArray(prices, 0)
        })

        // ADD FOOD 2
        cy.get('@food2').click().then(() => {
            check.selectListItem(2, 'Chicken with parsley 29$')
            check.addToArray(prices, 1)
        })

        // ADD FOOD 3
        cy.get('@food3').click().then(() => {
            check.selectListItem(3, 'Breaded Zuchinni with garlic sauce 12$')
            check.addToArray(prices, 2)
        })

        // ADD DESSERT 1
        cy.get('@dessert1').click().then(() => {
            check.selectListItem(4, 'Baklava with Vanilla Ice Cream 10$')
            check.addToArray(prices, -1)
        })

        // ADD DESSERT 2
        cy.get('@dessert2').click().then(() => {
            check.selectListItem(5, 'Malaga Cornetto 2$')
            check.addToArray(prices, -2)
        })

        // COMPARE SUM OF INDIVIDUAL PRICES AND TOTAL PRICE
        cy.get('#ukupno').invoke('text').then((text) => {
            const finalPrice = text.replace('$', '')
            const total = prices.reduce((a, b) => a + b, 0);
            expect(Number(finalPrice)).to.eq(total)
        });
    })
})
