var toml = require("toml");
const fs = require("fs");
const { spawnSync } = require("child_process");
const RUST_TARGET = "aarch64-unknown-linux-gnu"; // set this to aarch64 or x86_64 -unknown-linux-gnu for ARM or x86 functions.

const cargoToml = toml.parse(fs.readFileSync("rust/Cargo.toml"));

process.chdir("rust");
spawnSync(`cross`, [`build`, `--release`, `--target`, `${RUST_TARGET}`], {
  stdio: "inherit",
});

cargoToml.workspace.members.map((member) => {
  fs.mkdirSync(`${member}/runtime`, { recursive: true });
  fs.copyFileSync(
    `target/${RUST_TARGET}/release/${member}`,
    `${member}/runtime/bootstrap`
  );
});
