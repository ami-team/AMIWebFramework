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

import sys, zlib, base64

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

    try:

        #####################################################################

        with open('awf_tool.py', 'r') as f:

            data = f.read()

        #####################################################################

        try:

            image = base64.b64encode(zlib.compress(data.encode('utf-8'))).decode('utf-8')

        except:

            image = base64.b64encode(zlib.compress(data))

        #####################################################################

        with open('awf.b64', 'w') as f:

            f.write(image)

        #####################################################################

        return 0

    except Exception as e:
        raise e
        print('error: %s' % e)

        return 1

#############################################################################
# MAIN                                                                      #
#############################################################################

if __name__ == '__main__':

    sys.exit(main())

#############################################################################
