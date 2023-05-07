import * as React from "react";
import * as ReactDOM from "react-dom";
import { useGMapInstance } from "../../hooks/use-gmap-instance";
import { useGMapSDK } from "../../hooks/use-gmap-sdk";

type EventHandler = (event: google.maps.MapMouseEvent) => void;
type Primitive = string | number | boolean | null | undefined;

export namespace GMapMarker {
  type Events = "click" | "drag" | "dragend" | "dragstart";

  export type Options = {
    location: google.maps.LatLngLiteral;
    draggable?: boolean;
    zIndex?: number;
  };

  export type Props = React.PropsWithChildren<
    Options & {
      onClick?: EventHandler;
      onDrag?: EventHandler;
      onDragStart?: EventHandler;
      onDragEnd?: EventHandler;
    }
  >;

  export type Update = (options: Partial<Options>) => void;

  export type On = (
    event: Events,
    handler?: EventHandler
  ) => google.maps.MapsEventListener | null;

  export type Ref = {
    location: {
      lat: () => number;
      lng: () => number;
    };
    update: GMapMarker.Update;
    on: GMapMarker.On;
  };
}

const noop = () => {};
const unwrapGetter = <T extends Primitive>(
  g: T | ((...args: any[]) => T)
): T => {
  return typeof g === "function" ? g() : g;
};

export const GMapMarker = React.forwardRef<GMapMarker.Ref, GMapMarker.Props>(
  (
    {
      children,
      location,
      zIndex = 0,
      draggable = false,
      onClick: onClickHandler = noop,
      onDrag: onDragHandler = noop,
      onDragStart: onDragStartHandler = noop,
      onDragEnd: onDragEndHandler = noop,
    },
    ref
  ) => {
    const map = useGMapInstance();
    const google = useGMapSDK();

    const marker =
      React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [markerContainer, setMarkerContainer] =
      React.useState<HTMLDivElement | null>(null);

    const update = React.useCallback<GMapMarker.Update>(
      (opts) => {
        if (!marker.current) return;

        marker.current.zIndex = opts.zIndex;
        marker.current.position = opts.location;
        marker.current.gmpDraggable = opts.draggable;
      },
      [marker.current]
    );

    const on = React.useCallback<GMapMarker.On>(
      (name: string, handler) => {
        if (!google || !marker.current || !handler) return null;

        return marker.current.addListener(name, handler);
      },
      [google, marker.current]
    );

    // updates
    React.useEffect(() => {
      if (!map || !google || !marker.current) return;

      update({ location, draggable, zIndex });

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
      google,
      location,
      draggable,
      zIndex,
      onClickHandler,
      onDragHandler,
      onDragStartHandler,
      onDragEndHandler,
    ]);

    React.useImperativeHandle(ref, () => ({
      location: {
        lat: () => unwrapGetter(marker.current?.position?.lat) ?? 0,
        lng: () => unwrapGetter(marker.current?.position?.lng) ?? 0,
      },
      update,
      on,
    }));

    // mount
    React.useEffect(() => {
      if (!map || !google || marker.current) return;

      const container = document.createElement("div");
      setMarkerContainer(container);

      marker.current = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: container,
        zIndex,
        position: location,
        gmpDraggable: draggable,
      });
    }, [map, google]);

    if (!google || !marker.current || !markerContainer) {
      return null;
    }

    return ReactDOM.createPortal(children, markerContainer);
  }
);
