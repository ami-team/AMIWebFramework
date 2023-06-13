[![][License img]][License]
[![][SrcRepo img]][SrcRepo]
[![][DistRepo img]][DistRepo]
[![][BuildStatus img]][BuildStatus]

<div style="background-color: white; padding: 0.5rem;">
	<a href="https://lpsc.in2p3.fr/" target="_blank">
		<img src="https://ami.web.cern.ch/images/logo_lpsc.png" alt="LPSC" height="72" />
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://www.in2p3.fr/" target="_blank">
		<img src="https://ami.web.cern.ch/images/logo_in2p3.png" alt="IN2P3" height="72" />
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://www.univ-grenoble-alpes.fr/" target="_blank">
		<img src="https://ami.web.cern.ch/images/logo_uga.png" alt="UGA" height="72" />
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://home.cern/" target="_blank">
		<img src="https://ami.web.cern.ch/images/logo_atlas.png" alt="CERN" height="72" />
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://atlas.cern/" target="_blank">
		<img src="https://ami.web.cern.ch/images/logo_cern.png" alt="CERN" height="72" />
	</a>
</div>

AMI Web Framework (AWF)
=======================

This is the official distribution repository of the AMI Web Framework (AWF).

Getting started
===============

```bash
curl https://ami-ecosystem.in2p3.fr/download/awf.py > awf.py

chmod a+x ./awf.py

./awf.py --update-prod
./awf.py --create-home-page
```

Documentation there: https://ami-ecosystem.in2p3.fr/

Developers
==========

* [Jérôme ODIER](https://annuaire.in2p3.fr/4121-4467/jerome-odier) ([CNRS/LPSC](http://lpsc.in2p3.fr/))
* [Fabian LAMBERT](https://annuaire.in2p3.fr/3087-3350/fabian-lambert) ([CNRS/LPSC](http://lpsc.in2p3.fr/))
* [Jérôme FULACHIER](https://annuaire.in2p3.fr/2061-2240/jerome-fulachier) ([CNRS/LPSC](http://lpsc.in2p3.fr/))
* [Maxime JAUME]() ([CNRS/LPSC](http://lpsc.in2p3.fr/))

[License]:http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.txt
[License img]:https://img.shields.io/badge/license-CeCILL--C-blue.svg

[SrcRepo]:https://gitlab.in2p3.fr/ami-team/AMIWebFramework
[SrcRepo img]:https://img.shields.io/badge/src%20repo-gitlab.in2p3.fr-success

[DistRepo]:https://github.com/ami-team/awf-dist
[DistRepo img]:https://img.shields.io/badge/dist%20repo-github.com-success

[BuildStatus]:https://ami-ecosystem.in2p3.fr/cicd/buildStatus/icon/?job=AWF_Distribution
[BuildStatus img]:https://ami-ecosystem.in2p3.fr/cicd/buildStatus/icon/?job=AWF_Distribution
