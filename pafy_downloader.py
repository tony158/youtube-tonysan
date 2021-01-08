import pafy


# video.title
# video.viewcount, video.author, video.length
# video.duration, video.likes, video.dislikes

def get_download_types(youtube_link):
    video = pafy.new(youtube_link)

    streams = video.streams
    audio_streams = video.audiostreams

    ans_formats = []
    for temp in streams:
        ans_formats.append(str(temp.extension) + " " + str(temp.notes))

    for temp in audio_streams:
        ans_formats.append(str(temp.extension) + " " + str(temp.quality))

    return ans_formats
