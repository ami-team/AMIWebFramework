package net.hep.ami.awf;

import java.io.*;

import java.util.*;

public class NewSubApp
{
	/*---------------------------------------------------------------------*/

	public static void createNewSubApp(String x) throws Exception
	{
		/*-----------------------------------------------------------------*/

		x = x.trim();

		if(x.matches("[a-zA-Z][a-zA-Z0-9]*") == false)
		{
			throw new Exception("Invalid sub app name `" + x + "`.");
		}

		/*-----------------------------------------------------------------*/

		String name = x.substring(0, 1).toLowerCase() + x.substring(1);
		String NAME = x.substring(0, 1).toUpperCase() + x.substring(1);

		/*-----------------------------------------------------------------*/

		String YEAR = String.valueOf(Calendar.getInstance().get(Calendar.YEAR));

		/*-----------------------------------------------------------------*/

		File baseDir = new File(NewSubApp.class.getProtectionDomain().getCodeSource().getLocation().toURI());

		while((baseDir = baseDir.getParentFile()) != null)
		{
			File temp = new File(baseDir, "subapps");

			if(temp.exists())
			{
				baseDir = temp;

				break;
			}
		}

		/*-----------------------------------------------------------------*/

		File appDir = new File(baseDir, NAME);

		if(appDir.mkdir() == false)
		{
			throw new Exception("The project already exists.");
		}

		/*-----------------------------------------------------------------*/

		File jsDir = new File(appDir, "js");
		File cssDir = new File(appDir, "css");
		File twigDir = new File(appDir, "twig");

		jsDir.mkdir();
		cssDir.mkdir();
		twigDir.mkdir();

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder1 = new StringBuilder();

		NewSubApp.loadResource(stringBuilder1, "/net/hep/ami/awf/app.js");

		FileWriter fileWriter1 = new FileWriter(new File(jsDir, NAME + "App.js"), false);

		try {
			fileWriter1.write(stringBuilder1.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter1.close();
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder2 = new StringBuilder();

		NewSubApp.loadResource(stringBuilder2, "/net/hep/ami/awf/app.css");

		FileWriter fileWriter2 = new FileWriter(new File(cssDir, NAME + "App.css"), false);

		try {
			fileWriter2.write(stringBuilder2.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter2.close();
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder3 = new StringBuilder();

		NewSubApp.loadResource(stringBuilder3, "/net/hep/ami/awf/app.twig");

		FileWriter fileWriter3 = new FileWriter(new File(twigDir, NAME + "App.twig"), false);

		try {
			fileWriter3.write(stringBuilder3.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter3.close();
		}

		/*-----------------------------------------------------------------*/

		NewSubApp.out("<script type=\"text/javascript\" src=\"subapps/" + NAME + "/js/" + NAME + "App.js\"></script>");

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	private static void loadResource(StringBuilder stringBuilder, String path) throws Exception
	{
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(NewSubApp.class.getResourceAsStream(path)));

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
		String name;

		/*-----------------------------------------------------------------*/

		if(args.length != 1)
		{
			NewSubApp.out("Enter the sub app name ([a-zA-Z][a-zA-Z0-9]*):");

			name = new Scanner(System.in).nextLine();
		}
		else
		{
			name = args[0];
		}

		/*-----------------------------------------------------------------*/

		try
		{
			NewSubApp.createNewSubApp(name);
		}
		catch(Exception e)
		{
			NewSubApp.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
