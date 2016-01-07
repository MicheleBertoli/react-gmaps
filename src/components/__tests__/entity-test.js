jest.dontMock('../../mixins/listener');
jest.dontMock('../entity');

describe('Entity', () => {

  const React = require('react');
  const TestUtils = require('react-addons-test-utils');
  const createEntity = require('../entity');
  const Entity = createEntity('Entity', 'prop', {
    onClick: 'click'
  });

  let entity;

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

    beforeEach(() => {
      window.google.maps.Entity = jest.genMockFunction();
      entity = TestUtils.renderIntoDocument(
        <Entity onClick={jest.genMockFunction()} />
      );
    });

    it('creates the entity', () => {
      expect(window.google.maps.Entity).toBeCalled();
    });

    it('creates the entity once', () => {
      entity.render();
      expect(window.google.maps.Entity.mock.calls.length).toBe(1);
    });

    it('binds events', () => {
      expect(window.google.maps.event.addListener).toBeCalled();
    });

  });

  describe('unmounting', () => {

    beforeEach(() => {
      window.google.maps.Entity = () => {
        return {
          setMap: jest.genMockFunction()
        };
      };
      entity = TestUtils.renderIntoDocument(
        <Entity onClick={jest.genMockFunction()} />
      );
    });

    it('unbinds events', () => {
      entity.componentWillUnmount();
      expect(window.google.maps.event.removeListener).toBeCalled();
    });

    it('removes the entity', () => {
      const setMap = entity.entity.setMap;
      entity.componentWillUnmount();
      expect(setMap).toBeCalledWith(null);
    });

  });

  describe('updating', () => {

    it('calls `setOptions` when receive new props', () => {
      window.google.maps.Entity = () => {
        return {
          setOptions: jest.genMockFunction()
        };
      };
      const Parent = React.createClass({
        getInitialState() {
          return {
            content: '1'
          };
        },
        render() {
          return <Entity ref="child" />;
        }
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        content: '2'
      });
      expect(parent.refs.child.entity.setOptions).toBeCalled();
    });

  });

  describe('getEntity', () => {

    it('returns the entity', () => {
      window.google.maps.Entity = jest.genMockFunction();
      entity = TestUtils.renderIntoDocument(
        <Entity />
      );
      expect(entity.getEntity()).toBeDefined();
    });

  });

  describe('binding', () => {

    it('keeps the listeners separated', () => {
      window.google.maps.Entity = () => {
        return {
          setMap: jest.genMockFunction(),
          setOptions: jest.genMockFunction()
        };
      };
      const Parent = React.createClass({
        getInitialState() {
          return {
            show: true
          };
        },
        render() {
          return (
            <div>
              <Entity ref='child' onClick={jest.genMockFunction()} />
              {this.state.show && <Entity onClick={jest.genMockFunction()} />}
            </div>
          );
        }
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        show: false
      });
      expect(parent.refs.child.listeners.length).toBe(1);
    });

  });

});

