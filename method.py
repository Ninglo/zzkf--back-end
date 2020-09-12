import requests


def get(uri):
    r = requests.get(uri)
    print(r.text)

def put(uri):
    data = {}
    attributeNum = int(input('Input the num of attribute: '))
    for _ in range(attributeNum):
        key = input('Attribute key: ')
        value = input('Attribute value: ')
        data[key] = value
    r = requests.put(uri, data=data)
    print(r.text)

method = input('Input req method(g, p, d, put): ')
uri = input('Input uri: ')
print(uri)
if method == 'g':
    get(uri)
elif method == 'p':
    post(uri)
elif method == 'd':
    delete(uri)
else:
    put(uri)
