from __future__ import unicode_literals
from flask import Flask, render_template, request
from pytube_downloader import download_available, get_response_pytube
from youtube_dl_downloader import get_response_youtubedl
from youtube_util import validate_download_link

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def download():
    if request.method == 'GET':
        return render_template('index.html')
    else:
        download_link = request.form['youtube_link']
        if validate_download_link(download_link):
            return get_response(download_link)
        else:
            return render_template('index.html')


def get_response(youtube_link):
    if download_available(youtube_link):
        return get_response_pytube(youtube_link)
    else:
        return get_response_youtubedl(youtube_link)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
