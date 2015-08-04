jest.dontMock('../listener');
jest.dontMock('../infoWindow');

describe('InfoWindow', () => {

  const React = require('react/addons');
  const TestUtils = React.addons.TestUtils;
  const InfoWindow = require('../infoWindow');

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

  it('calls `setOptions` when receive new props', () => {
    window.google.maps.InfoWindow = () => {
      return {
        setOptions: jest.genMockFunction()
      }
    };
    const Parent = React.createClass({
      getInitialState() {
        return { 
          content: '1' 
        };
      },
      render() {
        return <InfoWindow ref="child" content={this.state.testState} />
      }
    });
    const parent = TestUtils.renderIntoDocument(<Parent />);
    parent.setState({
      content: '2'
    });
    expect(parent.refs.child.infoWindow.setOptions).toBeCalled();
  });

});

