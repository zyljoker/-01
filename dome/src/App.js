//创建组件的方式两种
// 函数创建方式
// 引入样式

import React from 'react'
//引入一级路由
import Index from './pages'
import List from './pages/list'
import Play from './pages/play'
//引入路由相关属性
import {Switch,Route,Redirect} from 'react-router-dom'

class Home extends React.Component{
  render(){
    return (<div>
      <Switch>
      <Route path='/index' component={Index}></Route>

      <Route path='/list' component={List}></Route>

      <Route path='/play' component={Play}></Route>

      <Redirect to='/index'></Redirect>
      </Switch>
    </div>)
  }
}

export default Home