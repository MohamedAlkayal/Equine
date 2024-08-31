export default defineAppConfig({
  ui: {
    primary: "main",
    colors: ["main"],
    button: {
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 duration-300",
      default: {
        size: "xl",
      },
    },
  },
});
