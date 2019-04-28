/**
 * 封装的websocket类 
 */

import CONFIG from '@@/config';

export default {
  ws: {},

  init() {
    // 创建websocket
    this.ws = new WebSocket(CONFIG.baseWebSocketURL);

    // 连接建立时触发 xxx注意回调方法的this指的是ws对象了
    this.ws.onopen = this.onopen.bind(this);
    //  客户端接收服务端数据时触发
    this.ws.onmessage = this.onmessage.bind(this);
    // 通信发生错误时触发
    this.ws.onerror = this.onerror.bind(this);
    // 连接关闭时触发
    this.ws.onclose = this.onclose.bind(this);
  },

  onopen() {
    var data = JSON.stringify({
      type: 'init',
    });
    console.log('onopen: ', data);
    this.ws.send(data);
  },

  onmessage(e) {
    var data = JSON.parse(e.data);
    console.log('onmessage: ', data);
    switch(data['type']) {
      // 心跳检测
      case 'ping':
        this.ws.send(JSON.stringify({type: 'pong'}));
        break;

      // 登录后gateway返回的client_id等信息
      case 'init':
        this.onInit && this.onInit(data);
        break;

      // 添加通讯录好友请求
      case 'addContact':
        this.onAddContact && this.onAddContact(data);
        break;

      // 对方同意自己的添加通讯录好友请求
      case 'agreeAddContact':
        this.onAgreeAddContact && this.onAgreeAddContact(data);
        break;

      // 聊天
      case 'chat':
        this.onChat && this.onChat(data);
        break;
    }
  },

  onerror(err) {
    console.log('通信发生错误: ', err);
  },

  onclose() {
    console.log('连接关闭');
  }
}
