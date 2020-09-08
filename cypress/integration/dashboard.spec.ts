describe('When logged in', () => {
  beforeEach(() => {
    // cy.server()
    // cy.fixture('podcastSearchResult.json').as('mockPodcastSearchResults')
    // // TODO: mock listen notes requests
    // cy.route('GET', 'https://listen-api.listennotes.com/api/v2/search?type=podcast&q=*', '@mockPodcastSearchResults').as('podcastSearchResults')
    // @ts-ignore
    cy.login()
  })

  afterEach(() => {
    // @ts-ignore
    cy.logout()
  })

  it('I can see my subscribed podcasts', () => {
    cy.visit('/home')

    cy.contains('Subscribed Podcasts')

    // TODO implement remaining assertions
  })
})

