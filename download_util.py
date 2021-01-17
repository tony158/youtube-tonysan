# some utility functions here
import requests
import uuid
from flask import Response, stream_with_context

MIME_TYPE = 'video/mp4'
CHUNK_SIZE = 1024 * 4
PREFIX_NAME = 'youtube-tonysan.com_'
SUBTYPE_NAME_PAIR = ('mp4', '.mp4')
SUPPORTED_TYPES = {'mp4', 'webm', 'mp3'}


def download_available(youtube_link):
    return True


def validate_download_link(youtube_link):
    return True
    # return youtube_link and "youtube" in youtube_link


def get_download_response(youtube_link):
    file_name = f'{PREFIX_NAME}{str(uuid.uuid4())}'
    req = requests.get(youtube_link, stream=True)
    resp = Response(stream_with_context(req.iter_content(chunk_size=CHUNK_SIZE)),
                    mimetype=MIME_TYPE,
                    content_type=req.headers['content-type'],
                    direct_passthrough=True)
    resp.headers['Content-Disposition'] = f'attachment;filename={file_name}{SUBTYPE_NAME_PAIR[1]}'

    return resp
