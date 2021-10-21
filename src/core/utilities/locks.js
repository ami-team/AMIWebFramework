/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-{{CURRENT_YEAR}} The AMI Team, CNRS/LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/
/* STACK                                                                                                              */
/*--------------------------------------------------------------------------------------------------------------------*/

export function getStack()
{
	try
	{
		throw Error();
	}
	catch(e1)
	{
		try
		{
			return e1.stack;
		}
		catch(e2)
		{
			return ((('')));
		}
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* LOCK                                                                                                               */
/*--------------------------------------------------------------------------------------------------------------------*/

let _curLockCnt = 0x00;
let _tmpLockCnt = 0x00;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Locks the Web application
 */

export function lock()
{
	let lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log('lock[' + _curLockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
	}

	/**/

	if(_curLockCnt <= 0)
	{
		$('#ami_locker').css('display', 'flex');

		_curLockCnt = 1;
	}
	else
	{
		_curLockCnt++;
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Unlocks the Web application
 */

export function unlock()
{
	if(_curLockCnt <= 1)
	{
		$('#ami_locker').css('display', 'none');

		_curLockCnt = 0;
	}
	else
	{
		_curLockCnt--;
	}

	/**/

	let lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log('unlock[' + _curLockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Leave the modal window
 */

export function modalLeave()
{
	let lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log('modalLock[' + _curLockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
	}

	/**/

	_curLockCnt = _tmpLockCnt;

	if(_curLockCnt > 0)
	{
		$('#ami_locker').css('display', 'flex');
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Enter the modal window
 */

export function modalEnter()
{
	_tmpLockCnt = _curLockCnt;

	if(_curLockCnt > 0)
	{
		$('#ami_locker').css('display', 'none');
	}

	/**/

	let lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log('modalUnlock[' + _curLockCnt + '] :: ' + lines[2]); // eslint-disable-line no-console
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

export let _canLeave = true;

/*--------------------------------------------------------------------------------------------------------------------*/


/**
 * Enables the message in a confirmation dialog box to inform that the user is about to leave the current page.
 */

export function canLeave()
{
	_canLeave = true;
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Disables the message in a confirmation dialog box to inform that the user is about to leave the current page.
 */

export function cannotLeave()
{
	_canLeave = false;
}

/*--------------------------------------------------------------------------------------------------------------------*/
