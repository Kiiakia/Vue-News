import Center from '../views/center/Center.vue';
import Home from '../views/home/Home.vue';
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewsEdit'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit'

// 如果不加'/'，就是往父亲路由下面加的子路由，如果加了，全新开始
const routerConfig = [
    {
        path:'/center',
        name:'center',
        component:Center
    },
    {
        path:'/index',
        name:'index',
        component:Home
    },
    {
        adminAuth:true,
        path:'/user-manage/useradd',
        name:'userAdd',
        component:UserAdd
    },
    {
        adminAuth:true,
        path:'/user-manage/userlist',
        name:'userList',
        component:UserList
    },
    {
        path:'/news-manage/newsadd',
        name:'newsAdd',
        component:NewsAdd
    },
    {
        path:'/news-manage/newslist',
        name:'newsList',
        component:NewsList
    },
    {
        path:'/news-manage/newsedit/:id',
        name:'newsEdit',
        component:NewsEdit
    },
    {
        path:'/product-manage/productadd',
        name:'productAdd',
        component:ProductAdd
    },
    {
        path:'/product-manage/productlist',
        name:'productList',
        component:ProductList
    },
    {
        path:'/product-manage/productedit/:id',
        name:'productEdit',
        component:ProductEdit
    },
    {
        path:'/',
        redirect:'/index'
    }
];

export default routerConfig;