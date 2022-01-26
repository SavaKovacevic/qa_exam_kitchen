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

    // const getIframeBody1 = () => {
    //     return getIframeDocument1()
    //     .its('body').should('not.be.undefined')
    //     .then(cy.wrap)
    //   }

    // const getIframeDocument2 = () => {
    //     return cy
    //     .get('#third')
    //     .its('0.contentDocument').should('exist')
    //   }
}

export default iframes
