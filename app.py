from flask import Flask, request, jsonify
from flask import render_template
import json
from entityTagger import tag
from medicalEntityTagger import tagMedical

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ner', methods=['POST'])
def nerTagger():
    data = json.loads(request.get_data().decode())
    text = data['text']
    tagged_entities = tag(text)
    resp = [{'text':t[0], 'start':t[1], 'end':t[2], 'label':t[3]} for t in tagged_entities]
    tags = list(set([entity['label'] for entity in resp]))
    return jsonify({'tagged_entities':resp, 'tags':tags})

@app.route('/nerMedical', methods=['POST'])
def nerTaggerMedical():    
    data = json.loads(request.get_data().decode())
    text = data['text']
    tagged_entities = tagMedical(text)
    tags = [tagged_entity['label'] for tagged_entity in tagged_entities] if len(tagged_entities) != 0 else []
    return jsonify({'tagged_entities':tagged_entities, 'tags':tags})

if __name__ == '__main__':
    app.run(port=5001, debug=True)