package net.hep.ami.awf;

import java.io.*;

import java.util.*;

public class NewHomePage
{
	/*---------------------------------------------------------------------*/

	public static void createHomePage(String title, String endpoint) throws Exception
	{
		/*-----------------------------------------------------------------*/

		title = title.trim();

		endpoint = endpoint.trim();

		/*-----------------------------------------------------------------*/

		File baseDir = Utilities.getBaseDir();

		File indexFile = new File(baseDir, "index.html");

		if(indexFile.exists())
		{
			throw new Exception("`index.html` already exists.");
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder = new StringBuilder();

		Utilities.read(stringBuilder, NewHomePage.class.getResourceAsStream("/net/hep/ami/awf/index.html.tpl"));

		Utilities.write(indexFile, stringBuilder.toString().replace("{{TITLE}}", title).replace("{{ENDPOINT}}", endpoint));

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	public static void main(String[] args)
	{
		String title;
		String endpoint;

		/*-----------------------------------------------------------------*/

		if(args.length != 1)
		{
			Utilities.out("Enter the title:");
			title = new Scanner(System.in).nextLine();

			Utilities.out("Enter the endpoint:");
			endpoint = new Scanner(System.in).nextLine();
		}
		else
		{
			title = args[0];
			endpoint = args[1];
		}

		/*-----------------------------------------------------------------*/

		try
		{
			NewHomePage.createHomePage(title, endpoint);
		}
		catch(Exception e)
		{
			Utilities.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
