#!/usr/bin/env python3
# -*- coding:utf-8 -*-
########################################################################################################################
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
########################################################################################################################

import sys, argparse

from tools import awf_tool

########################################################################################################################

def main():

    ####################################################################################################################

    awf_tool.print_logo()

    ####################################################################################################################

    parser = argparse.ArgumentParser(formatter_class = argparse.RawTextHelpFormatter, epilog = 'Authors:\n  Jerome ODIER (jerome.odier@lpsc.in2p3.fr)\n  Fabian LAMBERT (fabian.lambert@lpsc.in2p3.fr)\n  Jerome FULACHIER (jerome.fulachier@lpsc.in2p3.fr')

    parser.add_argument('--create-home-page', help = 'create a new home page', action = 'store_true')
    parser.add_argument('--create-control', help = 'create a new control', action = 'store_true')
    parser.add_argument('--create-subapp', help = 'create a new subapp', action = 'store_true')
    parser.add_argument('--create-id', help = 'create a new id', action = 'store_true')
    parser.add_argument('--lint', help = 'lint both controls and subapps', action = 'store_true')

    parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

    args = parser.parse_args()

    ####################################################################################################################

    if   args.create_home_page:
        return awf_tool.createHomePage(args.verbose)

    elif args.create_control:
        return awf_tool.createControl(args.verbose)

    elif args.create_subapp:
        return awf_tool.createSubapp(args.verbose)

    elif args.lint:
        return awf_tool.lint(args.verbose)

    ####################################################################################################################

    return awf_tool.createId()

########################################################################################################################
# MAIN                                                                                                                 #
########################################################################################################################

if __name__ == '__main__':

    sys.exit(main())

########################################################################################################################
