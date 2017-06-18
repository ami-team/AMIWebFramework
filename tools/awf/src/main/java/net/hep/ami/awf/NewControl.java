package net.hep.ami.awf;

import java.io.*;

import java.util.*;

import org.json.simple.*;
import org.json.simple.parser.*;

@SuppressWarnings("unchecked")
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

		File baseDir = Utilities.getBaseDir("controls");

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

		Utilities.read(stringBuilder1, NewControl.class.getResourceAsStream("/net/hep/ami/awf/ctrl.js.tpl"));

		Utilities.write(new File(jsDir, NAME + "Ctrl.js"), stringBuilder1.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder2 = new StringBuilder();

		Utilities.read(stringBuilder2, NewControl.class.getResourceAsStream("/net/hep/ami/awf/ctrl.css.tpl"));

		Utilities.write(new File(cssDir, NAME + "Ctrl.css"), stringBuilder2.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder3 = new StringBuilder();

		Utilities.read(stringBuilder3, NewControl.class.getResourceAsStream("/net/hep/ami/awf/ctrl.twig.tpl"));

		Utilities.write(new File(twigDir, NAME + "Ctrl.twig"), stringBuilder3.toString().replace("{{name}}", name).replace("{{NAME}}", NAME).replace("{{YEAR}}", YEAR));

		/*-----------------------------------------------------------------*/

		JSONObject object;

		/*-----------------------------------------------------------------*/

		FileReader fileReader = new FileReader(new File(baseDir, "CONTROLS.json"));

		try {
			object = (JSONObject) new JSONParser().parse(fileReader);
		}
		finally {
			fileReader.close();
		}

		/**/

		Map<String, String> map = new LinkedHashMap<String, String>();

		map.put("file", "controls/" + NAME + "/js/" + NAME + "Ctrl.js");

		object.put(name, map);

		/**/

		FileWriter fileWriter = new FileWriter(new File(baseDir, "CONTROLS.json"));

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
			Utilities.out("Enter the control name ([a-zA-Z][a-zA-Z0-9]*):");

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
			Utilities.err(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
