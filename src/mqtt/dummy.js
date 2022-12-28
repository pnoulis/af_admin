const topics = [
  {
    topic: '/player/get',
    message: {
      name: "pavlos"
    }
  }
];


class MqttServer extends EventTarget {
  constructor(options) {
    super();
    this.name = 'message';
    this.tempo = options?.tempo || 3000;
    this.intervalId = null;
  }
  emit(topic, message = {}) {
    this.dispatchEvent( new CustomEvent(this.name, {detail: {topic, message}}));
  }
  on(event, handler) {
    this.addEventListener(
      this.name,
      ({detail}) => handler(detail.topic, JSON.stringify(detail.message))
    );
  }
  connect(...args) {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        topics.forEach(({topic, message}) => {
          this.emit(topic, message);
        });
      }, this.tempo);
    }
    return this;
  }
  close() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export default new MqttServer();
