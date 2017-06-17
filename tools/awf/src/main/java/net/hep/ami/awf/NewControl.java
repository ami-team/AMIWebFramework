package net.hep.ami.awf;

import java.io.*;

import java.util.*;

public class NewControl
{
	/*---------------------------------------------------------------------*/

	public static void createNewControl(String x) throws Exception
	{
		/*-----------------------------------------------------------------*/

		x = x.trim();

		if(x.matches("[a-zA-Z][a-zA-Z0-9]*") == false)
		{
			throw new Exception("Invalid control name `" + x + "`.");
		}

		/*-----------------------------------------------------------------*/

		String name = x.substring(0, 1).toLowerCase() + x.substring(1);
		String NAME = x.substring(0, 1).toUpperCase() + x.substring(1);

		/*-----------------------------------------------------------------*/

		String YEAR = String.valueOf(Calendar.getInstance().get(Calendar.YEAR));

		/*-----------------------------------------------------------------*/

		File baseDir = new File(NewControl.class.getProtectionDomain().getCodeSource().getLocation().toURI());

		while((baseDir = baseDir.getParentFile()) != null)
		{
			File temp = new File(baseDir, "controls");

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
			throw new Exception("The control already exists.");
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

		NewControl.loadResource(stringBuilder1, "/net/hep/ami/awf/ctrl.js.tpl");

		FileWriter fileWriter1 = new FileWriter(new File(jsDir, NAME + "Ctrl.js"), false);

		try {
			fileWriter1.write(stringBuilder1.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter1.close();
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder2 = new StringBuilder();

		NewControl.loadResource(stringBuilder2, "/net/hep/ami/awf/ctrl.css.tpl");

		FileWriter fileWriter2 = new FileWriter(new File(cssDir, NAME + "Ctrl.css"), false);

		try {
			fileWriter2.write(stringBuilder2.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter2.close();
		}

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder3 = new StringBuilder();

		NewControl.loadResource(stringBuilder3, "/net/hep/ami/awf/ctrl.twig.tpl");

		FileWriter fileWriter3 = new FileWriter(new File(twigDir, NAME + "Ctrl.twig"), false);

		try {
			fileWriter3.write(stringBuilder3.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));
		}
		finally {
			fileWriter3.close();
		}

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	private static void loadResource(StringBuilder stringBuilder, String path) throws Exception
	{
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(NewControl.class.getResourceAsStream(path)));

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
			NewControl.out("Enter the control name ([a-zA-Z][a-zA-Z0-9]*):");

			name = new Scanner(System.in).nextLine();
		}
		else
		{
			name = args[0];
		}

		/*-----------------------------------------------------------------*/

		try
		{
			NewControl.createNewControl(name);
		}
		catch(Exception e)
		{
			NewControl.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
