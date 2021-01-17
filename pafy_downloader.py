import uuid

import pafy

# video.title video.viewcount, video.author, video.length
# video.duration, video.likes, video.dislikes
from youtube_api import YoutubeSearchResultItem


def search(youtube_link):
    ans = []

    video = pafy.new(youtube_link)
    youtube_item = YoutubeSearchResultItem(
        video_id=video.videoid,
        title=video.title,
        thumbnail_url=video.thumb)

    ans.append(youtube_item)

    return ans


def get_download_types(youtube_link):
    video = pafy.new(youtube_link)

    video_duration = video.duration
    if video_duration.startswith("00:"):
        video_duration = video_duration[len("00:"):]

    video_streams = video.streams
    audio_streams = video.audiostreams

    ans_formats = []
    for temp_video in video_streams:
        temp_format = {
            'format_uuid': str(uuid.uuid4()),
            'file_name': str(temp_video.filename),
            'format_extension': str(temp_video.extension).replace(" ", ""),
            'format_quality': str(temp_video.notes).replace(" ", ""),
            'format_url': temp_video.url,
            'video_duration': video_duration
        }
        ans_formats.append(temp_format)

    for temp_audio in audio_streams:
        temp_format = {
            'format_uuid': str(uuid.uuid4()),
            'file_name': str(temp_audio.filename),
            'format_extension': str(temp_audio.extension).replace(" ", ""),
            'format_quality': str(temp_audio.quality).replace(" ", ""),
            'format_url': temp_audio.url,
            'video_duration': video_duration
        }
        ans_formats.append(temp_format)

    return ans_formats
