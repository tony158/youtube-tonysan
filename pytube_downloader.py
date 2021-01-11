from __future__ import unicode_literals
from flask import Response, stream_with_context
from pytube import YouTube
import requests
import uuid

CHUNK_SIZE = 1024
MIME_TYPE = 'video/mp4'
PREFIX_NAME = 'youtube-tonysan.com_'
SUBTYPE_NAME_PAIR = ('mp4', '.mp4')
SUPPORTED_TYPES = {'mp4', 'webm', 'mp3'}


def download_available(youtube_link):
    return True


def get_download_types(youtube_link):
    streams = YouTube(youtube_link).streams
    ans_formats = []

    for supported in SUPPORTED_TYPES:
        temp = streams.filter(subtype=supported).order_by('resolution').desc()
        if temp:
            ans_formats.append("{} {}".format(str(temp.first().mime_type).replace(" ", ""),
                                              str(temp.first().resolution)).replace(" ", ""))

    return ans_formats


def get_response_pytube(youtube_link):
    print("---------------extracted_link--------------")
    print(youtube_link)
    print("-------------------------------------------")

    file_name = f'{PREFIX_NAME}{str(uuid.uuid4())}'
    req = requests.get(youtube_link, stream=True)
    resp = Response(stream_with_context(req.iter_content(chunk_size=CHUNK_SIZE, decode_unicode=False)),
                    mimetype=MIME_TYPE,
                    content_type=req.headers['content-type'],
                    direct_passthrough=True)
    resp.headers['Content-Disposition'] = f'attachment;filename={file_name}{SUBTYPE_NAME_PAIR[1]}'

    return resp
