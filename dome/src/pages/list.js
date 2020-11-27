import React from 'react'
import listimg from '../assets/img/listbg.png'
import qsString from 'querystring'
import '../assets/css/list.css'
import imgico from '../assets/img/sq.png'
import imgurl2 from '../assets/img/play.png'
import {playDetail} from '../util/axios'
 class Home extends React.Component{
     constructor(){
         super()
         this.state={
             songList:[],
             playList:[]
            }
     }

     //挂载
     componentDidMount(){
         let query = this.props.location.search.slice(1);
         
         playDetail({
            id: qsString.parse(query).id,
          }).then((res)=>{
              console.log(res,'歌单详情哈哈哈');
              if(res.data.code ==200){
                this.setState({
                    playList: res.data.playlist,
                    songList: res.data.playlist.tracks,
                  });
              }
          })
     }
     //跳转播放页面
  toPlay(id){
    this.props.history.push(`/play?id=${id}`)
}
 render(){
    const {songList,playList}  = this.state
    return (<div>
        <div className='listimg'>
            <p className='one'>{playList.name}</p>
            <span className='tow'>每周一更新</span>
            <p className='strss'>{playList.name}</p>
            
        </div>
        <p className='sk'>歌曲列表</p>

        <div>
                <ul className='ul1'>
                    {songList.map((item,idx)=>{
                        return(
                            <li className='box' key={item.id} onClick={this.toPlay.bind(this,item.id)}>
                                <div className='xxxleft'>
                                    {idx+1}
                                </div>
                                <div className='xxcen'>
                                    <p className='title'> {item.name}</p>
                                    <div className='xbut'>
                                    <img className="imgmin" src={item.img} alt="" />
                                    <span className='span'>{item.name}</span>
                                    </div>
                                </div>
                                <div className='play1'>
                                        
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
    </div>)
    }
}
 export default Home