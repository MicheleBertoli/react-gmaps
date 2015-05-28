"use strict";

jest.dontMock("../listener");
jest.dontMock("../marker");

describe("Marker", function () {

  var React = require("react/addons");
  var TestUtils = React.addons.TestUtils;
  var Marker = require("../marker");

  var marker = undefined;

  beforeEach(function () {
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
    marker = TestUtils.renderIntoDocument(React.createElement(Marker, { onClick: jest.genMockFunction() }));
  });

  it("creates a marker", function () {
    expect(window.google.maps.Marker).toBeCalled();
  });

  it("creates a marker once", function () {
    marker.render();
    expect(window.google.maps.Marker.mock.calls.length).toBe(1);
  });

  it("binds events", function () {
    expect(window.google.maps.event.addListener).toBeCalled();
  });

  it("unbinds events", function () {
    marker.componentWillUnmount();
    expect(window.google.maps.event.removeListener).toBeCalled();
  });
});