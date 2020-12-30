import youtube_dl
from flask import send_file


def get_response_youtubedl(youtube_link):
    ydl_opts = {'format': 'bestaudio/best',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],
                'progress_hooks': [my_hook], }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([youtube_link])

    return send_file('test_video.mp4', as_attachment=True)


def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')
