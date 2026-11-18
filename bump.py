import json

with open('appinfo.json') as f:
    info = json.load(f)
major, minor, patch = info['version'].split('.')
info['version'] = '%s.%s.%d' % (major, minor, int(patch) + 1)
with open('appinfo.json', 'w') as f:
    json.dump(info, f, indent=2)
    f.write('\n')
print(info['id'], info['version'])

