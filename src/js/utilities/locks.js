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

function _throwError()
{
	throw Error();
}

/*--------------------------------------------------------------------------------------------------------------------*/

export function getStack()
{
	try
	{
		_throwError();
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

/**
 * @type {number}
 * @private
 */

let _curLockCnt = 0;

/**
 * @type {number}
 * @private
 */

let _tmpLockCnt = 0;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Locks the Web application
 * @ignore
 */

export function lock()
{
	let lines = getStack().split('\n');

	if(lines.length > 3)
	{
		console.log(`lock[${_curLockCnt}] :: ${lines[3]}`); // eslint-disable-line no-console
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
 * @ignore
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

	if(lines.length > 3)
	{
		console.log(`unlock[${_curLockCnt}] :: ${lines[3]}`); // eslint-disable-line no-console
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Leave the modal window
 * @ignore
 */

export function modalLeave()
{
	const lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log(`modalLock[${_curLockCnt}] :: ${lines[2]}`); // eslint-disable-line no-console
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
 * @ignore
 */

export function modalEnter()
{
	_tmpLockCnt = _curLockCnt;

	if(_curLockCnt > 0)
	{
		$('#ami_locker').css('display', 'none');
	}

	/**/

	const lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log(`modalUnlock[${_curLockCnt}] :: ${lines[2]}`); // eslint-disable-line no-console
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* WINDOW                                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * @type {boolean}
 * @private
 */

export let _canLeave = true;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Specifies whether leaving the current page must be confirmed or not
 * @param canLeave
 * @ignore
 */

export function canLeave(canLeave)
{
	_canLeave = canLeave;
}

/*--------------------------------------------------------------------------------------------------------------------*/
