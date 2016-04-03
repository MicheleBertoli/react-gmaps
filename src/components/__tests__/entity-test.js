jest.unmock('../entity');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import createEntity from '../entity';
import compareProps from '../../utils/compare-props';

describe('Entity', () => {
  const EntityComponent = createEntity('Entity', 'prop', {
    onClick: 'click',
  });
  const noop = () => {};

  describe('componentDidMount', () => {
    it('creates the entity', () => {
      window.google = {
        maps: {
          Entity: jest.genMockFunction(),
          LatLng: noop,
        },
      };
      TestUtils.renderIntoDocument(
        <EntityComponent />
      );
      expect(window.google.maps.Entity).toBeCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    let parent;

    beforeEach(() => {
      const Parent = React.createClass({
        getInitialState() {
          return {
            prop: 1,
          };
        },
        render() {
          const { prop } = this.state;
          return <EntityComponent ref="entityComponent" prop={prop} />;
        },
      });
      parent = TestUtils.renderIntoDocument(<Parent />);
      parent.refs.entityComponent.entity = {
        setOptions: jest.genMockFunction(),
      };
    });

    it('does not update the options if the props are not changed', () => {
      compareProps.mockReturnValueOnce(true);
      parent.setState({
        prop: 1,
      });
      expect(parent.refs.entityComponent.entity.setOptions).not.toBeCalled();
    });

    it('updates the options if the props are changed', () => {
      compareProps.mockReturnValueOnce(false);
      parent.setState({
        prop: 2,
      });
      expect(parent.refs.entityComponent.entity.setOptions).toBeCalled();
    });
  });

  describe('componentWillUnmount', () => {
    let entityComponent;

    beforeEach(() => {
      entityComponent = TestUtils.renderIntoDocument(
        <EntityComponent />
      );
      entityComponent.entity = {
        setMap: noop,
      };
    });

    it('removes the listeners', () => {
      entityComponent.removeListeners = jest.genMockFunction();
      entityComponent.componentWillUnmount();
      expect(entityComponent.removeListeners).toBeCalled();
    });

    it('resets the entity', () => {
      entityComponent.componentWillUnmount();
      expect(entityComponent.entity).toBe(null);
    });
  });

  describe('getOptions', () => {
    it('returns the options', () => {
      const entityComponent = TestUtils.renderIntoDocument(
        <EntityComponent />
      );
      const result = entityComponent.getOptions({
        lat: 'lat',
        lng: 'lng',
      });
      expect(result).toEqual({
        lat: 'lat',
        lng: 'lng',
        prop: {},
      });
    });
  });

  describe('getEntity', () => {
    it('returns the entity', () => {
      const entityComponent = TestUtils.renderIntoDocument(
        <EntityComponent />
      );
      entityComponent.entity = 'entity';
      const result = entityComponent.getEntity();
      expect(result).toBe(entityComponent.entity);
    });
  });

  describe('render', () => {
    it('returns null', () => {
      const entityComponent = TestUtils.renderIntoDocument(
        <EntityComponent />
      );
      const result = entityComponent.render();
      expect(result).toBe(null);
    });
  });
});
