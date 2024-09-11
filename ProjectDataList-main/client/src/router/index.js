import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Login
import Login from '@/components/Login/Login'
import Signup from '@/components/Login/Signup'

// PostC
import PostCreate from '@/components/Company/Post'
import PostShow from '@/components/Company/HistoryC'
import PostCEdit from '@/components/Company/EditPostC'
import ResultsC from '../components/Company/ResultsC'

// Shop
import SaleCreate from '@/components/Shop/Sale.vue'
import SaleShow from '@/components/Shop/HistoryS.vue'
import EditShop from '@/components/Shop/EditShop'
import DetailS from '@/components/Shop/DetailS'
import ResultsS from '@/components/Shop/ResultsS'

// index
import Indexs from '../components/Indexs'
import Home from '../components/Home'
import EditUser from '../components/EditUser'
import Quotation from '../components/Quotation.vue'
import Reply from '../components/Reply.vue'

// admin
import DetailA from '../components/Admin/DetailA'
import Match from '../components/Admin/Match.vue'
import PostCIndex from '@/components/Admin/Post_C'
import ShopIndex from '@/components/Admin/Shop'
import ShopShow from '@/components/Admin/ShopShow'
import ReplyA from '../components/Admin/ReplyA.vue'
import ChatA from '../components/Admin/ChatA.vue'
import ChatH from '../components/Admin/ChatH.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    // Login
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/person/create',
      name: 'person-create',
      component: Signup
    },

    // PostC
    {
      path: '/post/create/:personId',
      name: 'post-create',
      component: PostCreate
    },
    {
      path: '/postC/:personId',
      name: 'postC-show',
      component: PostShow
    },
    {
      path: '/postC/edit/:personId/:postCId',
      name: 'postC-edit',
      component: PostCEdit
    },
    {
      path: '/results/:personId/:postCId',
      name: 'resultsC',
      component: ResultsC,
    },

    // Shop
    {
      path: '/shop/post/:personId',
      name: 'shop-create',
      component: SaleCreate
    },
    {
      path: '/shop/:personId',
      name: 'shop-show',
      component: SaleShow
    },
    {
      path: '/shop/edit/:personId/:shopId',
      name: 'shop-edit',
      component: EditShop
    },
    {
      path: '/shop/detail/:personId/:shopId',
      name: 'shop-detail',
      component: DetailS
    },
    {
      path: '/result/:personId/:shopId',
      name: 'resultsS',
      component: ResultsS,
    },


    // Index
    {
      path: '/indexs/:personId',
      name: 'indexs',
      component: Indexs,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit/:personId',
      name: 'edit-user',
      component: EditUser,
    },
    {
      path: '/quotation/:personId/:postCId/:shopId',
      name: 'quotation',
      component: Quotation,
    },
    {
      path: '/reply/:personId/:postCId/:shopId',
      name: 'reply',
      component: Reply,
    },
    
    // Admin
    {
      path: '/detailA/:personId/:postCId/:shopId',
      name: 'detailA',
      component: DetailA
    },
    {
      path: '/match/:personId/:postCId/:shopId',
      name: 'match',
      component: Match
    },
    {
      path: '/postCs/:personId',
      name: 'postCs',
      component: PostCIndex
    },
    {
      path: '/shops/:personId/:postCId',
      name: 'shops',
      component: ShopIndex
    },
    {
      path: '/shops/:personId',
      name: 'shop-admin',
      component: ShopShow
    },
    {
      path: '/replyA/:personId',
      name: 'replyA',
      component: ReplyA
    },
    {
      path: '/chatA/:personId',
      name: 'chatA',
      component: ChatA
    },
    {
      path: '/chatH/:personId',
      name: 'chatH',
      component: ChatH
    }
  ]
})
