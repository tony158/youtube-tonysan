from __future__ import unicode_literals
from flask import Response, stream_with_context
from pytube import YouTube
import requests
import uuid

CHUNK_SIZE = 1024
MIME_TYPE = 'video/mp4'
PREFIX_NAME = 'youtube-tonysan.com_'


def download_available(youtube_link):
    return YouTube(youtube_link).streams.count() > 0


def get_response_pytube(youtube_link):
    extracted_link = YouTube(youtube_link) \
        .streams \
        .filter(subtype='mp4') \
        .filter(progressive=True) \
        .order_by('resolution') \
        .desc() \
        .first() \
        .url

    print("---------------extracted_link--------------")
    print(extracted_link)
    print("-------------------------------------------")

    file_name = PREFIX_NAME + str(uuid.uuid1())
    req = requests.get(extracted_link, stream=True)
    resp = Response(stream_with_context(req.iter_content(chunk_size=CHUNK_SIZE, decode_unicode=False)),
                    mimetype=MIME_TYPE,
                    content_type=req.headers['content-type'],
                    direct_passthrough=True)
    resp.headers['Content-Disposition'] = 'attachment;filename=' + file_name + '.mp4'

    return resp
