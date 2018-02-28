BOOTSTRAP_VERSION=4.0.0

all: clean
	#############################################################################

	curl -L https://github.com/twbs/bootstrap/archive/v$(BOOTSTRAP_VERSION).zip > bootstrap-$(BOOTSTRAP_VERSION).zip

	unzip bootstrap-$(BOOTSTRAP_VERSION).zip
	rm bootstrap-$(BOOTSTRAP_VERSION).zip

	#############################################################################

	mv bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss

	awk '/@import "mixins";/ { print "@import \"../../ami.scss\";"; print; next }1' bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.orig.scss > bootstrap-$(BOOTSTRAP_VERSION)/scss/bootstrap.scss

	#############################################################################

	cd bootstrap-$(BOOTSTRAP_VERSION) && npm install && npm run dist

	#############################################################################

	cp bootstrap-4.0.0/dist/css/bootstrap.min.css ../../css
	cp bootstrap-4.0.0/dist/js/bootstrap.min.js ../../js

	#############################################################################

clean:
	#############################################################################

	rm -fr bootstrap-$(BOOTSTRAP_VERSION).zip bootstrap-$(BOOTSTRAP_VERSION)

	#############################################################################