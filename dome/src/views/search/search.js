import React from 'react'
import '../../assets/css/search.css'
import url from '../../assets/img/放大镜.png'
import { getHotSearch,getSearch } from '../../util/axios'
class Search extends React.Component{
    constructor(){
        super()
        this.state={
            hotWord:[],
            val:'',
            songList:[]
        }
        this.inpVal = React.createRef()
    }
    //挂载
    componentDidMount(){
        //组件一家在调取热门列表函数
        this.getHotList()
    }
   
        //获取热门搜索列表
        getHotList() {
            getHotSearch().then((res)=>{
                // console.log(res, "热搜列表");
                if (res.data.code ==200) {
                   
                    this.setState({
                      hotWord:res.data.data.filter((item, i) => i < 10),
                    });
                    // console.log(this.state.hotWord,'jhdak');
                  }
            })
        }
        
        //封装一个搜索的方法
        goSearch(keywords){
            this.inpVal.current.value = keywords;
            getSearch({
                keywords,
            }).then((res)=>{
                console.log(res,'audho')
                if(res.data.code===200){
                    console.log(res,'audho')
                    this.setState({
                        
                        songList:res.data.result.songs
                    },()=>{
                        console.log(this.state.songList,'kdjwai')
                    })
                }
                
            })
        }
        changeVal(){
            let inp = document.querySelector('ss')
            this.setState({
                val:ss.value
            })
        }
//封装一个enter事件
        enter(e){
            //当用户输入enter的时候触发搜索事件
    //保证用户输入的内容不为空
            if(e.keyCode===13 &&e.target.value !=''){
                this.goSearch(e.target.value)
            }
        }

    changeInfo(e){
        if(e.target.value !=''){
            this.goSearch(e.target.value)
        }else{
            this.reset()
        }
    }
   reset(){
       //清空value.input
       this.inpVal.current.value = ''
       //清空搜索列表
       this.setState({
           songList:[]
       })
   }
    render(){
        const {songList,val,hotWord} = this.state

       let hotInfo = <div>
       <p className='hots'>热门搜索</p>
       <ul  className='uul'>
           {hotWord.map((item)=>{
               return (
                   <li className='min' key={item.searchWord}>
                       <a className='aa' onClick={this.goSearch.bind(this,item.searchWord)}>{item.searchWord}</a>
                   </li>
               )
           })}
       </ul>
   </div>
        return(<div className='box'>
            <div className='searchbox'>
                <i className='kkk'></i>
                <input ref={this.inpVal} 
                onChange={this.changeVal.bind(this)}
                onKeyUp={this.enter.bind(this)}
                onChange={this.changeInfo.bind(this)}
                placeholder='搜索歌曲、歌手、专辑' className='ss'   type='text'/>
                <em onClick={this.reset.bind(this)}>x</em>
            </div>
            
            {songList.length==0?hotInfo:''}
            
            <ul>
                {songList.map((item)=>{
                    return(
                        <li  key={item.id}>
                            <i></i>
                            <span>{item.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>)
    }
    
}

export default Search