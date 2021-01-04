from __future__ import unicode_literals
from flask import Flask, render_template, request
from pytube_downloader import download_available, get_response_pytube
from youtube_dl_downloader import get_response_youtubedl
from youtube_util import validate_download_link

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')
    # return render_template('index_backup.html')


@app.route('/convert', methods=['POST'])
def convert():
    download_link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(download_link):
        # show preview of the video using Youtube api, instead of download
        return get_response(download_link)
    else:
        pass


# this method accept a normal HTML form submit, see "index_backup.html"
@app.route('/download', methods=['POST'])
def download():
    link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(link):
        return get_response(link)
    else:
        pass


def get_response(youtube_link):
    if download_available(youtube_link):
        return get_response_pytube(youtube_link)
    else:
        return get_response_youtubedl(youtube_link)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
