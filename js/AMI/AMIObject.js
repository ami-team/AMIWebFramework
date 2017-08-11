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

/**
  * Create a new namespace
  * @param {String} $name the namespace name
  * @param {Object} [$descr] the namespace body
  */

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

/**
  * Create a new interface
  * @param {String} $name the interface name
  * @param {Object} [$descr] the interface body
  */

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

/**
  * Create a new class
  * @param {String} $name the class name
  * @param {Object} [$descr] the class body
  */

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
			if(this.$implements.hasOwnProperty(i))
			{
				const $interface = this.$implements[i];

				for(const j in $interface.$members)
				{
					if($interface.$members.hasOwnProperty(j))
					{
						const $member = $interface.$members[j];

						if(typeof(this[j]) !== typeof($member))
						{
							throw 'class `' + this.$name + '` with must implement `' + $interface.$name + '.' + j + '`';
						}
					}
				}
			}
		}

		/*---------------------------------------------------------*/

		const _super = this.$class._internal_super;
		const _added = this.$class._internal_added;

		/*---------------------------------------------------------*/

		this.$super = {};

		for(const name in _super)
		{
			if(_super.hasOwnProperty(name))
			{
				this.$super[name] = ((_super, name, that) => function() {

					return _super[name].apply(that, arguments)

				})(_super, name, this);
			}
		}

		/*---------------------------------------------------------*/

		this.$added = {};

		for(const name in _added)
		{
			if(_added.hasOwnProperty(name))
			{
				this.$added[name] = ((_added, name, that) => function() {

					return _added[name].apply(that, arguments);

				})(_added, name, this);
			}
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
