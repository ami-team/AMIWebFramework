########################################################################################################################
# AMI CORE                                                                                                             #
########################################################################################################################

JQUERY_VERSION=3.5.1
POPPER_VERSION=1.16.0
MOMENT_VERSION=2.24.0
QRCODE_VERSION=0.17.0

SELECT2_VERSION=4.0.12

BOOTSTRAP_VERSION=4.5.0

########################################################################################################################
# 3RD PARTY                                                                                                            #
########################################################################################################################

ACE_VERSION=1.4.12

########################################################################################################################

BACKBONE_VERSION=1.4.0
LOADASH_VERSION=4.17.15

JOINTJS_VERSION=3.1.1

########################################################################################################################

D3_VERSION=5.15.0
D3_GEO_VERSION=1.9.1

########################################################################################################################

JSCOLOR_VERSION=2.0.4

CLIPBOARD_VERSION=2.0.4
FILESAVER_VERSION=1.3.8

CHARTJS_VERSION=2.9.3

DIFF_MATCH_PATCH_VERSION=20121119

########################################################################################################################

all: clean core 3rd-party

########################################################################################################################

core:
	####################################################################################################################
	# JQUERY + POPPER + MOMENT + QRIOUS                                                                                #
	####################################################################################################################

	curl -L https://code.jquery.com/jquery-$(JQUERY_VERSION).min.js > ../../js/jquery.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/popper.js/$(POPPER_VERSION)/umd/popper.min.js > ../../js/popper.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/moment.js/$(MOMENT_VERSION)/moment.min.js > ../../js/moment.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/lrsjng.jquery-qrcode/$(QRCODE_VERSION)/jquery-qrcode.min.js > ../../js/jquery-qrcode.min.js

	####################################################################################################################
	# SELECT2                                                                                                          #
	####################################################################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/select2/$(SELECT2_VERSION)/css/select2.min.css > ../../css/select2.min.css
	curl -L https://cdnjs.cloudflare.com/ajax/libs/select2/$(SELECT2_VERSION)/js/select2.min.js > ../../js/select2.min.js

	####################################################################################################################
	# BOOTSTRAP                                                                                                        #
	####################################################################################################################

	curl -L https://github.com/twbs/bootstrap/archive/v$(BOOTSTRAP_VERSION).zip > bootstrap-$(BOOTSTRAP_VERSION).zip

	unzip bootstrap-$(BOOTSTRAP_VERSION).zip
	rm bootstrap-$(BOOTSTRAP_VERSION).zip

	####################################################################################################################

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "mixins";/ { print "@import \"../../ami.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "buttons";/ { print "@import \"../../switch.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	####################################################################################################################

	cd bootstrap-$(BOOTSTRAP_VERSION) && npm install && npm run dist

	####################################################################################################################

	sed '/sourceMappingURL/d' bootstrap-$(BOOTSTRAP_VERSION)/dist/css/bootstrap.min.css > ../../css/bootstrap.min.css
	sed '/sourceMappingURL/d' bootstrap-$(BOOTSTRAP_VERSION)/dist/js/bootstrap.min.js > ../../js/bootstrap.min.js

	####################################################################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION)

	####################################################################################################################

3rd-party:
	####################################################################################################################
	# ACE                                                                                                              #
	####################################################################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/ace.min.js > ../../js/3rd-party/ace/ace.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/ext-language_tools.min.js > ../../js/3rd-party/ace/ext-language_tools.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/ext-static_highlight.min.js > ../../js/3rd-party/ace/ext-static_highlight.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-sh.min.js > ../../js/3rd-party/ace/mode-sh.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-sql.min.js > ../../js/3rd-party/ace/mode-sql.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-xml.min.js > ../../js/3rd-party/ace/mode-xml.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-json.min.js > ../../js/3rd-party/ace/mode-json.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-text.min.js > ../../js/3rd-party/ace/mode-text.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-groovy.min.js > ../../js/3rd-party/ace/mode-groovy.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/mode-javascript.min.js > ../../js/3rd-party/ace/mode-javascript.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/theme-chrome.min.js > ../../js/3rd-party/ace/theme-chrome.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/worker-base.min.js > ../../js/3rd-party/ace/worker-base.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/worker-xml.min.js > ../../js/3rd-party/ace/worker-xml.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/worker-json.min.js > ../../js/3rd-party/ace/worker-json.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/ace/$(ACE_VERSION)/worker-javascript.min.js > ../../js/3rd-party/ace/worker-javascript.min.js

	####################################################################################################################
	# BACKBONE + LODASH + JOINTJS                                                                                      #
	####################################################################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/backbone.js/$(BACKBONE_VERSION)/backbone-min.js > ../../js/3rd-party/backbone-min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/lodash.js/$(LOADASH_VERSION)/lodash.min.js > ../../js/3rd-party/lodash.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/jointjs/$(JOINTJS_VERSION)/joint.min.css > ../../css/3rd-party/joint.min.css
	curl -L https://cdnjs.cloudflare.com/ajax/libs/jointjs/$(JOINTJS_VERSION)/joint.min.js > ../../js/3rd-party/joint.min.js

	####################################################################################################################
	# D3 + D3-GEO                                                                                                      #
	####################################################################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/d3/$(D3_VERSION)/d3.min.js > ../../js/3rd-party/d3.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/d3-geo/$(D3_GEO_VERSION)/d3-geo.min.js > ../../js/3rd-party/d3-geo.min.js

	####################################################################################################################
	# MISCELLANEOUS                                                                                                    #
	####################################################################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/jscolor/$(JSCOLOR_VERSION)/jscolor.min.js > ../../js/3rd-party/jscolor.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/$(CLIPBOARD_VERSION)/clipboard.min.js > ../../js/3rd-party/clipboard.min.js
	curl -L https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/$(FILESAVER_VERSION)/FileSaver.min.js > ../../js/3rd-party/filesaver.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/Chart.js/$(CHARTJS_VERSION)/Chart.bundle.min.js > ../../js/3rd-party/chart.bundle.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/$(DIFF_MATCH_PATCH_VERSION)/diff_match_patch.js > ../../js/3rd-party/diff_match_patch.min.js

	####################################################################################################################

clean:
	####################################################################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION).zip bootstrap-$(BOOTSTRAP_VERSION)

	####################################################################################################################
