from __future__ import unicode_literals
from flask import Flask, render_template, request, jsonify

from pafy_downloader import get_download_types
from pytube_downloader import download_available, get_response_pytube
from youtube_api import YoutubeApi, convert2_youtube_items
# from pytube_downloader import download_available, get_response_pytube, get_download_types
from youtube_dl_downloader import get_response_youtubedl
from my_util import validate_download_link
import uuid

app = Flask(__name__)

url_dict = {"1": "1"}


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')
    # return render_template('index_backup.html')


@app.route('/convert', methods=['POST'])
def convert():
    download_link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(download_link):
        search_results = YoutubeApi().search(download_link)
        items = convert2_youtube_items(search_results['items'])
        return jsonify(items)
    else:
        pass


@app.route('/download_types', methods=['POST'])
def download_types():
    download_link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(download_link):
        # types = get_download_types(download_link)
        types = get_download_types(download_link)
        return jsonify(types)


@app.route('/generate', methods=['POST'])
def generate_key():
    link = request.form.get('download_link', default='test_default_link')
    generated_id = str(uuid.uuid1())
    url_dict[generated_id] = link
    return jsonify(generated_id)


# this method accept a normal HTML form submit, see "index_backup.html"
@app.route('/download', methods=['GET'])
def download():
    # link_key = request.form.get('download_link', default='test_default_link')
    link_key = request.args.get('download_key')
    link = url_dict.get(link_key)

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
