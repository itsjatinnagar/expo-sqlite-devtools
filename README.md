# Expo SQLite Dev Plugin
![expo-sqlite-devtools](https://github.com/user-attachments/assets/3c6b4086-d2a4-48dd-a861-9fabf460efd8)

An Expo SQLite DevTool that can run in an Expo App.

### Installation

- Add the package to your Expo project:

  ```
  npx expo install expo-sqlite-devtools
  ```

- Integrate Expo SQLite with the DevTool hook:

  ```ts
  import { useSQLiteDevTools } from 'expo-sqlite-devtools';

  const db = new SQLite.openDatabaseSync(...);

  export default function App() {
    useSQLiteDevTools(db);

    return (
      <View>
        {/* ... */}
      </View>
    );
  }
  ```
