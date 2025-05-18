const useSQLiteDevTools =
  process.env.NODE_ENV !== "production"
    ? require("./useSQLiteDevTools").default
    : () => {};

export { useSQLiteDevTools };
