import en_core_web_sm

nlp = en_core_web_sm.load()

def tag(text):
    doc = nlp(text)
    tagged_entities = [(X.text, X.start_char, X.end_char, X.label_) for X in doc.ents]
    return tagged_entities