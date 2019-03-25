from medacy.model import Model

model = Model.load_external('medacy_model_clinical_notes')

def tagMedical(text):
    annotation = model.predict(text)
    return formatResponse(annotation)

def formatResponse(annotation):
    entities_dict = annotation.get_entity_annotations(return_dictionary=True)
    entities = [{'text':entity[3], 'start':entity[1], 'end':entity[2], 'label':entity[0]} for entity in entities_dict.values()]
    return entities