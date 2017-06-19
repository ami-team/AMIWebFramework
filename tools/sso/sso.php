<?php
/*!
 * AMI SSO Plugin
 *
 * Version: -
 *
 * Copyright (c) 2014-2017 The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* AMISSO                                                                  */
/*-------------------------------------------------------------------------*/

abstract class AMISSO
{
	/*-----------------------------------------------------------------*/

	abstract protected function init();

	abstract protected function getUserInfo();

	/*-----------------------------------------------------------------*/

	protected function isRegistered()
	{
		return false;
	}

	/*-----------------------------------------------------------------*/

	private static function getParam($name, $default = '')
	{
		if(isset($_GET[$name]))
		{
			return $_GET[$name];
		}

		if(isset($_POST[$name]))
		{
			return $_POST[$name];
		}

		return $default;
	}

	/*-----------------------------------------------------------------*/

	function start($host, $port, $login, $password)
	{
		/*---------------------------------------------------------*/

		try
		{
			$pdo = new PDO("mysql:host=$host;port=$port;dbname=$db", $login, $password);

			$pdo->exec('SET NAMES "utf8"');
		}
 		catch(Exception $e)
		{
			die('database error');
		}

		/*---------------------------------------------------------*/

		$originURL = $this->getParam('originURL');

		/*---------------------------------------------------------*/

		echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n";
		echo "\n";
		echo "<!DOCTYPE html>\n";
		echo "\n";
		echo "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\">\n";
		echo "  <head>\n";
		echo "    <meta charset=\"utf-8\" />\n";
		echo "    <title>AMI SSO</title>\n";
		echo "\n";
		echo "    <style>\n";
		echo "    .btn {\n";
		echo "      background: #3498db;\n";
		echo "      background-image: linear-gradient(to bottom, #3498db, #2980b9);\n";
		echo "      border-radius: 8px;\n";
		echo "      cursor: default;\n";
		echo "      border: none;\n";
		echo "      color: #FFF;\n";
		echo "      font-size: 20px;\n";
		echo "      padding: 10px 20px 10px 20px;\n";
		echo "    }\n";
		echo "\n";
		echo "    .btn:hover {\n";
		echo "      background: #3cb0fd;\n";
		echo "      background-image: linear-gradient(to bottom, #3cb0fd, #3498db);\n";
		echo "      border-radius: 8px;\n";
		echo "      cursor: pointer;\n";
		echo "      border: none;\n";
		echo "      color: #FFF;\n";
		echo "      font-size: 20px;\n";
		echo "      padding: 10px 20px 10px 20px;\n";
		echo "    }\n";
		echo "\n";
		echo "    .btn {\n";
		echo "      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);\n";
		echo "      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);\n";
		echo "    }\n";
		echo "\n";
		echo "    .btn::after {\n";
		echo "      box-shadow: 0 1px 02px rgba(0, 0, 0, 0.1);\n";
		echo "      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);\n";
		echo "    }\n";
		echo "\n";
		echo "    .btn:hover {\n";
		echo "      transform: scale(1.25, 1.25);\n";
		echo "    }\n";
		echo "\n";
		echo "    .btn::after {\n";
		echo "      opacity: 0;\n";
		echo "    }\n";
		echo "\n";
		echo "\n";
		echo "    .btn:hover::after {\n";
		echo "      opacity: 1;\n";
		echo "    }\n";
		echo "\n";
		echo "    </style>\n";
		echo "  </head>\n";
		echo "  <body>\n";
		echo "\n";

		/*---------------------------------------------------------*/

		$this->init();

		/*---------------------------------------------------------*/

		$userInfo = [];//$this->getUserInfo();

		$userInfo['user'] = 'admin';
		$userInfo['pass'] = 'insider';

		/*---------------------------------------------------------*/
/*
		$stmt = $pdo->query("SELECT AMIUser AS user, AMIPass AS pass FROM router_user WHERE AMIUser = '" . $userInfo['user'] . "';");

		print_r($stmt);

		$result = $stmt->fetchAll();

		print_r($result);

		$stmt->closeCursor();
*/
		/*---------------------------------------------------------*/

		if($this->isRegistered())
		{
			echo "    <script>\n";
			echo "      window.opener.postMessage({'user': '" . $userInfo['user'] . "', 'pass': '" . $userInfo['pass'] . "'}, '$originURL');\n";
			echo "    </script>\n";
		}
		else
		{
			echo "    <table style=\"position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%; text-align: center;\">\n";
			echo "      <tr>\n";
			echo "        <td><button class=\"btn\" onclick=\"window.opener.postMessage({'user': '" . $userInfo['user'] . "', 'pass': '" . $userInfo['pass'] . "'}, '$originURL');\">Grant access to AMI</button></td>\n";
			echo "      </tr>\n";
			echo "    </table>\n";
		}

		/*---------------------------------------------------------*/

		echo "\n";
		echo "  </body>\n";
		echo "</html>\n";

		/*---------------------------------------------------------*/
	}

	/*-----------------------------------------------------------------*/
}

/*-------------------------------------------------------------------------*/
