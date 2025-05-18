import { DevToolsPluginClient, useDevToolsPluginClient } from "expo/devtools";
import React, { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
// @ts-ignore
import StudioScript from "./studio.js";
import "./index.css";

declare global {
  interface Window {
    client: DevToolsPluginClient;
  }
  namespace JSX {
    interface IntrinsicElements {
      studio: ComponentPropsWithoutRef<"div"> & {
        ref: React.RefObject<{
          reset: () => void;
        }>;
      };
    }
  }
}

const studioFunction = new Function(
  "React",
  "ReactDOM",
  "ReactDOMClient",
  StudioScript
);

export default function App() {
  const client = useDevToolsPluginClient("expo-sqlite-devtools");
  const studioRef = useRef<{
    reset: () => void;
  }>(null);

  useEffect(() => {
    if (client) {
      window.client = client;
      studioFunction(React, ReactDOM, ReactDOMClient);
    }

    return () => {
      // reset the studio when the component unmounts
      if (studioRef.current?.reset) {
        studioRef.current.reset();
      }
    };
  }, [client]);

  // @ts-ignore
  return <drizzle-studio ref={studioRef} />;
}
