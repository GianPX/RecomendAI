from flask import Flask, jsonify, request
from get_recommendation import recommend_consine, recommend_cluster
import json

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def root():

    #Get title from http request's body
    req_json = request.data.decode('utf-8')
    data = json.loads(req_json)

    #return recommendations
    #return recommend_consine(data['title'])
    return recommend_cluster(data['id'])

@app.route('/', methods=['GET'])
def greet():
    return 'api reached'

if __name__ == "__main__":
    app.run(debug=True)