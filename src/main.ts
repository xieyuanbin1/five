import { createApp } from 'vue'
import App from './App'
import router from './router'

// import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

// 引入样式
import 'ant-design-vue/dist/reset.css';

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
