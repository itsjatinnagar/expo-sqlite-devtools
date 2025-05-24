export let useSQLiteDevTools;
// @ts-ignore process.env.NODE_ENV is defined by metro transform plugins
if (process.env.NODE_ENV !== 'production') {
    useSQLiteDevTools = require('./useSQLiteDevTools').useSQLiteDevTools;
}
else {
    useSQLiteDevTools = () => { };
}
//# sourceMappingURL=index.js.map