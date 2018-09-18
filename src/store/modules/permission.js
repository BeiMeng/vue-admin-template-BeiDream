import { constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'
import { getPermissions, setPermissions} from '@/utils/auth'
import { getUserPermissions } from '@/api/login'
import roleInfo from '@/views/role/roleInfo'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,  //选中的头部菜单模块下的侧边栏菜单列表集合
    addRouters: [],   //需要动态添加的路由集合
    headerMenus:[]    //头部的菜单模块集合
  },
  mutations: {
    SET_ROUTERS: (state, permissions) => {
      //获取顶部菜单模块数据
      state.headerMenus=permissions

      //获取需要动态添加的所有路由
      let serverRouter=[];


      //todo  解决不同头部菜单模块下的菜单路由合并问题
      for (let index = 0; index < permissions.length; index++) {
        let element = permissions[index].children;
        if(index==0){
          serverRouter=element
        }else{      
          serverRouter=serverRouter.concat(element)
        }

      }
      console.log(serverRouter)            
      state.addRouters =serverRouter;

      //获取初次加载显示的菜单模块的侧边栏数据
      let defaultMenus=permissions.filter(p=>p.default==true)
      if(defaultMenus.length==0){
        state.routers = constantRouterMap.concat(permissions[0].children)
      }else{
        state.routers =constantRouterMap.concat(defaultMenus[0].children)
      }      
      
    },
    //点击头部菜单模块时，切换左侧响应的菜单显示数据操作
    SET_HMROUTERS: (state, headMenuName) => {
      let permissions=JSON.parse(getPermissions())
      let routers=permissions.filter(p=>p.title==headMenuName)[0].children
      state.routers = constantRouterMap.concat(routers)
    }  
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let userId=data;
        getUserPermissions(userId).then(response => {
          const permissions = response.data
          for (let index = 0; index < permissions.length; index++) {   //通过后台菜单数据组装前端路由,因为侧边栏直接使用的路由结构进行数据绑定，目前只支持二级结构
            const element = permissions[index];
            warpRouters(element.children,false)
          }
          function warpRouters(pages,isChild){
            for (let m = 0; m < pages.length; m++) {
              const item = pages[m];
              if(item.hasOwnProperty("children")){
                item.path=item.path;
                item.component=Layout 
                item.redirect=item.defaultView              
                item.meta={
                  title:item.title,
                  icon:item.icon
                }
                warpRouters(item.children,true)              
              }else{
                 if(isChild){
                    item.path=item.path;
                    item.component=() => import(`@/views${item.viewPath}`)
                    item.meta={
                      title:item.title,
                      icon:item.icon
                    };
                 }else{
                    item.path=item.path;
                    item.component=Layout
                     item.children= [{
                       name:item.name,
                       path: item.name,
                       component: () => import(`@/views${item.viewPath}`), //import 里面不能使用纯变量，因为是预编译的,但是可以给变量加默认的文件夹路径前缀，这样就会自动预编译此文件夹下全部文件
                       meta:{
                          title:item.title,
                          icon:item.icon                   
                       }                         
                     }]                    
                 }
              }
            }
          }
          // let dd=[
          //   {
          //     title:'角色管理',
          //     icon:'role',
          //     order:1,
          //     default:true,
          //     children:[
          //       {
          //         path: '/role',
          //         component: Layout,
          //         children: [
          //           {
          //             path: 'roleInfo',
          //             name:'roleInfo',
          //             component: () => import('@/views/role/roleInfo'),
          //             meta: { title: 'AAAAA', icon: 'link' }
          //           }                  
          //         ]
          //       },
          //       {
          //         path: '/cc',
          //         component: Layout,
          //         children: [
          //           {
          //             path: 'dd',
          //             name:'dd',
          //             component: () => import('@/views/role/roleAdd'),
          //             meta: { title: 'BBBBB', icon: 'link' }
          //           }
          //         ]
          //       },                           
          //     ]
          //   }
          // ]        
          //setPermissions(JSON.stringify(dd))
          //commit('SET_ROUTERS', dd)         
          setPermissions(JSON.stringify(permissions))
          commit('SET_ROUTERS', permissions)
          resolve()
        }).catch(error => {
          reject(error)
        })

      })
    }
  }
}

export default permission
