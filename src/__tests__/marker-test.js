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
    };
    marker = TestUtils.renderIntoDocument(
      <Marker />
    );
  });

  it('creates a marker', () => {
    expect(window.google.maps.Marker).toBeCalled();
  });

  it('creates a marker once', () => {
    marker.render();
    expect(window.google.maps.Marker.mock.calls.length).toBe(1);
  });

});
