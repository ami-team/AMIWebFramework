BOOTSTRAP_VERSION=4.2.1

all: clean
	#############################################################################

	curl -L https://github.com/twbs/bootstrap/archive/v$(BOOTSTRAP_VERSION).zip > bootstrap-$(BOOTSTRAP_VERSION).zip

	unzip bootstrap-$(BOOTSTRAP_VERSION).zip
	rm bootstrap-$(BOOTSTRAP_VERSION).zip

	#############################################################################

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "mixins";/ { print "@import \"../../ami.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss
	awk '/@import "buttons";/ { print "@import \"../../switch.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	#############################################################################

	cd bootstrap-$(BOOTSTRAP_VERSION) && npm install && npm run dist

	#############################################################################

	cp bootstrap-$(BOOTSTRAP_VERSION)/dist/css/bootstrap.min.css ../../css
	cp bootstrap-$(BOOTSTRAP_VERSION)/dist/js/bootstrap.min.js ../../js

	#############################################################################

clean:
	#############################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION).zip bootstrap-$(BOOTSTRAP_VERSION)

	#############################################################################
