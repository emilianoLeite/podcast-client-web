describe('When searching for podcasts', () => {
  describe('when some results are returnted', () => {
    beforeEach(() => {
      cy.server({ force404: true })
      cy.fixture('podcastSearchResult.json').as('mockPodcastSearchResults')
      cy.route('GET', 'https://listen-api.listennotes.com/api/v2/search?type=podcast&q=*', '@mockPodcastSearchResults').as('podcastSearchResults')
    })

    it('correctly renders the returned podcasts in a list', () => {
      cy.visit('http://localhost:3000')

      cy.get('[type="text"]')
        .type('Star Wars')

      cy.contains('Search').click()

      cy.get('[data-testid="podcast-list"]')
        // @ts-ignore
        .toMatchImageSnapshot();

      cy.get('[data-testid^="list-item"]')
        .should('have.length', 10)
        .then(async (listItems) =>
          listItems.each((_index, listItem) => {
            cy.wrap(listItem).within(() =>
              cy.contains('star wars', { matchCase: false }
            ))
          })
        )
    })
  })
})
