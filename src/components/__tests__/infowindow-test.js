jest.dontMock('../listener');
jest.dontMock('../infoWindow');

describe('InfoWindow', () => {

  const React = require('react/addons');
  const TestUtils = React.addons.TestUtils;
  const InfoWindow = require('../infoWindow');

  beforeEach(() => {
    window.google = {
      maps: {
        LatLng: jest.genMockFunction(),
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction()
        }
      }
    };
  });

  describe('mounting', () => {

    let infoWindow;

    beforeEach(() => {
      window.google.maps.InfoWindow= jest.genMockFunction();
      infoWindow = TestUtils.renderIntoDocument(
        <InfoWindow
          onCloseClick={jest.genMockFunction()}
          content={'<h1>InfoWindow</h1>'} />
      );
    });

    it('creates the infoWindow', () => {
      expect(window.google.maps.InfoWindow).toBeCalled();
    });

    it('creates the infoWindow once', () => {
      infoWindow.render();
      expect(window.google.maps.InfoWindow.mock.calls.length).toBe(1);
    });

    it('binds events', () => {
      expect(window.google.maps.event.addListener).toBeCalled();
    });

  });

  describe('unmounting', () => {

    let infoWindow;

    beforeEach(() => {
      window.google.maps.InfoWindow = () => {
        return {
          open: jest.genMockFunction(),
          close: jest.genMockFunction()
        }
      };
      infoWindow = TestUtils.renderIntoDocument(
        <InfoWindow
          onCloseClick={jest.genMockFunction()}
          content={'<h1>InfoWindow</h1>'} />
      );
    });

    it('unbinds events', () => {
      infoWindow.componentWillUnmount();
      expect(window.google.maps.event.removeListener).toBeCalled();
    });

    it('closes the infoWindow', () => {
      infoWindow.componentWillUnmount();
      expect(infoWindow.infoWindow.close).toBeCalled();
    });

  });

  describe('render', () => {

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
          return <InfoWindow ref="child" content={this.state.content} />
        }
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        content: '2'
      });
      expect(parent.refs.child.infoWindow.setOptions).toBeCalled();
    });

  });

});

