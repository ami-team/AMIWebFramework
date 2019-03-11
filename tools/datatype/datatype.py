#############################################################################

import csv, json, os.path, urllib2

urls = [
	'https://www.iana.org/assignments/media-types/application.csv',
	'https://www.iana.org/assignments/media-types/audio.csv',
	'https://www.iana.org/assignments/media-types/font.csv',
	'https://www.iana.org/assignments/media-types/image.csv',
	'https://www.iana.org/assignments/media-types/message.csv',
	'https://www.iana.org/assignments/media-types/model.csv',
	'https://www.iana.org/assignments/media-types/multipart.csv',
	'https://www.iana.org/assignments/media-types/text.csv',
	'https://www.iana.org/assignments/media-types/video.csv',
]

#############################################################################

D = []

for url in urls:

	rows = csv.reader(urllib2.urlopen(url))

	for row in rows:

		if len(row) == 3 and row[0] != 'Name':

			D.append({
				'text': row[0],
				'id': row[1],
			})

#############################################################################

with open(os.path.dirname(os.path.realpath(__file__)) + '/../../controls/Schema/json/datatype.json', 'wb') as f:
    json.dump(D, f)

#############################################################################

