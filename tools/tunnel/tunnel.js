import localtunnel from "localtunnel";

(async () => {
  try {
    const tunnel = await localtunnel({ port: 4200, subdomain: "sqlmadeez" });

    if (!tunnel.url.includes("sqlmadeez")) {
      console.log("Primary subdomain not available, trying backup..");
      tunnel.close();

      const backupTunnel = await localtunnel({
        port: 4200,
        subdomain: "sqlmadeez1",
      });
      console.log("Your tunnel URL is:", backupTunnel.url);

      backupTunnel.on("close", () => {
        console.log("Backup tunnel closed");
      });

      return;
    }

    console.log("Your tunnel URL is:", tunnel.url);

    tunnel.on("close", () => {
      console.log("Tunnel closed");
    });
  } catch (err) {
    console.error("Error creating tunnel", err);
  }
})();
