import React from 'react'
import '../../assets/css/home.css'
import Swiper from 'swiper'
import axios from 'axios'
import {recMusic,newSong,getBanner} from '../../util/axios'
import play1 from '../../assets/img/play.png' 
import '../../assets/css/swiperInfo.css'
class Home extends React.Component {
        constructor() {
            super();
            this.state = {
             plays : play1,
             songList: [],

            butsongList:[],
            bannerList:[],
            bList:[]
            
            }
        }
        //挂载
        componentDidMount(){
            // axios.all([recMusic(),newSong(),getBanner()]).then(
            //     axios.spread((recMusic,newSong,getBanner)=>{
                    
            //         if(recMusic.code===200){
            //             this.setState({
            //                 songList:recMusic.result
            //             })
            //         }
            //     })
            // )
            console.log(this.state.bofang);
            // 推荐歌单
            recMusic({
                limit:6
            })
            .then(res=>{
                console.log(res,'推荐歌单');
                if(res.data.code==200){
                    this.setState({
                      bofang:res.data.result.playCount,
                        songList:res.data.result,
                        
                    })
                    // let aa =  res.data.result.playCount
                    
                }
              
            })

            newSong()
            .then(res=>{
                
                console.log(res,'xinyinyue ');
                if(res.data.code==200){
                    this.setState({
                        butsongList:res.data.result
                    })
                }
            })

            getBanner()
            .then(res=>{
                console.log(res,'koko');
                if (res.data.code === 200) {
                   
                    this.setState(
                      {
                        bannerList: res.data.banners.filter((item,i)=>i<4),
                      },
                      () => {
                        //组件一加载就实现轮播图
                        let swiper = new Swiper(".swiper-container", {
                          pagination: {
                            el: ".swiper-pagination",
                          },
                          autoplay: {
                            //自动播放
                            delay: 2000,
                          },
                          loop: true,
                        });
                      }
                    );
                  }
            })


        }
        
        goList(id){
            this.props.history.push(`/list?id=${id}`)
        }
        render() {
            let { songList,butsongList,bannerList} = this.state

            return ( <div  className='box'>

                 {/* 轮播图 */}

        <div className="swiper-container">
          <div className="swiper-wrapper">
            {bannerList.map((item) => {
              return (
                <div key={item.imageUrl} className="swiper-slide">
                  <img className='asd' src={item.imageUrl} alt="" />
                </div>
              );
            })}
          </div>
          {/* 分页器 */}
          <div className="swiper-pagination"></div>
        </div>

                <div>
                    <p className='tjsong'>推荐歌单</p>
                </div>

                <div className='home'>
                        <ul className='clear'>
                            {songList.map((item)=>{
                                return (
                                    <li className='imgleft' key={item.id} onClick={this.goList.bind(this,item.id)}>
                                        <img className='img' src={item.picUrl} alt=''/>
                                <i className='erji' >{(item.playCount / 10000).toFixed(1) }万 </i>
                                        <p className='text'>{item.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                <div>
                    <p className='tjsong'>最新音乐</p>
                </div>
                
                <div>
                    <ul>
                        {butsongList.map((item)=>{
                            return (
                                <li className='list ' key={item.id}>
                                    
                                    <div className='songname'>
                                    <p className='song'>{item.name}</p>
                                    <img className='imgsq' src={item.picUrl} alt=''/>
                                    {
                                    item.song.artists.map(song=>{
                                    return <span className='songname' key={song.id}>{song.name}-{item.name}</span>
                                    })
                                    }
                                    </div>
                                    <i className='koko'></i>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                </div>)
            }
        }

        export default Home