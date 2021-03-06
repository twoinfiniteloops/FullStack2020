describe('Blog app', function() {
    beforeEach(function() {
        cy.request('post', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            name: 'doguhan',
            password: '123',
            username: 'dogu'
        }
        cy.request('post', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    }),
    it('login is shown by default', function(){
        cy.get('.loginForm').should('contain', 'Log in to application')
    }),
    describe('Login', function(){
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('dogu')
            cy.get('#password').type('123')
            cy.get('#login-button').click()
            cy.contains('doguhan logged in')    
        }),
        it('fails with correct credentials', function() {
            cy.get('#username').type('ugod')
              .get('#password').type('321')
              .get('#login-button').click()
              .should('not.contain', 'doguhan logged in')    
        })
    }),
    /*
    describe.only('When logged in', function() {
        beforeEach(function () {
            cy.get('#username').type('dogu')
              .get('#password').type('123')
              .get('#login-button').click()
        }),
        it('A blog can be created', function () {
            cy.contains('create blog').click()
              .get('#titleId').type('magic title')
              .get('#authorId').type('magic author')
              .get('#urlId').type('magic url')
              .get('#createButtonId').click()
            cy.get('.component').should('contain', 'magic title')
        })
    })
    */
    it('A user can like a blog, naturally', function () {
        cy.request('post', 'http://localhost:3001/api/login', {
            username: 'dogu',
            password: '123'
        }).then(function(response) {
            console.log(response)
            localStorage.setItem('userToken', JSON.stringify(response.body.token))
        })
        
        cy.request({
            method:'post',
            url:'http://localhost:3001/api/blogs', 
            body:{
                title: 'title',
                author: 'author',
                url: 'url'
            },
            headers:{
                'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlsb3MiLCJpZCI6IjVmNjNiZDgxMzg0MDM2Njg5MzNjMjhjYyIsImlhdCI6MTYwMDM3MjE3Nn0.ATmHVe9WxBDyFil_WBADFecJqrfDif52BJrUgdXQyr8`
            }
        })
        cy.get('.likeButton').click()
    })
})