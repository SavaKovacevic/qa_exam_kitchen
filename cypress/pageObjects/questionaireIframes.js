class iframes {

    getIframeDocument(selector) {
        return cy
        .get(selector)
        .its('0.contentDocument').should('exist')
    }

    getIframeBody(action) {
        return action
        .its('body').should('not.be.undefined')
        .then(cy.wrap)
    }
}

export default iframes
