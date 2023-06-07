import {http} from "../../utils/http"
import { articleReq,articleRes,
         channelRes,delateRes,delateReq } from './types'

// 获取-文章列表
export const getArticle = (params:articleReq) =>
  http.get<articleRes, articleRes["data"]>("/mp/articles",
  {params}
  );

// 获取-所有频道
export const getChannel = () =>
  http.get<channelRes, channelRes["data"]>("/channels");

// 删除文章
export const deleteArticle = (params:delateReq) =>
  http.delete<delateRes, delateRes['data']>('/mp/articles',
  {params}
)
