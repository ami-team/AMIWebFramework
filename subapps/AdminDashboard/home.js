/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 * @global Vue
 *
 */

import twigHome from './assets/twig/home/home.twig';

/*--------------------------------------------------------------------------------------------------------------------*/

export function init()
{
	const result = $.Deferred();

	amiWebApp.replaceHTML('#BCCE2136_3695_AB6F_4F08_3BD3C9035287', twigHome).done(() => {

		$('#FCA2B6DC_3239_838D_A109_91F164524987').text(jQuery.fn.tooltip.Constructor.VERSION);
		$('#F8D580E4_05F1_0317_9F3F_E4BA7AB99D3E').text(jQuery.fn./*-------*/jquery/*-------*/);

		$('#ACA527B0_4581_8292_DB2A_22C900E621A0').text(amiTwig.version);
		$('#D9C3541F_3534_1312_4C08_F22962C05347').text(ami.vue.version);

		$('#E15C9F8C-A955-2643-196B-BBF3317D1616').text(ami.awf.buildVersion);
		$('#A47094A8-3D38-666B-E542-2C88AC486E1D').text(ami.awf.commitIdAbbrev);

		result.resolve();
	});

	return result;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogin()
{
	update();
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function onLogout()
{
	update();
}

/*--------------------------------------------------------------------------------------------------------------------*/

function update()
{
	const awfInfo = amiAuth.getAWFInfo();

	$('#BD4F9D14_B1CD_F377_29B6_130C3EA8C7C2').attr(
		'href', awfInfo.nodeRedURL || 'https://www.nodered.org/'
	);

	$('#F1FA8298_F283_E0C4_A9F6_74C8EB2E4762').text(awfInfo.buildVersion || 'N/A');
	$('#A8F46B0F_4657_09B7_BB0D_6B4434FD79A3').text(awfInfo.commitIdAbbrev || 'N/A');
}

/*--------------------------------------------------------------------------------------------------------------------*/
