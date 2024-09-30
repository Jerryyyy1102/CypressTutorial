const SEARCH_TXT_BX_SEL ="#input_open_search";
const SEARCH_BTN_SEL="#cart";


class BachHoaXanh_HomePage{

   
    get searchTxt_BHXElem()
    {
        return cy.get(SEARCH_TXT_BX_SEL)
    }

    searchForProduct(searchTerm)
    {
        this.searchTxt_BHXElem
        .should('be.visible')
        and('be.enable')
        .type(searchTerm+'{enter}');
    }
}

module.exports=BachHoaXanh_HomePage