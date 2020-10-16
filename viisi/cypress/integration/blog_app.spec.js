describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          name: 'Käyttäjä Käyttäjäinen',
          username: 'käyttäjänimi',
          password: 'salainen_salasana'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })


    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#Username').type('käyttäjänimi')
          cy.get('#Password').type('salainen_salasana')
          cy.get('#login').click()
          cy.contains('Käyttäjä Käyttäjäinen logged in')
        })
    
        it('fails with wrong credentials', function() {
          cy.get('#Username').type('väärä_käyttäjänimi')
          cy.get('#Password').type('väärä_salasana')
          cy.get('#login').click()
          cy.contains('wrong credentials')
        })
      })

      describe.only('When logged in', function() {
        beforeEach(function() {
          cy.get('#Username').type('käyttäjänimi')
          cy.get('#Password').type('salainen_salasana')
          cy.get('#login').click()
        })
    
        it('A blog can be created', function() {
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.contains('a new blog Blogin otsikko by Blogin Kirjoittaja was created')
          cy.visit('http://localhost:3000')
          cy.contains('Blogin otsikko Blogin Kirjoittaja')
        })

        it('A blog can be liked', function() {
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.visit('http://localhost:3000')
          cy.get('#view').click()
          cy.get('#like').click()
          cy.visit('http://localhost:3000')
          cy.get('#view').click()
          cy.contains('likes 1')
        })

        it('A blog can be removed by user', function() {
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.visit('http://localhost:3000')
          cy.get('#view').click()
          cy.get('#remove').click()
          cy.visit('http://localhost:3000')
          cy.get('Blogin otsikko Blogin Kirjoittaja').should('not.exist')
        })

        it('Blogs are arranged by number of likes', function() {
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.get('#openForm').click()
          cy.get('#Title').type('Blogin otsikko')
          cy.get('#Author').type('Blogin Kirjoittaja')
          cy.get('#Url').type('www.osoite.fi')
          cy.get('#send').click()
          cy.visit('http://localhost:3000')
          cy.get('#1').find('#view').click()
          cy.get('#1').find('#like').click()
          cy.get('#1').find('#like').click()
          cy.get('#2').find('#view').click()
          cy.get('#2').find('#like').click()
          cy.visit('http://localhost:3000')
          cy.get('#0').find('#view').click()
          cy.get('#0').contains('likes 2')
          cy.get('#1').find('#view').click()
          cy.get('#1').contains('likes 1')
          
        })
      })
  })

