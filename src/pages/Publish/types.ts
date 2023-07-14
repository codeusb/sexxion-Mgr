export interface channelRes {
  data: {
    channels: channelsData[]
  }
  message: string
}

export interface channelsData {
  id: number
  name: string
}

// 新增文章
export interface addArticleReq {
  title: string
  content: string
  cover: { type: number; images: string[] }
  channel_id: number | string
}

export interface addArticleRes {
  data: {
    id: string
  }
  message: string
}

export interface getArticleDetailRes {
  data: detailData
  message: string
}

export interface detailData {
  id: string
  title: string
  channel_id: string
  content: string
  cover: { type: number; images: string[] }
  pub_date: string
}
