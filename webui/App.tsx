import { useDevToolsPluginClient } from "expo/devtools";

export default function App() {
  const client = useDevToolsPluginClient("expo-sqlite-devtools");

  return <div></div>;
}
