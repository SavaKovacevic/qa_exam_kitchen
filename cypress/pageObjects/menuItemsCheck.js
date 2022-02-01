class menu {

    // WAIT FOR LIST ITEM TO APPEAR
    selectListItem(index) {
        return cy.get('#listaItema li:eq(' + index + ')', {timeout: 10000}).should('be.visible')
    }
    
    // ADD ITEM PRICE TO ARRAY
    addToArray(arr, index) {
        return cy.get('.price').eq(index).invoke('text').then((text) => {
            const itemPrice = text.replace('$', '')
            arr.push(Number(itemPrice))
        });
    }
}

export default menu
