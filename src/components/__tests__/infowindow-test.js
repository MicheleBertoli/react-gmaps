jest.dontMock('../listener');
jest.dontMock('../infoWindow');

describe('InfoWindow', () => {

  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let InfoWindow = require('../infoWindow');

  let infoWindow;

  beforeEach(() => {
    window.google = {
      maps: {
        InfoWindow: jest.genMockFunction(),
        LatLng: jest.genMockFunction(),
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction()
        }
      }
    };
    infoWindow = TestUtils.renderIntoDocument(
      <InfoWindow onCloseClick={jest.genMockFunction()} content={'<h1>InfoWindow</h1>'} />
    );
  });

  it('creates a infoWindow', () => {
    expect(window.google.maps.InfoWindow).toBeCalled();
  });

  it('creates a infoWindow once', () => {
    infoWindow.render();
    expect(window.google.maps.InfoWindow.mock.calls.length).toBe(1);
  });

  it('binds events', () => {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it('unbinds events', () => {
    infoWindow.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });
});

