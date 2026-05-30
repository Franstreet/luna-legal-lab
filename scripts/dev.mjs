import { spawn } from "node:child_process";
import { resolve } from "node:path";

const nextBin = resolve(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const env = { ...process.env };

delete env.ANTHROPIC_API_KEY;

const child = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
  env,
  stdio: "inherit",
});

const forwardSignal = (signal) => {
  if (child.exitCode === null) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => forwardSignal("SIGINT"));
process.on("SIGTERM", () => forwardSignal("SIGTERM"));

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
