export interface articleReq {
  status?: string
  channel_id?: string
  begin_pubdate?: string
  end_pubdate?: string
  page?: string
  per_page?: string
}

export interface articleRes {
  data: articleDeatil
  message: string
}

export interface articleDeatil {
  page: null
  per_page: null
  results: articleResultData[]
  total_count: number
}

export interface articleResultData {
  id: string
  title: string
  status: number
  comment_count: number
  pubdate: string
  cover: {
    type: number
    images: string[]
  }
  like_count: number
  read_count: number
}

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

export interface delateRes {
  data: null
  message: string
}
