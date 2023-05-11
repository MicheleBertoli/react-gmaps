import * as React from "react";

import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

type Options = Partial<LoaderOptions>;

const defaultOptions: Options = {
  version: "beta",
  libraries: ["marker"],
};

const useLoader = () => {
  const ref = React.useRef<Loader | null>(null);

  const load = React.useCallback(async (opts: Options) => {
    if (ref.current) {
      ref.current.deleteScript();
    }

    ref.current = new Loader({
      apiKey: "",
      ...defaultOptions,
      ...opts,
      libraries: [
        ...(defaultOptions.libraries || []),
        ...(opts.libraries || []),
      ],
    });

    try {
      return await ref.current.load();
    } catch (e) {
      console.error("Failed to load Google Maps API", e);
    }
  }, []);

  return {
    load,
  };
};

export const useGMapsLoader = (opts: Options) => {
  const loader = useLoader();

  const [sdk, setSDK] = React.useState<typeof google | null>(null);

  const load = async () => {
    const g = await loader.load(opts);

    if (g) {
      setSDK(g);
    }
  };

  React.useEffect(() => {
    load();
  }, [loader, opts]);

  return sdk;
};
