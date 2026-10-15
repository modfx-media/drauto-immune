import * as mediaPrefix from "./20261014_media_prefix";

export const migrations = [
  {
    up: mediaPrefix.up,
    down: mediaPrefix.down,
    name: "20261014_media_prefix",
  },
];
