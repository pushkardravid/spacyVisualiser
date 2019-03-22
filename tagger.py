colorMap = {
    'GPE':'#feca74',
    'PERSON':'#aa9cfc',
    'ORG':'#7aecec',
    'NORP':'#c887fb',
    'LAW':'#ff8197',
    'ORDINAL':'#e4e7d2',
    'CARDINAL':'#e4e7d2',
    'FAC':'#ddd',
    'LOC':'#ff9561',
    'LANGUAGE':'#ff8197',
    'DATE':'#bfe1d9',
    'TIME':'#bfe1d9',
    'PERCENT':'#e4e7d2',
    'MONEY':'#e4e7d2',
    'QUANTITY':'#e4e7d2',
    'PRODUCT': '#17a2b8',
    'WORK_OF_ART': '#f0d0ff',
    'EVENT':'#ffeb80'
}
for k,v in colorMap.items():
    print('.' + k + '{' + 'background:'+ v + ';}')