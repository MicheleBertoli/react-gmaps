jest.dontMock('../marker');

describe('Marker', () => {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Marker = require('../marker');

  var marker;

  beforeEach(() => {
    window.google = {
      maps: {
        Marker: jest.genMockFunction(),
        LatLng: jest.genMockFunction()
      }
    }
    marker = TestUtils.renderIntoDocument(
      <Marker />
    );
  });

  it('creates a marker', () => {
    expect(window.google.maps.Marker).toBeCalled();
  });

});
