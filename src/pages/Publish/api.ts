import {http} from "../../utils/http"
import { addArticleReq,addArticleRes,
         channelRes,getArticleDetailRes} from './types'

// 获取-所有频道
export const getChannel = () =>
  http.get<channelRes, channelRes["data"]>("/channels");

// 新增文章
export const addArticle = (params:addArticleReq) =>
  http.post<addArticleRes, addArticleRes['data']>("/mp/articles?draft=false",params)

// 文章详情
export const getArticleDetail = (id:string) =>
  http.get<getArticleDetailRes,getArticleDetailRes['data']>(`/mp/articles/${id}`)

// 更新文章
export const updateArticle = (id:string,params:addArticleReq) =>
  http.put<addArticleRes, addArticleRes['data']>(`/mp/articles/${id}?draft=false`,params)
