// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'muse-ui/dist/muse-ui.css'
// import httpRequest from '@/utils/httpRequest'
// import { isAuth } from '@/utils' // 权限方法
import 'jquery'
import {
  Alert,
  AppBar,
  AutoComplete,
  Avatar,
  Badge,
  BottomNav,
  BottomSheet,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  DateInput,
  DataTable,
  Dialog,
  Divider,
  Drawer,
  ExpansionPanel,
  Form,
  Grid,
  GridList,
  Helpers,
  Icon,
  List,
  LoadMore,
  Menu,
  Pagination,
  Paper,
  Picker,
  Popover,
  Progress,
  Radio,
  Select,
  SlidePicker,
  Slider,
  Snackbar,
  Stepper,
  SubHeader,
  Switch,
  Tabs,
  TextField,
  Tooltip
  // theme
} from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'

import 'muse-ui-message/dist/muse-ui-message.css'
import Message from 'muse-ui-message'
// import axios from 'axios'
import VueCookie from 'vue-cookie'
// 挂载全局
// Vue.prototype.$http = httpRequest // ajax请求方法
// Vue.prototype.isAuth = isAuth
// // 保存整站vuex本地储存初始状态
// window.axios = axios

// axios.defaults.baseURL = 'http://192.168.100.150:8080/memberCard'
// axios.defaults.autofaceURL = 'http://192.168.100.150:8080/memberCard'

Vue.use(VueCookie)

Vue.use(Message)// 插件

Vue.use(Alert)
Vue.use(AppBar)
Vue.use(AutoComplete)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(BottomNav)
Vue.use(BottomSheet)
Vue.use(Breadcrumbs)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Chip)
Vue.use(DateInput)
Vue.use(DataTable)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(ExpansionPanel)
Vue.use(Form)
Vue.use(Grid)
Vue.use(GridList)
Vue.use(Helpers)
Vue.use(Icon)
Vue.use(List)
Vue.use(LoadMore)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Paper)
Vue.use(Picker)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Select)
Vue.use(SlidePicker)
Vue.use(Slider)
Vue.use(Snackbar)
Vue.use(Stepper)
Vue.use(SubHeader)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TextField)
Vue.use(Tooltip)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
