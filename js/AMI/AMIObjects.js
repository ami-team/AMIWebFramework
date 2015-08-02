/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* HELPERS                                                                 */
/*-------------------------------------------------------------------------*/

function __$createNamespace($name, x)
{
	var parent = window, parts = $name.split('.');

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

function __$addToNamespace($name, x)
{
	var parent = window, parts = $name.split('.');

	for(var i = 0; i < parts.length - 1; i++)
	{
		if(parent[parts[i]])
		{
			parent = parent[parts[i]];
		}
		else
		{
			throw '`' + $name + '` not declared';
		}
	}

	parent[parts[i]] = x;
}

/*-------------------------------------------------------------------------*/
/* NAMESPACE                                                               */
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

	if($this.$init)
	{
		$this.$init();
	}

	/*-----------------------------------------------------------------*/

	__$createNamespace($name, $this);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACE                                                               */
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

	/*-----------------------------------------------------------------*/

	if($this.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	if($this.$init)
	{
		throw '`$init` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = $this;

	/*-----------------------------------------------------------------*/

	__$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASS                                                                   */
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

	for(var $member in $super)
	{
		$class.prototype[$member] = $super[$member];
	}

	for(var $member in $this)
	{
		$class.prototype[$member] = $this[$member];
	}

	/*-----------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$super = $super;
	$class.prototype.$class = $class;
	$class.prototype.$interfaces = $interfaces;

	/*-----------------------------------------------------------------*/

	__$addToNamespace($name, $class);

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
