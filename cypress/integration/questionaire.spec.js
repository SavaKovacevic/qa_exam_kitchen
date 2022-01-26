import iframes from '../pageObjects/questionaireIframes'

let baseUrl = Cypress.config().baseUrl;
describe('Problem 2 Questionaire', () => {

    const frame = new iframes();
    it('Complete questionaire and check cookies', () => {
        // LOAD PAGE
        cy.visit(baseUrl + 'questionaire')
        cy.contains('Fill the questionaire about our services', {timeout:10000}).should('be.visible')

        // Why did you come to our restoraunt
        cy.get('[value="food"]').check();

        // What did you try at our restoraunt? IFRAME
        frame.getIframeBody(frame.getIframeDocument('#first')).find('[value="Cievapchici"]').check()
        frame.getIframeBody(frame.getIframeDocument('#first')).find('[value="rakia"]').check()

        // Did you like the Food? MODAL
        cy.get('[data-target="#exampleModal"]').click();
        
        cy.get('.modal-content').within(() => {
            cy.get('#radio4Example2').check();
            cy.get('textarea').type('Lepinja sa kajmakom')
            cy.contains('Submit').click();
        })

        // How did you like our interior design SLIDER IFRAME
        frame.getIframeBody(frame.getIframeDocument('#third')).find('[type="range"]')
            .first()
            .invoke('val', 5)
            .trigger('change', { data: '5' })

        // Rate our staff
        cy.get('.btn-group .btn').contains('9').click()

        // Anything else you would like to add? IFRAME
        frame.getIframeBody(frame.getIframeDocument('#second')).find('textarea').type('Sjajna klopa. Voleo bih da se prosiri meni. Svakako cu opet doci.')

        // SUBMIT
        cy.get('#submitQuestionaire').click()

        // CHECK COOKIES
        cy.getCookie('').should('have.property', 'value', 'food,g,Lepinja sa kajmakom,Cievapchici,rakia,Sjajna klopa. Voleo bih da se prosiri meni. Svakako cu opet doci.,5,9')
    })
})
