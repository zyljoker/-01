import React from 'react'
import qsString from "querystring";
import axios from "axios";
import { playUrl, getLyric, songDetail } from "../util/axios";
import Img from "../assets/img/needle-ip6.png";
import '../assets/css/play.css'
 class play extends React.Component{
    constructor() {
        super();
        this.state = {
          img: Img,
          songUrl: "",
          songDetail: {},
          lyric: "",
        };
      }

      componentDidMount() {
        let query = this.props.location.search.slice(1);
        //axios并发处理
        axios
          .all([
            playUrl({
              id: qsString.parse(query).id,
            }),
            getLyric({
              id: qsString.parse(query).id,
            }),
            songDetail({
              ids: qsString.parse(query).id,
            }),
          ])
          .then(
            axios.spread((songUrl, lyric, songDetail) => {
              console.log(songUrl, "songUrl");
              console.log(lyric, "lyric");
              console.log(songDetail, "songDetail");
              if (songUrl.code === 200) {
                this.setState({
                  songUrl: songUrl.data[0].url,
                });
              }
              if (lyric.code === 200) {
                  /* 
                  歌词字符串：
                  "[00:00.000] 作词 : 小克  [00:00.780] 作曲 : 林家谦"
                  我想要的形式是：
                  00：00 作词 : 小克 
                  {
                     "00：00"：作词 : 小克 ,
                     "00:00": 作曲 : 林家谦
                  }
    
                  */
                  let lyricInfo = ''
                //   let lyric = lyric.lrc.lyric
                lyricInfo = lyric.lrc.lyric
                //设定一个正则 取出 []
                let reg = /\[(.*?)](.*)/g
                //设定一空对象
                let obj = {}
                //替换 replace
                lyricInfo.replace(reg,(a,b,c)=>{
                    //[00:00.000] 作词 : 小克 aaaaaaa
                    //00:00.000 bbbbbb
                    //作词 : 小克 cccccc
                    // console.log(a,'aaaaaaa')
                    // console.log(b,'bbbbbb')
                    // console.log(c,'cccccc')
                    b = b.slice(0,5)
                    obj[b]=c
                })
                this.setState({
                    lyric :obj
                })
                  console.log(obj,'整合之后的对象')
                // this.setState({
                //   lyric: lyric.lrc.lyric,
                // });
              }
              if (songDetail.code === 200) {
                this.setState({
                  songDetail: songDetail.songs[0],
                });
              }
            })
          );
      }


 render() {
    const { songUrl, songDetail, lyric, img } = this.state;
    return (
      <div className="play">
        <div className="play_top">
          <img src={img} />
        </div>
        <div className="play_img_all">
          <i className="play_icon"></i>
          <div className="play_img_box">
            <div className="small_img">
              <img
                src={
                  songDetail.al
                    ? songDetail.al.picUrl
                    : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606381386769&di=b313b7d9646d226c4778d7aa229b9e4c&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F006qOO1Xly1gc7b7lbabxj32dc2dce27.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="play_txt">
          <div className="play_txt_name">
            <span>{songDetail.name}</span>-
           {
               songDetail.ar? songDetail.ar.map(arInfo=>{
               return <span key={arInfo.id}>{arInfo.name}</span>
               }) :''
           }
          </div>
          <div className="play_txt_geci">
            <div className="geci_box">
        {/* <p>{lyric}</p> */}
            </div>
          </div>
        </div>
        <div className="audio_box">
          <audio src={songUrl} controls ></audio>
        </div>
      </div>
    );
  }
}
 export default play