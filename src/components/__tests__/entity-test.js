jest.dontMock('../../mixins/listener');
jest.dontMock('../../utils/compare-props');
jest.dontMock('../entity');

describe('Entity', () => {

  const React = require('react');
  const createReactClass = require('create-react-class');
  const TestUtils = require('react-dom/test-utils');
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

    let parent;

    beforeEach(() => {
      window.google.maps.Entity = () => {
        return {
          setOptions: jest.genMockFunction()
        };
      };
      const Parent = createReactClass({
        getInitialState() {
          return {
            prop: '1'
          };
        },
        render() {
          const {prop} = this.state;
          return <Entity ref="child" prop={prop} />;
        }
      });
      parent = TestUtils.renderIntoDocument(<Parent />);
    });

    it('calls `setOptions` when receive new props', () => {
      parent.setState({
        prop: '2'
      });
      expect(parent.refs.child.entity.setOptions).toBeCalled();
    });

    it('does not call `setOptions` when props are the same', () => {
      parent.setState({
        prop: '1'
      });
      expect(parent.refs.child.entity.setOptions).not.toBeCalled();
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
      const Parent = createReactClass({
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
