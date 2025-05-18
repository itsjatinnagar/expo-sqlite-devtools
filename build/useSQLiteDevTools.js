import { useDevToolsPluginClient } from "expo/devtools";
import { useEffect } from "react";
export default function useSQLiteDevTools(db) {
    const client = useDevToolsPluginClient("expo-sqlite-devtools");
    const transferData = async (e) => {
        if (!db)
            return;
        try {
            const statement = await db.prepareAsync(e.sql);
            let executed;
            if (e.arrayMode) {
                executed = await statement.executeForRawResultAsync(e.params);
            }
            else {
                executed = await statement.executeAsync(e.params);
            }
            const data = await executed.getAllAsync();
            client?.sendMessage(`transferData-${e.id}`, data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const subscriptions = [];
        subscriptions.push(client?.addMessageListener("getData", transferData));
        return () => {
            for (const subscription of subscriptions) {
                subscription?.remove();
            }
        };
    }, [client, db]);
}
//# sourceMappingURL=useSQLiteDevTools.js.map