import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux'
import store from '@/redux/store'
import '@/icons'; // 初始化svg加载
import './index.css';
import './assets/scss/common.scss'
import './assets/scss/update.antd.css'
import './assets/scss/animate.scss'

ReactDOM.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <>111</>
    </Provider>
 </ConfigProvider>,
  document.getElementById('root')
);

