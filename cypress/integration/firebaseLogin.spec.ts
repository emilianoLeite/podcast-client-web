import { openDB } from 'idb'
import { config } from "../../src/shared/firebase/config";

describe('Firebase email + password authentication', () => {
  const email = 'jane@xyz123.com'
  const password = 'password123'

  context('via UI', () => {
    // clear saved authentication data before each test
    // forcing the application to be signed out
    beforeEach(() => indexedDB.deleteDatabase('firebaseLocalStorageDb'))

    beforeEach(() => {
      // if wanted, can wait for the identity call to go through
      // cy.server()
      // cy.route('POST', 'https://www.googleapis.com/identitytoolkit/**').as(
      //   'identity'
      // )
      // cy.visit('/')
      // cy.wait('@identity')

      cy.visit('/')
    })

    it('can login via UI', function () {
      cy.contains('#quickstart-sign-in-status', 'Unknown').should('be.visible')
      cy.contains('#quickstart-sign-in', 'Sign In')

      cy.get('#email').type(email)
      cy.get('#password').type(password)

      cy.get('#quickstart-sign-in').click()

      cy.contains('#quickstart-sign-in-status', 'Signed in').should(
        'be.visible'
      )
      cy.contains('#quickstart-sign-in', 'Sign out')
    })
  })

  context.only('via cy.request', () => {
    beforeEach(() => indexedDB.deleteDatabase('firebaseLocalStorageDb'))

    beforeEach(() => {
      // from Firebase config, same as index.html
      const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5YWQ5YmM1ZThlNDQ3OTNhMjEwOWI1NmUzNjFhMjNiNDE4ODA4NzUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRW1pbGlhbm8gTGVpdGUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hTV1BtR2M2eWlTdzlHdGNhSkxLdndTMTk5bzhENHdGVkR2SFhHVkEiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9kY2FzdC1jbGllbnQtMmMwOWQiLCJhdWQiOiJwb2RjYXN0LWNsaWVudC0yYzA5ZCIsImF1dGhfdGltZSI6MTU5OTUxNzc3MCwidXNlcl9pZCI6InFjWm4zV1l1eUpPOFBmMGhmYXo4bG5QbFZycTEiLCJzdWIiOiJxY1puM1dZdXlKTzhQZjBoZmF6OGxuUGxWcnExIiwiaWF0IjoxNTk5NTE3NzcwLCJleHAiOjE1OTk1MjEzNzAsImVtYWlsIjoibGVpdGVlbWlsaWFub0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMTc0Njg1MTk3NDk3OTIxNjE0OSJdLCJlbWFpbCI6WyJsZWl0ZWVtaWxpYW5vQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.KoXHljdIMTnbgSR4dvJOxiF6Z_wHhOtriGIbLH8Ngp42_1X_sYQWQAuIJe8HF0GXlK5EWHxGETLv4qWK6MjqVlO1Z4iQqzsVw-tV-zm8uCn1XeIz51WGzz62UOyBcUWtU0Wse9umW7I_7DbQ3DQBgYQUEHaz6vzz4U37GGxfNgDfQ0kj_vFEU4ufjtTXNNrOykpLA1KiILUAUQ2S4pqmrm2QbMLE4yksVcZpAS1FIyPDU9RMUJfubT2YpGte1PJ_YlpXJjdEUBszRDzv5GuZscahlzAI-NUMV0jHz-K0OfutEsRIR5PxqHcUvKfUpq7aA9NZ0rEcVMyFGUdBzNCbeA"
      const endpoint = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${
        config.apiKey
      }`
      cy.request({
        method: 'POST',
        url: endpoint,
        body: {
          "idToken":idToken
        }
      })
        .its('body')
        .then(async body => {
          const openDb = await openDB('firebaseLocalStorageDb', 1, {
            upgrade (db) {
              db.createObjectStore('firebaseLocalStorage', {
                keyPath: 'fbase_key',
                autoIncrement: false
              })
            }
          })

          const currentUser = body.users[0]
          const fbase_key = `firebase:authUser:${config.apiKey}:[DEFAULT]`
          const value = {
            appName: '[DEFAULT]',
            // createdAt: String(+new Date()),
            displayName: currentUser.displayName,
            email: currentUser.email,
            emailVerified: false,
            isAnonymous: false,
            // lastLoginAt: String(+new Date()),

            providerData: [
              {
                displayName: currentUser.displayName,
                email: currentUser.email,
                providerId: 'google.com',
                uid: '111746851974979216149'
              }
            ],
            apiKey: config.apiKey,
            authDomain: config.authDomain,

            stsTokenManager: {
              accessToken: idToken,
              apiKey: config.apiKey
              // expirationTime: +new Date() + 1000000
            },
            uid: currentUser.localId
          }

          openDb.add('firebaseLocalStorage', {
            fbase_key,
            value
          })

          return body;
        })
    })

    it('works', () => {
      cy.visit('/')
    })
  })
})
