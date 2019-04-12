#!/usr/bin/env python3
# -*- coding:utf-8 -*-
#############################################################################

import io, os, csv, sys, json, tqdm

#############################################################################

try:

    import urllib.request as urllib_request

except ImportError:

    import urllib2 as urllib_request

#############################################################################

if sys.version_info < (3, 0):

    reload(sys)

    sys.setdefaultencoding('utf8')

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

for url in tqdm.tqdm(urls):

    #########################################################################

    f = urllib_request.urlopen(url)

    try:

        rows = csv.reader(io.StringIO(f.read().decode('utf-8')), delimiter = ',')

    finally:

        f.close()

    #########################################################################
 
    for row in rows:

        if len(row) == 3 and row[0] != 'Name':

            D[row[1]] = row[0]

#############################################################################

with open(os.path.dirname(os.path.realpath(__file__)) + '/../../controls/Schema/json/datatype.json', 'wt') as f:

    f.write(json.dumps(D, indent = 4, sort_keys = True))

#############################################################################
