#!/usr/bin/env python3
# -*- coding:utf-8 -*-
########################################################################################################################
# Author : Jerome ODIER
# Email : jerome.odier@lpsc.in2p3.fr
#
# AMI Web Framework
#
# Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
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

    parser.add_argument('-v', '--bootstrap-version', help = 'bootstrap version (default: 5)', type = int, choices = [4, 5], default = 5)
    parser.add_argument('-f', '--source-code-flavour', help = 'source code flavour (default module)', type = str, choices = ['legacy', 'module', 'vue-js'], default = 'module')

    parser.add_argument('-b', '--build', help = 'build JS bundles', action = 'store_true')
    parser.add_argument('-r', '--run', help = 'run a web server', action = 'store_true')

    parser.add_argument('--verbose', help = 'make this tool verbose', action = 'store_true')

    args = parser.parse_args()

    ####################################################################################################################

    if   args.create_home_page:
        return awf_tool.createHomePage(args.verbose, args.bootstrap_version)

    elif args.create_control:
        return awf_tool.createControl(args.verbose, args.source_code_flavour, 'webpack-nocore.config.js')

    elif args.create_subapp:
        return awf_tool.createSubapp(args.verbose, args.source_code_flavour, 'webpack-nocore.config.js')

    elif args.build:
        return awf_tool.build(args.verbose, 'webpack-nocore.config.js')

    elif args.run:
        return awf_tool.run(args.verbose)

    ####################################################################################################################

    return awf_tool.createId()

########################################################################################################################
# MAIN                                                                                                                 #
########################################################################################################################

if __name__ == '__main__':

    sys.exit(main())

########################################################################################################################
