import * as React from "react";
import { useGMapsInstance } from "../../hooks/use-gmaps-instance";
import { useGMapsSDK } from "../../hooks/use-gmaps-sdk";
import { shenanigan } from "../../lib/shenanigan";

type EventHandler = (event: google.maps.MapMouseEvent) => void;

export namespace GMapsPolygon {
  type Events = "click" | "drag" | "dragend" | "dragstart";

  export type Options = Omit<
    google.maps.PolygonOptions,
    "map" | "path" | "paths"
  > & {
    path?: (google.maps.LatLngLiteral | google.maps.LatLng)[];
    paths?: (google.maps.LatLngLiteral | google.maps.LatLng)[][];
  };

  export type Props = Options & {
    onClick?: EventHandler;
    onDrag?: EventHandler;
    onDragStart?: EventHandler;
    onDragEnd?: EventHandler;
  };

  export type Update = (options: Partial<Options>) => void;

  export type On = (
    event: Events,
    handler?: EventHandler
  ) => google.maps.MapsEventListener | null;

  export type Get = <T extends keyof Options>(key: T) => Options[T];

  export type Ref = {
    get: GMapsPolygon.Get;
    update: GMapsPolygon.Update;
    on: GMapsPolygon.On;
  };
}

const noop = () => {};

const defaultOptions: Partial<GMapsPolygon.Options> = {
  zIndex: 0,
  visible: true,
  editable: false,
  clickable: false,
  draggable: false,
  geodesic: false,
};

export const GMapsPolygon = React.forwardRef<
  GMapsPolygon.Ref,
  GMapsPolygon.Props
>(
  (
    {
      onClick: onClickHandler = noop,
      onDrag: onDragHandler = noop,
      onDragStart: onDragStartHandler = noop,
      onDragEnd: onDragEndHandler = noop,

      ...options
    },
    ref
  ) => {
    const map = useGMapsInstance();
    const google = useGMapsSDK();

    const polyline = React.useRef<google.maps.Polygon | null>(null);

    const get = React.useCallback<GMapsPolygon.Get>(
      (key) => {
        if (!polyline.current) return;

        if (key === "path") {
          const path = polyline.current.getPath();

          return shenanigan.unwrapMVCArray(path);
        }
        if (key === "paths") {
          const paths = polyline.current.getPaths();

          return shenanigan
            .unwrapMVCArray(paths)
            .map(shenanigan.unwrapMVCArray);
        }

        return polyline.current.get(key);
      },
      [polyline.current]
    );

    const update = React.useCallback<GMapsPolygon.Update>(
      (opts) => {
        if (!polyline.current) return;

        polyline.current.setOptions(opts);
      },
      [polyline.current]
    );

    const on = React.useCallback<GMapsPolygon.On>(
      (name, handler) => {
        if (!google || !polyline.current || !handler) return null;

        return polyline.current.addListener(name, handler);
      },
      [google, polyline.current]
    );

    React.useImperativeHandle(ref, () => ({
      update,
      on,
      get,
    }));

    // updates
    React.useEffect(() => {
      if (!map || !google || !polyline.current) return;

      update(options);

      const click = on("click", onClickHandler);
      const drag = on("drag", onDragHandler);
      const dragStart = on("dragstart", onDragStartHandler);
      const dragEnd = on("dragend", onDragEndHandler);

      return () => {
        click?.remove();
        drag?.remove();
        dragStart?.remove();
        dragEnd?.remove();
      };
    }, [
      map,
      options,
      onClickHandler,
      onDragHandler,
      onDragStartHandler,
      onDragEndHandler,
    ]);

    // mount
    React.useEffect(() => {
      if (!map || !google || polyline.current) return;

      polyline.current = new google.maps.Polygon({
        map,
        ...defaultOptions,
        ...options,
      });
    }, [map, google]);

    return null;
  }
);
