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
        ans_formats.append(create_format(temp_video, video_duration, True))

    for temp_audio in audio_streams:
        ans_formats.append(create_format(temp_audio, video_duration, False))

    return ans_formats


def create_format(video_audio, video_duration, is_video: bool):
    format_quality = video_audio.notes if is_video else video_audio.quality

    return {
        'format_uuid': str(uuid.uuid4()),
        'file_name': str(video_audio.filename),
        'format_extension': str(video_audio.extension).replace(" ", ""),
        'format_quality': str(format_quality).replace(" ", ""),
        'format_url': video_audio.url,
        'video_duration': video_duration
    }
