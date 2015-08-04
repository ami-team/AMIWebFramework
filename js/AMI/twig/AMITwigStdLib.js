/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

$AMINamespace('ami.twig.stdlib', {
	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	isIterable: function(x)
	{
		return (x instanceof Array)
		       ||
		       (x instanceof Object)
		       ||
		       (x instanceof String)
		       ||
		       (typeof(x) === 'string')
		;
	},

	/*-----------------------------------------------------------------*/

	isInObject: function(x, y)
	{
		return (y instanceof Array)
		       ||
		       (y instanceof String)
		       ||
		       (typeof(y) === 'string') ? y.indexOf(x) >= 0 : x in y
		;
	},

	/*-----------------------------------------------------------------*/

	isInNumRange: function(x, x1, x2)
	{
		return (x >= x1)
		       &&
		       (x <= x2)
		;
	},

	/*-----------------------------------------------------------------*/

	isInCharRange: function(x, x1, x2)
	{
		return (x.charCodeAt(0) >= x1.charCodeAt(0))
		       &&
		       (x.charCodeAt(0) <= x2.charCodeAt(0))
		;
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	startsWith: function(s1, s2)
	{
		var base = 0x0000000000000000000;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	endsWith: function(s1, s2)
	{
		var base = s1.length - s2.length;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	match: function(s, regex)
	{
		return s.match(regex) !== null;
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	min: function()
	{
		return Math.min(arguments);
	},

	/*-----------------------------------------------------------------*/

	max: function()
	{
		return Math.max(arguments);
	},

	/*-----------------------------------------------------------------*/
});

/*-------------------------------------------------------------------------*/
