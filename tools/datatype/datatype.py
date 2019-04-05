#!/usr/bin/env python3
# -*- coding:utf-8 -*-
#############################################################################

import csv, json, os.path, urllib.request

#############################################################################

urls = [
    'http://www.iana.org/assignments/media-types/application.csv',
    'http://www.iana.org/assignments/media-types/audio.csv',
    'http://www.iana.org/assignments/media-types/font.csv',
    'http://www.iana.org/assignments/media-types/image.csv',
    'http://www.iana.org/assignments/media-types/message.csv',
    'http://www.iana.org/assignments/media-types/model.csv',
    'http://www.iana.org/assignments/media-types/multipart.csv',
    'http://www.iana.org/assignments/media-types/text.csv',
    'http://www.iana.org/assignments/media-types/video.csv',
]

#############################################################################

D = {}

for url in urls:

    resp = urllib.request.urlopen(url)

    rows = csv.reader(resp.read().decode("utf-8"))

    for row in rows:

        if len(row) == 3 and row[0] != 'Name':

            D[row[1]] = row[0]

#############################################################################

with open(os.path.dirname(os.path.realpath(__file__)) + '/../../controls/Schema/json/datatype.json', 'w') as f:

    json.dump(D, f)

#############################################################################
