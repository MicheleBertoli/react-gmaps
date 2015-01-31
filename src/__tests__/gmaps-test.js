jest.dontMock('../gmaps');

describe('Gmaps', function() {
  it('exists', function() {
    var Gmaps = require('../gmaps');
    expect(Gmaps).toBeDefined();
  });
});
