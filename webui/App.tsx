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
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect);

    const preconnectOrigin = document.createElement("link");
    preconnectOrigin.rel = "preconnect";
    preconnectOrigin.href = "https://fonts.gstatic.com";
    preconnectOrigin.crossOrigin = "true";
    document.head.appendChild(preconnectOrigin);

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap`;
    document.head.appendChild(fontLink);
  }, []);

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
