/**
 * 配置文件模板
 */

export default {
  // 本地地址
  baseURL: 'http://vchat.com/api', // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseImgURL: 'http://vchat.com/upload/', //图片请求地址前缀, 除非 `url` 是一个绝对 URL。
  baseWebSocketURL: 'ws://127.0.0.1:7272', //WebSocket请求地址


  // 线上地址
  // baseURL: 'http://120.79.174.159/api',
  // baseImgURL: 'http://120.79.174.159/upload/',
  // baseWebSocketURL: 'ws://120.79.174.159:7272',
}