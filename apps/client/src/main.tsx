import ReactDOM from "react-dom";
import App from "./App";

// always on for now
if (import.meta.env.DEV || import.meta.env.PROD) {
  console.info(import.meta.env);
  const { worker } = await import("~/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

ReactDOM.render(<App />, document.getElementById("root"));
