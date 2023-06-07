export interface channelRes {
  data: {
    channels: any[]
  };
  message: string;
}
// 新增文章
export interface addArticleReq {
  title:string,
  content:string,
  cover:any,
  channel_id: any
}

export interface addArticleRes{
  data: {
    id: string
  };
  message: string;
}

export interface getArticleDetailRes{
  data: detailData;
  message: string;
}

export interface detailData{
  id:string,
  title:string,
  channel_id: string,
  content: string,
  cover:any,
  pub_date:string,
}