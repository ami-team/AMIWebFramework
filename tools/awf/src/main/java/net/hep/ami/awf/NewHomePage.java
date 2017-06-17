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

		File baseDir = new File(NewHomePage.class.getProtectionDomain().getCodeSource().getLocation().toURI());

		while((baseDir = baseDir.getParentFile()) != null)
		{
			if(new File(baseDir, "subapps").exists())
			{
				break;
			}
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder = new StringBuilder();

		NewHomePage.loadResource(stringBuilder, "/net/hep/ami/awf/index.html.tpl");

		FileWriter fileWriter = new FileWriter(new File(baseDir, "index.html"), false);

		try {
			fileWriter.write(stringBuilder.toString().replace("{{TITLE}}", title).replace("{{ENDPOINT}}", endpoint));
		}
		finally {
			fileWriter.close();
		}

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	private static void loadResource(StringBuilder stringBuilder, String path) throws Exception
	{
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(NewHomePage.class.getResourceAsStream(path)));

		try
		{
			String line;

			while((line = bufferedReader.readLine()) != null)
			{
				stringBuilder.append(line)
				             .append('\n')
				;
			}
		}
		finally
		{
			bufferedReader.close();
		}
	}

	/*---------------------------------------------------------------------*/

	private static void out(String s)
	{
		System.out.println(s);
		System.out.flush();
	}

	/*---------------------------------------------------------------------*/

	private static void err(String s)
	{
		System.err.println(s);
		System.err.flush();
	}

	/*---------------------------------------------------------------------*/

	public static void main(String[] args)
	{
		String title;
		String endpoint;

		/*-----------------------------------------------------------------*/

		if(args.length != 1)
		{
			NewHomePage.out("Enter the title:");
			title = new Scanner(System.in).nextLine();

			NewHomePage.out("Enter the endpoint:");
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
			NewHomePage.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
