export interface NewsChannel {
  update(news: string): void;
}

export class NewsAgency {
  private channels: NewsChannel[] = [];
  private latestNews: string = "";

  addChannel(channel: NewsChannel): void {
    this.channels.push(channel);
  }

  removeChannel(channel: NewsChannel): void {
    this.channels = this.channels.filter((ch) => ch !== channel);
  }

  publishNews(news: string): void {
    this.latestNews = news;
    this.channels.forEach((channel) => channel.update(news));
  }
}

export class NewsChannel implements NewsChannel {
  private receivedNews: string = "";

  update(news: string): void {
    this.receivedNews = news;
    console.log(`Channel received news: ${news}`);
  }

  getNews(): string {
    return this.receivedNews;
  }
}