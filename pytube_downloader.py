from __future__ import unicode_literals
from pytube import YouTube

SUBTYPE_NAME_PAIR = ('mp4', '.mp4')
SUPPORTED_TYPES = {'mp4', 'webm', 'mp3'}


def get_download_types(youtube_link):
    streams = YouTube(youtube_link).streams
    ans_formats = []

    for supported in SUPPORTED_TYPES:
        temp = streams.filter(subtype=supported).order_by('resolution').desc()
        if temp:
            ans_formats.append("{} {}".format(str(temp.first().mime_type).replace(" ", ""),
                                              str(temp.first().resolution)).replace(" ", ""))

    return ans_formats
