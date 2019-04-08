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

AWF_IMAGE_URL = 'https://raw.githubusercontent.com/ami-team/AMIWebFramework/master/tools/awf.img'

#############################################################################

import ssl, sys, zlib, base64

#############################################################################

try:

    import urllib.request as urllib_request

except ImportError:

    import urllib2 as urllib_request

#############################################################################
# MAIN                                                                      #
#############################################################################

if __name__ == '__main__':

	#########################################################################

	try:

	    request = urllib_request.urlopen(AWF_IMAGE_URL, context = hasattr(ssl, '_create_unverified_context') and ssl._create_unverified_context() or None)

	except Exception as e:

		print(e)

		sys.exit(1)

	#########################################################################

    try:

        exec(zlib.decompress(base64.b64decode(request.read())))

    finally:

        request.close()

#############################################################################
