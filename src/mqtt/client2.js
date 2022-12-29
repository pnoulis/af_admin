import { connect  as mqtt } from 'precompiled-mqtt';

const username = import.meta.env.VITE_REACT_APP_BROKER_USERNAME;
const password = import.meta.env.VITE_REACT_APP_BROKER_PASSWORD;
const url = import.meta.env.VITE_REACT_APP_BROKER_URL;
const port = import.meta.env.VITE_REACT_APP_BROKER_PORT;
const protocol = import.meta.env.VITE_REACT_APP_BROKER_PROTOCOL;
const host = `${protocol}://${url}:${port}`;
const DEFAULT_SERVER = 1;
const DEFAULT_OPTIONS = {
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: false,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000, // 30 seconds
    clientId: `mqttjs_${Math.random().toString(16).slice(2, 8)}`,
};
const servers = [
    {
        id: 'env',
        host,
        options: {
            ...DEFAULT_OPTIONS,
            username,
            password,
        }
    },
    {
        id: 'dev',
        host: 'ws://192.168.100.187:9001',
        options: {
            ...DEFAULT_OPTIONS,
            username: 'pavlos',
            password: 'mindtr@p',
        }
    },

    {
        id: 'dummy',
    }
];

export default function MqttClient(server = DEFAULT_SERVER, userOptions = {}) {
    // server configuration
    switch (DEFAULT_SERVER) {
        case 0: // env
            this.server = mqtt(
                servers[server].host,
                { ...servers[server].options, ...userOptions }
            );
            break;
        case 1: // dev -> default
            this.server = mqtt(
                servers[server].host,
                { ...servers[server].options, ...userOptions }
            );
            break;
        case 2: // dummy
            this.server = null;
            break;
        default:
    }

    // client configuration

    // key = 'event name'
    // value = subscribers: [() => {}]
    this.subscriptions = new Map();
    this.subscriptions.set('connect', []);
    return this;
}

MqttClient.prototype.resolveTopic = function() {
};

MqttClient.prototype.publish = function (event, handler) {
};

MqttClient.prototype.subscribe = function (event, handler) {
    let subscription = this.subscriptions.get(event);

    // setup subscription
    if (!subscription) {
        this._subscribe(event);
        subscription = [];
        this.subscriptions.set(event, subscription);
        this.server.on('message', (topic, message) => {
            subscription.forEach(handler => handler && handler(message));
        });
    }

    // register event handler
    const handlerId = subscription.push(handler) - 1;
    const unsubscribe = () => subscription.splice(handlerId, 1);
    const publish = (message, options) => this._publish(event, message, options);

    return [unsubscribe, publish];
};

MqttClient.prototype._subscribe = function (event) {
    this.server.subscribe(event, (err) => {
        if (err) throw new Error(err);
    });
};

MqttClient.prototype._publish = function (topic, message, options) {
    this.server.publish(topic, JSON.stringify(message), options, (err) => {
        if (err) throw new Error(err);
    });
};
