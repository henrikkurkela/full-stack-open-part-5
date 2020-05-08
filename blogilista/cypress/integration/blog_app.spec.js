describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'test',
            password: 'asdasd'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown at first', function () {
        cy.contains('Login')
    })

    describe('Login', function () {
        it('fails with wrong credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('wrongpass')
            cy.get('#login-button').click()

            cy.contains('Login')
        })

        it('succeeds with correct credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('test')
            cy.get('#password').type('asdasd')
            cy.get('#login-button').click()

            cy.contains('Welcome')
        })
    })
})

describe('When logged in', function () {
    it('a new blog can be created', function () {
        cy.get('#show-new-blog-button').click()
        cy.get('#author').type('Author')
        cy.get('#title').type('Title')
        cy.get('#url').type('Url')
        cy.contains('Create').click()
        cy.contains('Title Author')
    })

    it('a blog can be liked', function () {
        cy.contains('Title Author').click()
        cy.contains('Like').click()

        cy.contains('Title Author Url 1')
    })

    it('a blog can be deleted', function () {
        cy.contains('Remove').click()

        cy.contains('Title Author Url').should('not.exist')
    })
})