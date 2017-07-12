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
	let parent = window, parts = $name.split(/\s*\.\s*/g);

	const l = parts.length - 1;

	for(var i = 0; i < l; i++)
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
	let parent = window, parts = $name.split(/\s*\.\s*/g);

	const l = parts.length - 1;

	for(var i = 0; i < l; i++)
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

	let $class = function()
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

	let $super = ($descr.$extends instanceof Function) ? $descr.$extends
	                                                           .prototype : {};

	let $super_implements = ($super.$implements instanceof Array) ? $super.$implements : [];
	let $descr_implements = ($descr.$implements instanceof Array) ? $descr.$implements : [];

	/*-----------------------------------------------------------------*/

	let $class = function()
	{
		/*---------------------------------------------------------*/

		for(let i in this.$implements)
		{
			let $interface = this.$implements[i];

			for(let j in $interface.$members)
			{
				let $member = $interface.$members[j];

				if(typeof(this[j]) !== typeof($member))
				{
					throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
				}
			}
		}

		/*---------------------------------------------------------*/

		this.$super = {};

		for(let name in this.$class._internal_super)
		{
			this.$super[name] = (function(name, that) { return function() {

				return that.$class._internal_super[name].apply(that, arguments)

			}})(name, this);
		}

		/*---------------------------------------------------------*/

		this.$added = {};

		for(let name in this.$class._internal_added)
		{
			this.$added[name] = (function(name, that) { return function() {

				return that.$class._internal_added[name].apply(that, arguments);

			}})(name, this);
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

	for(let name in $super)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		 ) {
			$class._internal_super[name] = $super[name];

			$class.prototype[name] = $super[name];
		}
	}

	for(let name in $descr)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		 ) {
			$class._internal_added[name] = $descr[name];

			$class.prototype[name] = $descr[name];
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
	module.exports.Namespace = $AMINamespace;
	module.exports.Interface = $AMIInterface;
	module.exports.  Class   =   $AMIClass  ;
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
