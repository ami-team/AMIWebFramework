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

let _curLockCnt = 0;
let _tmpLockCnt = 0;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Locks the Web application
 */

export function lock()
{
	let lines = getStack().split('\n');

	if(lines.length > 2)
	{
		console.log(`lock[${_curLockCnt}] :: ${lines[2]}`); // eslint-disable-line no-console
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
		console.log(`unlock[${_curLockCnt}] :: ${lines[2]}`); // eslint-disable-line no-console
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
		console.log(`modalUnlock[${_curLockCnt}] :: ${lines[2]}`); // eslint-disable-line no-console
	}
}

/*--------------------------------------------------------------------------------------------------------------------*/
/* WINDOW                                                                                                             */
/*--------------------------------------------------------------------------------------------------------------------*/

export let _canLeave = true;

/*--------------------------------------------------------------------------------------------------------------------*/

/**
 * Specify weather leaving the current page must be confirmed.
 * @param canLeave
 */

export function canLeave(canLeave)
{
	_canLeave = canLeave;
}

/*--------------------------------------------------------------------------------------------------------------------*/
