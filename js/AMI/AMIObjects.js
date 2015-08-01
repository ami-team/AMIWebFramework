/*!
 * AMI Web Framework
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* NAMESPACE                                                               */
/*-------------------------------------------------------------------------*/

function $AMINamespace($name, newNamespacePrototype)
{
	if(!newNamespacePrototype)
	{
		newNamespacePrototype = {};
	}

	/*-----------------------------------------------------------------*/

	newNamespacePrototype.$name = $name;

	/*-----------------------------------------------------------------*/

	if(newNamespacePrototype.$init)
	{
		newNamespacePrototype.$init();
	}

	/*-----------------------------------------------------------------*/

	window[$name] = newNamespacePrototype;

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* INTERFACE                                                               */
/*-------------------------------------------------------------------------*/

function $AMIInterface($name, newClassPrototype)
{
	if(!newClassPrototype)
	{
		newClassPrototype = {};
	}

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		throw 'could nor instantiate interface';
	};

	/*-----------------------------------------------------------------*/

	if(newClassPrototype.$extends)
	{
		throw '`$extends` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	if(newClassPrototype.$implements)
	{
		throw '`$implements` not allowed for interface';
	}

	/*-----------------------------------------------------------------*/

	$class.$name = $name;
	$class.$class = $class;
	$class.$members = newClassPrototype;

	/*-----------------------------------------------------------------*/

	window[$name] = $class;

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
/* CLASS                                                                   */
/*-------------------------------------------------------------------------*/

function $AMIClass($name, newClassPrototype)
{
	if(!newClassPrototype)
	{
		newClassPrototype = {};
	}

	/*-----------------------------------------------------------------*/

	var $class = function()
	{
		for(var key1 in this.$interfaces)
		{
			var interfaze = this.$interfaces[key1];

			for(var key2 in interfaze.$members)
			{
				var member = interfaze.$members[key2];

				if(typeof(this[key2]) !== typeof(member))
				{
					alert('class `' + this.$name + '` with must implement `' + interfaze.$name + '.' + key2 + '`');
				}
			}
		}

		this.$init.apply(this, arguments);
	};

	/*-----------------------------------------------------------------*/

	var $super;

	var oldClassPrototype;

	if(newClassPrototype.$extends)
	{
		$super = newClassPrototype.$extends;

		oldClassPrototype = newClassPrototype.$extends.prototype;
	}
	else
	{
		$super = null;

		oldClassPrototype = [];
	}

	/*-----------------------------------------------------------------*/

	var $interfaces;

	if(newClassPrototype.$implements)
	{
		$interfaces = newClassPrototype.$implements;
	}
	else
	{
		$interfaces = [];
	}

	/*-----------------------------------------------------------------*/

	for(var member in oldClassPrototype)
	{
		$class.prototype[member] = oldClassPrototype[member];
	}

	for(var member in newClassPrototype)
	{
		$class.prototype[member] = newClassPrototype[member];
	}

	/*-----------------------------------------------------------------*/

	$class.prototype.$name = $name;
	$class.prototype.$class = $class;
	$class.prototype.$super = $super;
	$class.prototype.$interfaces = $interfaces;

	/*-----------------------------------------------------------------*/

	if(!$class.prototype.$init)
	{
		$class.prototype.$init = function() {};
	}

	/*-----------------------------------------------------------------*/

	window[$name] = $class;

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
