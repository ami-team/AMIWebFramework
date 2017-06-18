package net.hep.ami.awf;

import java.io.*;

import java.util.*;

import org.json.simple.*;
import org.json.simple.parser.*;

@SuppressWarnings("unchecked")
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

		File baseDir = Utilities.getBaseDir("subapps");

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

		Utilities.read(stringBuilder1, NewSubApp.class.getResourceAsStream("/net/hep/ami/awf/app.js.tpl"));

		Utilities.write(new File(jsDir, NAME + "App.js"), stringBuilder1.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder2 = new StringBuilder();

		Utilities.read(stringBuilder2, NewSubApp.class.getResourceAsStream("/net/hep/ami/awf/app.css.tpl"));

		Utilities.write(new File(cssDir, NAME + "App.css"), stringBuilder2.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder3 = new StringBuilder();

		Utilities.read(stringBuilder3, NewSubApp.class.getResourceAsStream("/net/hep/ami/awf/app.twig.tpl"));

		Utilities.write(new File(twigDir, NAME + "App.twig"), stringBuilder3.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		JSONObject object;

		/*-----------------------------------------------------------------*/

		FileReader fileReader = new FileReader(new File(baseDir, "SUBAPPS.json"));

		try {
			object = (JSONObject) new JSONParser().parse(fileReader);
		}
		finally {
			fileReader.close();
		}

		/**/

		Map<String, String> map = new LinkedHashMap<String, String>();

		map.put("file", "subapps/" + NAME + "/js/" + NAME + "App.js");
		map.put("instance", name + "App");

		object.put(name, map);

		/**/

		FileWriter fileWriter = new FileWriter(new File(baseDir, "SUBAPPS.json"));

		try {
			object.writeJSONString(fileWriter);
		}
		finally {
			fileWriter.close();
		}

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	public static void main(String[] args)
	{
		String name;

		/*-----------------------------------------------------------------*/

		if(args.length != 1)
		{
			Utilities.out("Enter the sub app name ([a-zA-Z][a-zA-Z0-9]*):");

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
			Utilities.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
