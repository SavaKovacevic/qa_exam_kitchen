class reservation {

    // TYPE INPUTS
    reservationTypeInput(key, selector) {
        cy.fixture('reservation').then(reservation => {
            const typeContent = reservation[key]
            cy.get(selector).type(typeContent);
        })
    }

    reservationSelectInput(key, selector) {
        cy.fixture('reservation').then(reservation => {
            const typeContent = reservation[key]
            cy.get(selector).select(typeContent);
        })
    }

    // PARKING
    parking() {
        return cy.get('form').within(() => {
            cy.get('.switch-label').click();
        })
    }


}

export default reservation
