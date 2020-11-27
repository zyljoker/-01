//引入封装好的axios 库

import http from './axios'

export function recMusic(params){
    return http.get('/personalized',{
        params
    })
}


export function newSong(){
    return http.get('/personalized/newsong')
}

// 排行榜
export function  phbInfo(params){
    return http.get('/top/list?id=3778678',{
        params
    })
}

// 轮播
export function getBanner(){
    return http.get('/banner')
}

//封装歌单详情
export function playDetail(params){
    return http.get('/playlist/detail',{
        params
    })
}

//获取歌曲详细
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}

//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}

//获取歌词
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}
//热搜列表
export function getHotSearch(){
    return http.get('/search/hot/detail')
}

//封装一个搜索接口
export function getSearch(params){
    return http.get('/search',{
        params
    })
}