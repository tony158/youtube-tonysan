from googleapiclient.discovery import build
from dataclasses import dataclass

google_youtube_api_key = 'AIzaSyBTiGSTmmPF0yk4zsqnYQPcUh7Hp5TDUig'


class YoutubeApi:
    def __init__(self):
        self.youtube = build('youtube', 'v3', developerKey=google_youtube_api_key)

    def search(self, key_word, target_type='video', max_len=16):
        req = self.youtube.search().list(q=key_word, part='snippet', type=target_type, maxResults=max_len)
        return req.execute()


def convert2_youtube_items(search_result_items):
    ans = []
    for item in search_result_items:
        youtube_item = YoutubeSearchResultItem(
            video_id=item['id']['videoId'],
            title=item['snippet']['title'],
            thumbnail_url=item['snippet']['thumbnails']['medium']['url'])
        ans.append(youtube_item)

    return ans


@dataclass
class YoutubeSearchResultItem:
    video_id: str
    title: str
    thumbnail_url: str
