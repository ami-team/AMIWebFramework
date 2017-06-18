package net.hep.ami.awf;

import java.io.*;

public class Utilities
{
	/*---------------------------------------------------------------------*/

	public static File getBaseDir() throws Exception
	{
		File result = new File(Utilities.class.getProtectionDomain().getCodeSource().getLocation().toURI());

		while((result = result.getParentFile()) != null)
		{
			if(new File(result, "subapps").exists())
			{
				break;
			}
		}

		return result;
	}

	/*---------------------------------------------------------------------*/

	public static File getBaseDir(String dirName) throws Exception
	{
		File result = new File(Utilities.class.getProtectionDomain().getCodeSource().getLocation().toURI());

		while((result = result.getParentFile()) != null)
		{
			File temp = new File(result, dirName);

			if(temp.exists())
			{
				result = temp;

				break;
			}
		}

		return result;
	}

	/*---------------------------------------------------------------------*/

	public static void read(StringBuilder stringBuilder, File file) throws Exception
	{
		read(stringBuilder, new FileInputStream(file));
	}

	/*---------------------------------------------------------------------*/

	public static void write(File file, String string) throws Exception
	{
		write(new FileOutputStream(file), string);
	}

	/*---------------------------------------------------------------------*/

	public static void read(StringBuilder stringBuilder, InputStream inputStream) throws Exception
	{
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));

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

	public static void write(OutputStream outputStream, String string) throws Exception
	{
		OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);

		try
		{
			outputStreamWriter.write(string);

			outputStreamWriter.flush();
		}
		finally
		{
			outputStreamWriter.close();
		}
	}

	/*---------------------------------------------------------------------*/

	public static void out(String s)
	{
		System.out.println(s);
		System.out.flush();
	}

	/*---------------------------------------------------------------------*/

	public static void err(String s)
	{
		System.err.println(s);
		System.err.flush();
	}

	/*---------------------------------------------------------------------*/
}
