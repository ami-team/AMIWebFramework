/*!
 * AMI Web Framework - AMIControl
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami.IControl                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI control interface
 * @interface ami/IControl
 */

$AMIInterface('ami.IControl', /** @lends ami/IControl# */ {
	/*-----------------------------------------------------------------*/

	/**
	  * Render the control
	  * @param {String} id the target id
	  */

	render: function() {},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
