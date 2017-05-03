from lib import csv_io
from lib import json_io

files = {'Vietnam': './data/Database- VN - Project VN 2.csv'}

stats = {}
output = []
for c, path in files.items():
    stats[c] = {}
    data = csv_io.read_csv(path)

    for row in data[1:]:
        if not row[4] or not row[6]:
            continue
        # "Financier's countries"
        if row[4] not in stats[c]:
            stats[c][row[4]] = 0
        stats[c][row[4]] += float(row[6])

for target, sourceObj in stats.items():
    for source_name, v in sourceObj.items():
        if source_name != target:
            if source_name == 'south Korea':
                source_name = 'South Korea'
            output.append({
                'source': source_name,
                'target': target,
                'value': round(v, 0)
            })

json_io.write_json('./data/flow.json', output)