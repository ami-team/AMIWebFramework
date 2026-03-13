// noinspection JSUnusedGlobalSymbols, JSUnresolvedReference
/*--------------------------------------------------------------------------------------------------------------------*/

const fs = require('fs');
const path = require('path');

/*--------------------------------------------------------------------------------------------------------------------*/

class AMIWebpackPlugin
{
	/*----------------------------------------------------------------------------------------------------------------*/

	constructor(subappName = null)
	{
		// Name automaticcaly detect if not given
		this.subappName = subappName;
		this.autoDetect = !subappName;
		this.vueSubapps = [];
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Detect automatically vue.js subapps
	 * Subapp Vue.js : index.js AND at least one file .vue
	 */
	detectVueSubapps(compiler)
	{
		const subappsDir = path.resolve(compiler.context, 'subapps');

		if (!fs.existsSync(subappsDir)) {
			return [];
		}

		const vueSubapps = [];
		const entries = fs.readdirSync(subappsDir, { withFileTypes: true });

		for (const entry of entries) {
			if (!entry.isDirectory()) continue;

			const subappPath = path.join(subappsDir, entry.name);
			const indexPath = path.join(subappPath, 'index.js');

			if (!fs.existsSync(indexPath)) continue;

			const hasVueFiles = this.hasVueFilesRecursive(subappPath);

			if (hasVueFiles) {
				vueSubapps.push(entry.name);
				console.log(`[AMIWebpackPlugin] Detected Vue.js subapp: ${entry.name}`);
			}
		}

		return vueSubapps;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Check if a file got .vue
	 */
	hasVueFilesRecursive(dir)
	{
		try {
			const entries = fs.readdirSync(dir, { withFileTypes: true });

			for (const entry of entries) {
				const fullPath = path.join(dir, entry.name);

				if (entry.isDirectory()) {
					if (this.hasVueFilesRecursive(fullPath)) {
						return true;
					}
				} else if (entry.name.endsWith('.vue')) {
					return true;
				}
			}
		} catch (e) {
			if (e.code !== 'EACCES' && e.code !== 'ENOENT') {
				throw e;
			}
		}

		return false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	apply(compiler)
	{
		/*------------------------------------------------------------------------------------------------------------*/
		/* Automatique detect                                                                                      */
		/*------------------------------------------------------------------------------------------------------------*/

		if (this.autoDetect) {
			this.vueSubapps = this.detectVueSubapps(compiler);

			if (this.vueSubapps.length === 0) {
				console.log('[AMIWebpackPlugin] No Vue.js subapps detected, skipping configuration');
				return;
			}

			console.log(`[AMIWebpackPlugin] Configuring Vue.js externals for: ${this.vueSubapps.join(', ')}`);
		} else {
			// Manual mode if name given
			const subappName = this.subappName.trim();

			if (subappName.toLowerCase().startsWith('subapp')) {
				throw new Error('Subapp name must not start with "subapp"');
			}

			this.vueSubapps = [subappName];
			console.log(`[AMIWebpackPlugin] Configuring Vue.js externals for: ${subappName}`);
		}

		/*------------------------------------------------------------------------------------------------------------*/
		/* EXTERNALS                                                                                                  */
		/*------------------------------------------------------------------------------------------------------------*/

		if (typeof compiler.options.externals === 'undefined') {
			compiler.options.externals = {};
		}

		// Vue -> window.ami.vue.Vue
		compiler.options.externals['vue'] = ['ami', 'vue3', 'Vue'];
		compiler.options.externals['vue/dist/vue.esm-bundler'] = ['ami', 'vue3', 'Vue'];

		// Bootstrap
		compiler.options.externals['bootstrap'] = '__AMI_BOOTSTRAP5__';
		compiler.options.externals['bootstrap/dist/js/bootstrap.esm'] = '__AMI_BOOTSTRAP5__';

		// Others if usefull
		compiler.options.externals['ami'] = 'ami';

		/*------------------------------------------------------------------------------------------------------------*/
		/* ALIASES                                                                                                    */
		/*------------------------------------------------------------------------------------------------------------*/

		if (typeof compiler.options.resolve.alias === 'undefined') {
			compiler.options.resolve.alias = {};
		}

		compiler.options.resolve.alias['vue'] = false;
		compiler.options.resolve.alias['vue/dist/vue.esm-bundler'] = false;

		compiler.options.resolve.alias['bootstrap'] = false;
		compiler.options.resolve.alias['bootstrap/dist/js/bootstrap.esm'] = false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = AMIWebpackPlugin;

/*--------------------------------------------------------------------------------------------------------------------*/
