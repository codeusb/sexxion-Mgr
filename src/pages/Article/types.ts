export interface articleReq {
  status?:string,
  channel_id?:string,
  begin_pubdate?:string,
  end_pubdate?:string,
  page?:string;
  per_page?:string
}

export interface articleRes {
  data: any;
  message: string;
}

export interface channelRes {
  data: {
    channels: any[]
  };
  message: string;
}


export interface delateRes {
  data: any,
  message: string;
}