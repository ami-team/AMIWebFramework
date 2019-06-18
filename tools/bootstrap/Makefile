JQUERY_VERSION=3.4.1
POPPER_VERSION=1.14.7
MOMENT_VERSION=2.24.0

SELECT2_VERSION=4.0.7

BOOTSTRAP_VERSION=4.3.1

all: clean
	#########################################################################
	# JQUERY + POPPER + MOMENT                                              #
	#########################################################################

	curl -L https://code.jquery.com/jquery-$(JQUERY_VERSION).min.js > ../../js/jquery.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/popper.js/$(POPPER_VERSION)/umd/popper.min.js > ../../js/popper.min.js

	curl -L https://cdnjs.cloudflare.com/ajax/libs/moment.js/$(MOMENT_VERSION)/moment.min.js > ../../js/moment.min.js

	#########################################################################
	# SELECT2                                                               #
	#########################################################################

	curl -L https://cdnjs.cloudflare.com/ajax/libs/select2/$(SELECT2_VERSION)/css/select2.min.css > ../../css/select2.min.css
	curl -L https://cdnjs.cloudflare.com/ajax/libs/select2/$(SELECT2_VERSION)/js/select2.min.js > ../../js/select2.min.js

	#########################################################################
	# BOOTSTRAP                                                             #
	#########################################################################

	curl -L https://github.com/twbs/bootstrap/archive/v$(BOOTSTRAP_VERSION).zip > bootstrap-$(BOOTSTRAP_VERSION).zip

	unzip bootstrap-$(BOOTSTRAP_VERSION).zip
	rm bootstrap-$(BOOTSTRAP_VERSION).zip

	#########################################################################

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "mixins";/ { print "@import \"../../ami.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "buttons";/ { print "@import \"../../switch.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	#########################################################################

	cd bootstrap-$(BOOTSTRAP_VERSION) && npm install && npm run dist

	#########################################################################

	cp bootstrap-$(BOOTSTRAP_VERSION)/dist/css/bootstrap.min.css ../../css
	cp bootstrap-$(BOOTSTRAP_VERSION)/dist/js/bootstrap.min.js ../../js

	#########################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION)

	#########################################################################

clean:
	#########################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION).zip bootstrap-$(BOOTSTRAP_VERSION)

	#########################################################################
