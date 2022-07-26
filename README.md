## 介绍

Vuex 持久化存储并支持设置过期时间。

## 下载

```
npm i vuex-storage-utils
```

## 使用

当通过 mutation 改变 state 后，会将最新的 state 存储在本地。支持设置过期时间，当获
的数据过期时，state 会以 new Vuex.Store 配置项中的 state 为准，当 expires 和 date 
同时存在时，date 的优先级更高。

```javascript
import storage from 'vuex-storage-utils'

new Vuex.Store({
  plugins: [
    storage({
      key: 'foo', // 存储在 localStorage 中的 key
      expires: 1000, // 相对过期时间，1000 秒后。
      date: Wed Jul 27 2022 00:03:39 GMT+0800 (中国标准时间) // 绝对过期时间
    })
  ]
})
```
