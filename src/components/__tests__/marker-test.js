jest.dontMock('../listener');
jest.dontMock('../marker');

describe('Marker', () => {

  const React = require('react/addons');
  const TestUtils = React.addons.TestUtils;
  const Marker = require('../marker');

  let marker;

  beforeEach(() => {
    window.google = {
      maps: {
        Marker: jest.genMockFunction(),
        LatLng: jest.genMockFunction(),
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction()
        }
      }
    };
    marker = TestUtils.renderIntoDocument(
      <Marker onClick={jest.genMockFunction()} />
    );
  });

  it('creates a marker', () => {
    expect(window.google.maps.Marker).toBeCalled();
  });

  it('creates a marker once', () => {
    marker.render();
    expect(window.google.maps.Marker.mock.calls.length).toBe(1);
  });

  it('binds events', () => {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', () => {
    marker.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });

});
