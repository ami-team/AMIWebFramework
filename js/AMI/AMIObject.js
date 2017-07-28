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
	let parent = window;

	const parts = $name.split(/\s*\.\s*/g), l = parts.length - 1;

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
	let parent = window;

	const parts = $name.split(/\s*\.\s*/g), l = parts.length - 1;

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

	const $class = function()
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

	const $super = ($descr.$extends instanceof Function) ? $descr.$extends
	                                                             .prototype : {};

	const $super_implements = ($super.$implements instanceof Array) ? $super.$implements : [];
	const $descr_implements = ($descr.$implements instanceof Array) ? $descr.$implements : [];

	/*-----------------------------------------------------------------*/

	const $class = function()
	{
		/*---------------------------------------------------------*/

		for(const i in this.$implements)
		{
			const $interface = this.$implements[i];

			for(const j in $interface.$members)
			{
				const $member = $interface.$members[j];

				if(typeof(this[j]) !== typeof($member))
				{
					throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
				}
			}
		}

		/*---------------------------------------------------------*/

		this.$super = {};

		for(const name in this.$class._internal_super)
		{
			this.$super[name] = ((name, that) => function() {

				return that.$class._internal_super[name].apply(that, arguments)

			})(name, this);
		}

		/*---------------------------------------------------------*/

		this.$added = {};

		for(const name in this.$class._internal_added)
		{
			this.$added[name] = ((name, that) => function() {

				return that.$class._internal_added[name].apply(that, arguments);

			})(name, this);
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

	for(const name in $super)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		   ||
		   $super.hasOwnProperty(name)
		 ) {
			$class._internal_super[name] = $super[name];

			$class.prototype[name] = $super[name];
		}
	}

	for(const name in $descr)
	{
		if(name === '$init'
		   ||
		   name.charAt(0) !== '$'
		   ||
		   $descr.hasOwnProperty(name)
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
