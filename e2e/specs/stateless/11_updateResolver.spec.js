import { acceptMetamaskAccess } from '../../setup'

const newResolver = '0x3A8b6F310d5D9eB510d7e648Fd4E56Eb16d7fB24'
const oldResolver = '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB'

describe('Update Resolver', () => {
  before(() => {
    acceptMetamaskAccess(2, true)
  })

  describe('Happy', () => {
    describe('When profile is updated to latest resolver', () => {
      it('should disable the latest resolver button, have custom resolver checked, and allow user to change reslover address', () => {
        cy.visit(
          '/profile/wrapped.eth/details?from=%2Fprofile%2Fwrapped.eth%3Ffrom%3D%252Fmy%252Fnames&name=wrapped.eth&tab=advanced',
        )
        cy.findByTestId('accordion-resolverDetails-edit').click()
        cy.findByTestId('latest-resolver-radio').should('be.disabled')
        cy.findByTestId('custom-resolver-radio').should('not.be.disabled')
        cy.findByTestId('dogfood').type(oldResolver)
        cy.findByTestId('update-button').click()
        cy.findByTestId('transaction-modal-confirm-button').click()
        cy.confirmMetamaskTransaction()
        cy.findByTestId('transaction-modal-complete-button').click()
        cy.findByTestId('resolver-address').should('have.text', oldResolver)
      })
    })

    describe('When profile is not updated to latest resolver', () => {
      it('should allow user to update if they have chosen to use the latest resolver', () => {
        cy.findByTestId('accordion-resolverDetails-edit').click()
        cy.findByTestId('update-button').click()
        cy.findByTestId('transaction-modal-confirm-button').click()
        cy.confirmMetamaskTransaction()
        cy.findByTestId('transaction-modal-complete-button').click()

        //This is only needed on cypress, not sure why!
        cy.findByTestId('accordion-resolverDetails-edit').click()
        cy.findByTestId('update-button').click()
        cy.findByTestId('transaction-modal-confirm-button').click()
        cy.confirmMetamaskTransaction()
        cy.findByTestId('transaction-modal-complete-button').click()

        cy.findByTestId('resolver-address').should('have.text', newResolver)
      })
    })
  })

  describe('Unhappy', () => {
    it('should not allow user to update if they enter an invalid address', () => {
      cy.findByTestId('accordion-resolverDetails-edit').click()
      cy.findByTestId('custom-resolver-radio').click()
      cy.findByTestId('dogfood').type('0xInvalid')
      cy.findByTestId('update-button').should('be.disabled')
    })
  })
})
