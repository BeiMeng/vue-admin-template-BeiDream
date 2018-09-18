import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    id:'admin',
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    permissions:[],
    id:'editor',
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  getUserPermissions:config=>{
    let param=param2Obj(config.url)
    let userId=JSON.parse(param.userId).userId
    console.log(userId)
    let permissions=[]
    if(userId=='admin'){
      permissions=[
        {
          title:'角色管理',
          icon:'link',
          order:1,
          default:true,
          children:[
            {
               name:'roleInfo', //对应路由的命名：Name
               path:'/role', //对应路由的url地址：path
               title:'角色信息',
               icon:'link',
               viewPath:'/role/roleInfo' //对应懒加载的页面： component 
            },
            {
              name:'roleOper', //对应路由的命名：Name
              path:'/roleOper', //对应路由的url地址：path
              title:'角色操作',
              icon:'link',
              viewPath:null,
              defaultView:'/roleOper/roleAdd',   //点击非页面菜单显示默认的子页面的path，对应路由的:redirect(defaultView 也可为'noredirect')
              children:[
                  {
                    name:'roleAdd', //对应路由的命名：Name
                    path:'roleAdd', //对应路由的url地址：path
                    title:'角色新增',
                    icon:'link',
                    viewPath:'/role/roleAdd' //对应懒加载的页面： component 
                  },
                  {
                    name:'roleEdit', //对应路由的命名：Name
                    path:'roleEdit', //对应路由的url地址：path
                    title:'角色编辑',
                    icon:'link',
                    viewPath:'/role/roleEdit' //对应懒加载的页面： component 
                  },
                  {
                    name:'roleDel', //对应路由的命名：Name
                    path:'roleDel', //对应路由的url地址：path
                    title:'角色删除',
                    icon:'link',
                    viewPath:'/role/roleDel' //对应懒加载的页面： component 
                  }                                       
              ]               
            }
          ]
        },          
        {
          title:'用户管理',
          icon:'user',
          order:2,
          default:false,
          children:[
            {
               name:'userInfo', //对应路由的命名：Name
               path:'/user', //对应路由的url地址：path
               title:'用户信息',
               icon:'userInfo',
               viewPath:'/user/userInfo' //对应懒加载的页面： component 
            },
            {
              name:'userOper', //对应路由的命名：Name
              path:'/userOper', //对应路由的url地址：path
              title:'用户操作',
              icon:'userOper',
              viewPath:null,
              defaultView:'/userOper/userAdd',   //点击非页面菜单显示默认的子页面的path，对应路由的:redirect(defaultView 也可为'noredirect')
              children:[
                  {
                    name:'userAdd', //对应路由的命名：Name
                    path:'userAdd', //对应路由的url地址：path
                    title:'用户新增',
                    icon:'userAdd',
                    viewPath:'/user/userAdd' //对应懒加载的页面： component 
                  },
                  {
                    name:'userEdit', //对应路由的命名：Name
                    path:'userEdit', //对应路由的url地址：path
                    title:'用户编辑',
                    icon:'userEdit',
                    viewPath:'/user/userEdit' //对应懒加载的页面： component 
                  }                                       
              ]               
            }
          ]
        },
        // {
        //   title:'系统管理',
        //   icon:'sys',
        //   order:3,
        //   default:false,
        //   children:[
        //     {
        //       name:'config',
        //       icon:'config',
        //       title:'配置管理',
        //       path:'/config',              
        //       viewPath:null,
        //       defaultView:null,
        //       children:[
        //         {
        //           name:'logConfig',
        //           icon:'logConfig',
        //           title:'日志配置',
        //           path:'logConfig',
        //           isRoot:true,
        //           viewPath:null,
        //           defaultView:null,
        //           children:[
        //             {
        //               name:'logInfo', //对应路由的命名：Name
        //               path:'logInfo', //对应路由的url地址：path
        //               title:'日志信息',
        //               icon:'logInfo',
        //               viewPath:'/config/log/logInfo' //对应懒加载的页面： component 
        //             },
        //             {
        //               name:'logAdd', //对应路由的命名：Name
        //               path:'logAdd', //对应路由的url地址：path
        //               title:'日志新增',
        //               icon:'logAdd',
        //               viewPath:'/config/log/logAdd' //对应懒加载的页面： component 
        //             }                      
        //           ]
        //         },
        //         {
        //           name:'operConfig',
        //           icon:'operConfig',
        //           title:'操作配置',
        //           path:'operConfig',
        //           viewPath:null,
        //           defaultView:null,
        //           children:[
        //             {
        //               name:'userAdd', //对应路由的命名：Name
        //               path:'userAdd', //对应路由的url地址：path
        //               title:'用户新增',
        //               icon:'userAdd',
        //               viewPath:'/user/userAdd' //对应懒加载的页面： component 
        //             },
        //             {
        //               name:'userEdit', //对应路由的命名：Name
        //               path:'userEdit', //对应路由的url地址：path
        //               title:'用户编辑',
        //               icon:'userEdit',
        //               viewPath:'/user/userEdit' //对应懒加载的页面： component 
        //             }  
        //           ]
        //         }                
        //       ]

        //     }
        //   ]          
        // }        
      ]      
      return permissions
    }else{
      permissions=[
        {
          title:'角色管理',
          icon:'link',
          order:1,
          default:true,
          children:[
            {
               name:'roleInfo', //对应路由的命名：Name
               path:'/role', //对应路由的url地址：path
               title:'角色信息',
               icon:'link',
               viewPath:'/role/roleInfo' //对应懒加载的页面： component 
            },
            {
              name:'roleOper', //对应路由的命名：Name
              path:'/roleOper', //对应路由的url地址：path
              title:'角色操作',
              icon:'link',
              viewPath:null,
              defaultView:'/roleOper/roleAdd',   //点击非页面菜单显示默认的子页面的path，对应路由的:redirect(defaultView 也可为'noredirect')
              children:[
                  {
                    name:'roleAdd', //对应路由的命名：Name
                    path:'roleAdd', //对应路由的url地址：path
                    title:'角色新增',
                    icon:'link',
                    viewPath:'/role/roleAdd' //对应懒加载的页面： component 
                  },
                  {
                    name:'roleEdit', //对应路由的命名：Name
                    path:'roleEdit', //对应路由的url地址：path
                    title:'角色编辑',
                    icon:'link',
                    viewPath:'/role/roleEdit' //对应懒加载的页面： component 
                  }                                      
              ]               
            }
          ]
        },          
        {
          title:'用户管理',
          icon:'user',
          order:2,
          default:false,
          children:[
            {
               name:'userInfo', //对应路由的命名：Name
               path:'/user', //对应路由的url地址：path
               title:'用户信息',
               icon:'userInfo',
               viewPath:'/user/userInfo' //对应懒加载的页面： component 
            },
            {
              name:'userOper', //对应路由的命名：Name
              path:'/userOper', //对应路由的url地址：path
              title:'用户操作',
              icon:'userOper',
              viewPath:null,
              defaultView:'/userOper/userAdd',   //点击非页面菜单显示默认的子页面的path，对应路由的:redirect(defaultView 也可为'noredirect')
              children:[
                  {
                    name:'userAdd', //对应路由的命名：Name
                    path:'userAdd', //对应路由的url地址：path
                    title:'用户新增',
                    icon:'userAdd',
                    viewPath:'/user/userAdd' //对应懒加载的页面： component 
                  },
                  {
                    name:'userEdit', //对应路由的命名：Name
                    path:'userEdit', //对应路由的url地址：path
                    title:'用户编辑',
                    icon:'userEdit',
                    viewPath:'/user/userEdit' //对应懒加载的页面： component 
                  }                                       
              ]               
            }
          ]
        }     
      ] 
      return permissions
    }
  },
  logout: () => 'success'
}
