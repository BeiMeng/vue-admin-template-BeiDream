 import Mock from 'mockjs'

import loginAPI from './login'
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/user\/getUserPermissions\.*/, 'get', loginAPI.getUserPermissions)
