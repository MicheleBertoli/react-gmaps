jest.unmock('../listener');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import listener from '../listener';

describe('Gmaps', () => {
  const Component = React.createClass({
    mixins: [listener],
    render() {
      return null;
    },
  });
  let component;

  beforeEach(() => {
    window.google = {
      maps: {
        event: {
          addListener: jest.genMockFunction(),
          removeListener: jest.genMockFunction(),
        },
      },
    };
    component = TestUtils.renderIntoDocument(
      <Component onClick={() => {}} />
    );
    component.addListeners(null, {
      onClick: 'click',
    });
  });

  describe('addListeners', () => {
    it('adds the google map listeners', () => {
      expect(window.google.maps.event.addListener).toBeCalled();
    });

    it('stores the listeners', () => {
      expect(component.listeners.length).toBe(1);
    });
  });

  describe('removeListeners', () => {
    it('removes the google map listeners', () => {
      component.removeListeners();
      expect(window.google.maps.event.removeListener).toBeCalled();
    });
  });
});
