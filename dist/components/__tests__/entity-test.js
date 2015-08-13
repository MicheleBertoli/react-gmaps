'use strict';

jest.dontMock('../../mixins/listener');
jest.dontMock('../entity');

describe('Entity', function () {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var createEntity = require('../entity');
  var Entity = createEntity('Entity', 'prop', {
    onClick: 'click'
  });

  var entity = undefined;

  beforeEach(function () {
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

  describe('mounting', function () {

    beforeEach(function () {
      window.google.maps.Entity = jest.genMockFunction();
      entity = TestUtils.renderIntoDocument(React.createElement(Entity, { onClick: jest.genMockFunction() }));
    });

    it('creates the entity', function () {
      expect(window.google.maps.Entity).toBeCalled();
    });

    it('creates the entity once', function () {
      entity.render();
      expect(window.google.maps.Entity.mock.calls.length).toBe(1);
    });

    it('binds events', function () {
      expect(window.google.maps.event.addListener).toBeCalled();
    });
  });

  describe('unmounting', function () {

    beforeEach(function () {
      window.google.maps.Entity = function () {
        return {
          setMap: jest.genMockFunction()
        };
      };
      entity = TestUtils.renderIntoDocument(React.createElement(Entity, { onClick: jest.genMockFunction() }));
    });

    it('unbinds events', function () {
      entity.componentWillUnmount();
      expect(window.google.maps.event.removeListener).toBeCalled();
    });

    it('removes the entity', function () {
      var setMap = entity.entity.setMap;
      entity.componentWillUnmount();
      expect(setMap).toBeCalledWith(null);
    });
  });

  describe('render', function () {

    it('calls `setOptions` when receive new props', function () {
      window.google.maps.Entity = function () {
        return {
          setOptions: jest.genMockFunction()
        };
      };
      var Parent = React.createClass({
        displayName: 'Parent',

        getInitialState: function getInitialState() {
          return {
            content: '1'
          };
        },
        render: function render() {
          return React.createElement(Entity, { ref: 'child' });
        }
      });
      var parent = TestUtils.renderIntoDocument(React.createElement(Parent, null));
      parent.setState({
        content: '2'
      });
      expect(parent.refs.child.entity.setOptions).toBeCalled();
    });
  });

  describe('getEntity', function () {

    it('calls `setOptions` when receive new props', function () {
      window.google.maps.Entity = jest.genMockFunction();
      entity = TestUtils.renderIntoDocument(React.createElement(Entity, null));
      expect(entity.getEntity()).toBeDefined();
    });
  });
});