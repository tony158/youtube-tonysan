from flask import Flask, render_template, request, Response, stream_with_context
from pytube import YouTube
import requests

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def convert():
    if request.method == 'POST':
        youtube_link = request.form['youtube_link']
        # YouTube(youtube_link).streams.first().download()
        # return send_file('test_video.mp4', as_attachment=True)
        return get_response(youtube_link)
    else:
        return render_template('index.html')


def get_response(content_link):
    extracted_link = YouTube(content_link).streams.first().url
    req = requests.get(extracted_link, stream=True)
    resp = Response(stream_with_context(req.iter_content(chunk_size=2048, decode_unicode=False)),
                    mimetype='video/mp4',
                    content_type=req.headers['content-type'],
                    direct_passthrough=True)
    resp.headers['Content-Type'] = 'text/plain;charset=UTF-8'
    resp.headers['Content-Disposition'] = 'attachment;filename=SmartFileName.mp4'

    return resp


def generate_video(content_link):
    video_stream = YouTube(content_link).streams.first()
    bytes_remaining = video_stream.filesize

    for chunk in request.get(content_link, streaming=True):
        bytes_remaining -= len(chunk)
        yield chunk


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
