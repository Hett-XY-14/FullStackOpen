describe('Note app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.request('POST', 'http://localhost:3000/api/testing/reset/')
        const user = {
            name: 'Jeff',
            username: 'Elixhir',
            password: 'Creopaxta1'
        }
        cy.request('POST', `http://localhost:3000/api/users/`, user)
        
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('A valid user is able to log in', function() {
        cy.contains('login').click()
        cy.get('input[name=Username]').type('Elixhir')
        cy.get('input[name=Password]').type('Creopaxta1')
        cy.get('#login-button').click()
    })
    
    it('Login fails with invalid credentials', function() {
        cy.contains('login').click()
        cy.get('input[name=Username]').type('Elixhir')
        cy.get('input[name=Password]').type('Laconchesu')
        cy.get('#login-button').click()
        cy.contains('Wrong credentials')
    })

    describe('When logged in', function() {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('input:first').type('Elixhir')
            cy.get('input:last').type('Creopaxta1')
            cy.get('#login-button').click()
        })

        it('a new note can be created0', function() {
            cy.contains('Create note').click()
            cy.get('#note-content-field').type('a note created by cypress')
            cy.contains('Save Note').click()
            cy.contains('a note created by cypress')
        })
    })
})