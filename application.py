from __future__ import unicode_literals
from flask import Flask, render_template, request, jsonify
from pafy_resolver import get_download_types, search
from google_youtube_api import YoutubeApi, convert2_youtube_items
from youtube_dl_downloader import get_response_file
from download_util import validate_download_link, get_download_response, download_available
import uuid

application = app = Flask(__name__)

url_dict = {"dummy_key": "dummy_url"}


@app.route('/', methods=['GET'])
@app.route('/static/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    download_link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(download_link):
        if 'youtube.com' not in download_link:
            search_results = YoutubeApi().search(download_link)
            items = convert2_youtube_items(search_results['items'])
        else:
            items = search(download_link)

        return jsonify(items)
    else:
        pass


@app.route('/download_types', methods=['POST'])
def download_types():
    download_link = request.form.get('youtube_link', default='test_default_link')
    if validate_download_link(download_link):
        types = get_download_types(download_link)
        return jsonify(types)


@app.route('/generate_key', methods=['POST'])
def generate_key():
    link = request.form.get('download_link', default='test_default_link')
    generated_id = str(uuid.uuid4())
    url_dict[generated_id] = link
    return jsonify(generated_id)


@app.route('/download', methods=['GET'])
def download():
    link_key = request.args.get('download_key', default=None)
    download_link = url_dict.get(link_key)
    url_dict.pop(link_key, None)

    if validate_download_link(download_link):
        if download_available(download_link):
            return get_download_response(download_link)
        else:
            return get_response_file(download_link)
    else:
        pass


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    # app.run(debug=True)
    app.run()
