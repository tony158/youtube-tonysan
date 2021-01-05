from googleapiclient.discovery import build

google_youtube_api_key = 'AIzaSyBTiGSTmmPF0yk4zsqnYQPcUh7Hp5TDUig'


class YoutubeApi:
    def __init__(self):
        self.youtube = build('youtube', 'v3', developerKey=google_youtube_api_key)

    def search(self, key_word, target_type='video', max_len=20):
        req = self.youtube.search().list(q=key_word, part='snippet', type=target_type, maxResults=max_len)
        return req.execute()
