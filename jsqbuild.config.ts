import type { Config } from "@jsq/fe-build";

const ASSET_PATH = process.env.ASSET_PATH || "/";

const config: Config = {
  webpack: {
    devServer: {
      port: 7579, // TODO: Replace this port with a different one not already claimed by another service
    },
    publicPath: ASSET_PATH,
    datadog: {
      applicationId: "", // TODO: add your datadog application id
      clientToken: "", // TODO: add your datadog client token
    },
  },
};
export default config;
