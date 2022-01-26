import reservation from '../pageObjects/reservationForm'

let baseUrl = Cypress.config().baseUrl;
describe('Problem 1 Form', () => {

    const form = new reservation();
    it('Make a Reservation form and local storage check', () => {
        // LOAD PAGE
        cy.visit(baseUrl + 'reserve')
        cy.get('.subheading', {timeout:10000}).should('be.visible').and('contain', 'Book a Table')

        // FORM
        form.reservationTypeInput('name', '#name')
        form.reservationTypeInput('email', '#email')
        form.reservationTypeInput('phone', '#phone')
        form.reservationTypeInput('date', '#date')
        form.reservationTypeInput('time', '#time')
        form.reservationSelectInput('person', '#persons')
        form.parking();

        // SUBMIT AND CHECK LOCAL STORAGE
        cy.fixture('reservation').then(reservation => {
            cy.contains('Make a Reservation').click().should(() => {
                expect(localStorage.getItem('name')).to.eq(reservation.name);
                expect(localStorage.getItem('email')).to.eq(reservation.email);
                expect(localStorage.getItem('phone')).to.eq(reservation.phone);
                expect(localStorage.getItem('date')).to.eq(reservation.date);
                expect(localStorage.getItem('time')).to.eq(reservation.time);
                expect(localStorage.getItem('person')).to.eq(reservation.person);
                expect(localStorage.getItem('parking')).to.eq(reservation.parking);
            });
        })
    })
})
