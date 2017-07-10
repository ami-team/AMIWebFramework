/*!
 * AMI Web Framework - AMIObject.js
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* HELPERS                                                                 */
/*-------------------------------------------------------------------------*/

function _$createNamespace($name, x)
{
	var parent = window, parts = $name.split(/\s*\.\s*/g);

	for(var i = 0; i < parts.length - 1; i++)
	{
		if(parent[parts[i]])
		{
			parent = parent[parts[i]];
		}
		else
		{
			parent = parent[parts[i]] = {};
		}
	}

	parent[parts[i]] = x;
}

/*-------------------------------------------------------------------------*/

function _$addToNamespace($name, x)
{
	var parent = window, parts = $name.split(/\s*\.\s*/g);

	for(var i = 0; i < parts.length - 1; i++)
	{
		if(parent[parts[i]])
		{
			parent = parent[parts[i]];
		}
		else
		{
			throw '`' + $name + '` (`' + parts[i] + '`) not declared';
		}
	}

	parent[parts[i]] = x;
}

/*-------------------------------------------------------------------------*/
/* NAMESPACES                                                              */
/*-------------------------------------------------------------------------*/

function $AMINamespace($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	$descr.$name = $name;

	/*-----------------------------------------------------------------*/

	_$createNamespace($name, $descr);

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($descr);
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACES                                                              */
/*-------------------------------------------------------------------------*/

function $AMIInterface($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		throw 'could nor instantiate interface';
	};

	/*-----------------------------------------------------------------*/

	if($descr.$extends)
	{
		throw '`$extends` not allowed for interface';
	}

	if($descr.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		throw '`$` not allowed for interface';
	}

	if($descr.$init)
	{
		throw '`$init` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = $descr;

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASSES                                                                 */
/*-------------------------------------------------------------------------*/

function $AMIClass($name, $descr)
{
	if(!$descr)
	{
		$descr = {};
	}

	/*-----------------------------------------------------------------*/

	var $super = ($descr.$extends instanceof Function) ? $descr.$extends
	                                                           .prototype : {};

	var $super_implements = ($super.$implements instanceof Array) ? $super.$implements : [];
	var $descr_implements = ($descr.$implements instanceof Array) ? $descr.$implements : [];

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		/*---------------------------------------------------------*/

		for(var key1 in this.$implements)
		{
			var $interface = this.$implements[key1];

			for(var key2 in $interface.$members)
			{
				var $member = $interface.$members[key2];

				if(typeof(this[key2]) !== typeof($member))
				{
					throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + key2 + '`';
				}
			}
		}

		/*---------------------------------------------------------*/

		this.$super = {};

		for(var key3 in this.$class._internal_super)
		{
			this.$super[key3] = (function(name, context) { return function() {

				return context.$class._internal_super[name].apply(context, arguments);

			}})(key3, this);
		}

		/*---------------------------------------------------------*/

		this.$added = {};

		for(var key4 in this.$class._internal_added)
		{
			this.$added[key3] = (function(name, context) { return function() {

				return context.$class._internal_added[name].apply(context, arguments);

			}})(key4, this);
		}

		/*---------------------------------------------------------*/

		if(this.$init)
		{
			this.$init.apply(this, arguments);
		}

		/*---------------------------------------------------------*/
	};

	/*-----------------------------------------------------------------*/

	$class._internal_super = {};
	$class._internal_added = {};

	/*-----------------------------------------------------------------*/

	for(var $member1 in $super)
	{
		if($member1 === '$init'
		   ||
		   $member1.charAt(0) !== '$'
		 ) {
			$class._internal_super[$member1] = $super[$member1];

			$class.prototype[$member1] = $super[$member1];
		}
	}

	for(var $member2 in $descr)
	{
		if($member2 === '$init'
		   ||
		   $member2.charAt(0) !== '$'
		 ) {
			$class._internal_added[$member2] = $super[$member2];

			$class.prototype[$member2] = $descr[$member2];
		}
	}

	/*-----------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$class = $class;
	$class.prototype.$implements = $super_implements.concat($descr_implements);

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/

	if($descr.$)
	{
		$descr.$.apply($class);
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* NodeJS EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	exports.Namespace = $AMINamespace;
	exports.Interface = $AMIInterface;
	exports.  Class   =   $AMIClass  ;
}

/*-------------------------------------------------------------------------*/
/* JQUERY EXTENSION                                                        */
/*-------------------------------------------------------------------------*/

if(jQuery)
{
	jQuery.Namespace = $AMINamespace;
	jQuery.Interface = $AMIInterface;
	jQuery.  Class   =   $AMIClass  ;
}

/*-------------------------------------------------------------------------*/
