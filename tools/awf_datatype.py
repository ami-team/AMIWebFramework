#!/usr/bin/env python3
# -*- coding:utf-8 -*-
#############################################################################
# Author : Jerome ODIER
# Email : jerome.odier@lpsc.in2p3.fr
#
# AMI Web Framework
#
# Copyright (c) 2014-XXXX The AMI Team / LPSC / CNRS
#
# This file must be used under the terms of the CeCILL-C:
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
# http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
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

    sys.setdefaultencoding('utf-8')

#############################################################################

def main():

    #########################################################################

    print('''
 █████╗ ███╗   ███╗██╗    ██╗    ██╗███████╗██████╗                           
██╔══██╗████╗ ████║██║    ██║    ██║██╔════╝██╔══██╗                          
███████║██╔████╔██║██║    ██║ █╗ ██║█████╗  ██████╔╝                          
██╔══██║██║╚██╔╝██║██║    ██║███╗██║██╔══╝  ██╔══██╗                          
██║  ██║██║ ╚═╝ ██║██║    ╚███╔███╔╝███████╗██████╔╝                          
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚══╝╚══╝ ╚══════╝╚═════╝                           
███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
█████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝'''[1: ])

    #########################################################################

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

    #########################################################################

    try:

        #####################################################################

        D = {}

        for url in tqdm.tqdm(urls):

            #################################################################

            f = urllib_request.urlopen(url)

            try:

                rows = csv.reader(io.StringIO(f.read().decode('utf-8')), delimiter = ',')

            finally:

                f.close()

            #################################################################
 
            for row in rows:

                if len(row) == 3 and row[0] != 'Name':

                    D[row[1]] = row[0]

        #####################################################################

        with open(os.path.dirname(os.path.realpath(__file__)) + '/../controls/Schema/json/datatype.json', 'wt') as f:

            f.write(json.dumps(D, indent = 4, sort_keys = True))

        #####################################################################

        return 0

    except Exception as e:

        print('error: %s' % e)

        return 1

#############################################################################
# MAIN                                                                      #
#############################################################################

if __name__ == '__main__':

    sys.exit(main())

#############################################################################
