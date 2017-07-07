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

function $AMINamespace($name, $this)
{
	if(!$this)
	{
		$this = {};
	}

	/*-----------------------------------------------------------------*/

	$this.$name = $name;

	/*-----------------------------------------------------------------*/

	_$createNamespace($name, $this);

	/*-----------------------------------------------------------------*/

	if($this.$init)
	{
		$this.$init();
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACES                                                              */
/*-------------------------------------------------------------------------*/

function $AMIInterface($name, $this)
{
	if(!$this)
	{
		$this = {};
	}

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		throw 'could nor instantiate interface';
	};

	/*-----------------------------------------------------------------*/

	if($this.$extends)
	{
		throw '`$extends` not allowed for interface';
	}

	if($this.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	if($this.$)
	{
		throw '`$` not allowed for interface';
	}

	if($this.$init)
	{
		throw '`$init` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = $this;

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASSES                                                                 */
/*-------------------------------------------------------------------------*/

function $AMIClass($name, $this)
{
	if(!$this)
	{
		$this = {};
	}

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		/*---------------------------------------------------------*/

		for(var key1 in this.$interfaces)
		{
			var $interface = this.$interfaces[key1];

			for(var key2 in $interface.$members)
			{
				var $member = $interface.$members[key2];

				if(typeof(this[key2]) !== typeof($member))
				{
					alert('class `' + this.$name + '` with must implement `' + $interface.$name + '.' + key2 + '`');
				}
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

	var $super;

	if($this.$extends) {
		$super = $this.$extends.prototype;
	}
	else {
		$super = {};
	}

	/*-----------------------------------------------------------------*/

	var $interfaces;

	if($this.$implements) {
		$interfaces = $this.$implements;
	}
	else {
		$interfaces = [];
	}

	/*-----------------------------------------------------------------*/

	for(var $member1 in $super)
	{
		if($member1 !== '$')
		{
			$class.prototype['$super_' + $member1] = $super[$member1];

			$class.prototype[$member1] = $super[$member1];
		}
	}

	for(var $member2 in $this)
	{
		if($member2 !== '$')
		{
/*			$class.prototype['$added_' + $member2] = $this[$member2];
 */
			$class.prototype[$member2] = $this[$member2];
		}
	}

	/*-----------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$class = $class;
	$class.prototype.$interfaces = $interfaces;

	/*-----------------------------------------------------------------*/

	_$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/

	if($this.$)
	{
		$this.$.apply($class);
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
