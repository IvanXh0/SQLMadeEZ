import { spawn } from "child_process";

const turbo = spawn("yarn", ["turbo", "run", "dev"], {
  stdio: "inherit",
  shell: true,
});

const tunnel = spawn("yarn", ["tunnel"], {
  stdio: "inherit",
  shell: true,
});

process.on("SIGINT", () => {
  tunnel.kill();
  turbo.kill();
  process.exit();
});
