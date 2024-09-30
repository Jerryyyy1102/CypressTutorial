import BachHoaXanh_HomePage from "../Models/BHX_HomePage";
let BHXHomepage=new BachHoaXanh_HomePage();
describe('BHX Search', ()=>{

    it('Should be able to search drink',()=>{
        cy.visit("/")
        const SEARCH_TEXT='Coca';
        BHXHomepage.searchForProduct(SEARCH_TEXT)
      
        cy.wait(3000)

        
        

   
    })
})