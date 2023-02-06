import { Proxy } from "./client2.js";
import { Topics } from "../../dummy_backend/mqttRoutes.js";
import * as confPresets from "./conf.js";

const conf = {
  proxy: confPresets.proxy.msq,
  server: confPresets.server.msq,
  registry: confPresets.registry.msq,
  logger: confPresets.logger.msq,
};

const proxy = new Proxy(conf);

const tests = {
  canonicalize() {
    const topics = [
      "wristband/scan",
      "/wristband/scan",
      "wristband/scan/",
      "/wristband/scan/",
      "wristband /scan",
    ];
    proxy.registry.canonicalize(...topics);
  },
  replaceParams() {
    const topics = [
      "/wristband/scan",
      "/${clientId}/scan",
      "/${CLIENTID}/scan",
      "/${clientId}/${clientId}",
      "${missing}/scan/",
      "${missing}/${missing}",
    ];
    proxy.registry.setParam("clientId", "replacedParam");
    proxy.registry.replaceParams(...topics);
  },
  subscriptions() {
    const sub1 = () => {
      console.log("iam sub 1");
    };
    const sub2 = () => {
      console.log("iam sub 2");
    };

    const unsub1 = proxy.subscribe("/wristband/scan", sub1);
    setTimeout(() => {
      const unsub2 = proxy.subscribe("/wristband/scan", sub2);
      unsub2();
    }, 1000);
  },
  publishes() {
    const pub1 = () => {
      console.log("iam pub 1");
    };
    const pub2 = () => {
      console.log("iam pub 2");
    };
    const sub1 = () => {
      console.log("iam sub 1");
    };
    const [topic, pub, sub] = proxy.registry.resolve("/wristband/register");
    const unsub1 = proxy.subscribe("/wristband/register", sub1);
    setTimeout(() => {
      proxy.publish("/wristband/register", {}, pub1);
    }, 1000);
    setTimeout(() => {
      const clients = proxy.subscriptions.get(sub);
      clients[1].cb();
      clients[0].cb();
      clients[0].cb();
      clients[0].cb();
      proxy.publish("/wristband/register", {}, pub2);
    }, 2000);
  },
};
