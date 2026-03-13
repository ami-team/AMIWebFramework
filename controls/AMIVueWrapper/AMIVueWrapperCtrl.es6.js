/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2025 The AMI Team / LPSC / CNRS
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/

import {createApp, nextTick} from 'vue';

import './assets/css/AMIVueWrapperCtrl.css';

import AmiVueWrapperComponent from './AMIVueWrapper.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

export default class AMIVueWrapperCtrl extends ami.Control
{
	/*----------------------------------------------------------------------------------------------------------------*/

	$init(parent, owner)
	{
		super.$init(parent, owner);

		this.vueApp = null;
		this.vueComponentRef = null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	onReady()
	{
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Render the Vue control wrapper with an AMI classic control inside
	 *
	 * @param {string} selector - DOM selector where to mount the Vue app
	 * @param {string} controlName - Name of the AMI control to load (e.g., 'adder', 'table')
	 * @param {Object} controlParams - Parameters to pass to the control's render method
	 * @param {Object} options - Additional options
	 * @returns {Promise} jQuery Deferred promise
	 */
	render(selector, controlName, controlParams = {}, options = {})
	{
		const result = $.Deferred();

		/*------------------------------------------------------------------------------------------------------------*/

		// Validate parameters
		if (!controlName || typeof controlName !== 'string') {
			result.rejectWith(this, ['Control name is required and must be a string']);
			return result.promise();
		}

		/*------------------------------------------------------------------------------------------------------------*/

		this.setupCtx(
			{
				controlName: controlName,
				controlParams: controlParams || {},
				controlOptions: options.controlOptions || {},
				autoReload: options.autoReload || false
			},
			{
				context: result,
			},
			options
		);

		/*------------------------------------------------------------------------------------------------------------*/

		this.vueApp = createApp(AmiVueWrapperComponent, {
			controlName: this.ctx.controlName,
			controlParams: this.ctx.controlParams,
			controlOptions: this.ctx.controlOptions,
			autoReload: this.ctx.autoReload,

			onMounted: (data) => {
				console.log(`AMI Control "${data.controlName}" loaded successfully`);
			},

			onRendered: (data) => {
				console.log(`AMI Control "${data.controlName}" rendered successfully`);

				// Resolve the promise after rendering
				nextTick(() => {
					result.resolveWith(this, [data.instance, data.result]);
				});
			},

			onError: (error) => {
				console.error('AMI Control error:', error);
				result.rejectWith(this, [error]);
			},

			onDestroyed: (data) => {
				console.log(`AMI Control "${data.controlName}" destroyed`);
			}
		});

		const mountedApp = this.vueApp.mount(selector);

		this.vueComponentRef = mountedApp;

		/*------------------------------------------------------------------------------------------------------------*/

		return result.promise();
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get the current AMI control instance
	 * @returns {Object|null} The control instance
	 */
	getControlInstance()
	{
		return this.vueComponentRef ? this.vueComponentRef.getControlInstance() : null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Reload the control
	 * @returns {Promise}
	 */
	async reload()
	{
		if (this.vueComponentRef && typeof this.vueComponentRef.reload === 'function') {
			await this.vueComponentRef.reload();
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Check if control is loading
	 * @returns {boolean}
	 */
	isLoading()
	{
		return this.vueComponentRef ? this.vueComponentRef.isLoading() : false;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Get any error that occurred
	 * @returns {string|null}
	 */
	getError()
	{
		return this.vueComponentRef ? this.vueComponentRef.getError() : null;
	}

	/*----------------------------------------------------------------------------------------------------------------*/

	/**
	 * Destroy the control and unmount the Vue app
	 */
	destroy()
	{
		if (this.vueApp) {
			this.vueApp.unmount();
			this.vueApp = null;
			this.vueComponentRef = null;
		}
	}

	/*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/
