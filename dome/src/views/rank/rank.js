import React from 'react'
import '../../assets/css/rank.css'
import imgurl from '../../assets/img/飚歌榜.png'
import imgico from '../../assets/img/sq.png'
import {phbInfo} from '../../util/axios'
class Rank extends React.Component{
    constructor(){
        super();
        this.state={
            rankList:[],
            num :'01'
        }
    }
    //挂载
    componentDidMount(){
        phbInfo(
            {limit:6}
        )
        .then(res=>{
            console.log(res,'推荐歌单666');
            if(res.data.code==200){
                this.setState({
                    rankList:res.data.playlist.tracks,
                    
                })
            
            }
        })
    }
    render(){
        const {rankList} = this.state
        return(<div className='rank'>
            <div className='topbg'>
            <img className='img' src={imgurl} alt=''/>
            <p className='hottime'>更新时间：11月24日</p>
            </div>

            <div>
                <ul className='ul'>
                    {rankList.map((item,idx)=>{
                        return(
                            <li className='box' key={item.id}>
                                <div className='xxleft'>
                                    {idx+1}
                                </div>
                                <div className='xxcen'>
                                    <p className='title' > {item.name}</p>
                                    <div className='xbut'>
                                    <img className="imgmin" src={item.img} alt="" />
                                    <span className='span'>{item.al.name}</span>
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

export default Rank