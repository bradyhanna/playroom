import {
  assertFramesMatch,
  selectWidthPreferenceByIndex,
  visit
} from '../support/utils';

describe('Toolbar', () => {
  it('filter widths', () => {
    const frames = ['320px', '375px', '768px', '1024px'];
    const widthIndexToSelect = 1;

    assertFramesMatch(frames);
    selectWidthPreferenceByIndex(widthIndexToSelect);
    assertFramesMatch([frames[widthIndexToSelect]]);
  });

  it('copy to clipboard', () => {
    const copySpy = cy.spy();

    visit(
      'http://localhost:9000/#?code=N4Igxg9gJgpiBcIA8AxCEB8r1YEIEMAnAei2LUyXJxAF8g'
    );

    cy.document()
      .then(doc => {
        cy.stub(doc, 'execCommand', args => {
          if (args === 'copy') {
            copySpy();
            return true;
          }
        });
      })
      .get('[data-testid="copyToClipboard"]')
      .click()
      .then(() => expect(copySpy).to.have.been.called);
  });
});
