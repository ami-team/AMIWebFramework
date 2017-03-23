package net.hep.ami.awf;

import java.io.*;
import java.util.*;

public class CssCompressor
{
	/*---------------------------------------------------------------------*/

	public static void compress(String outFileName, String inFileName) throws Exception
	{
		com.yahoo.platform.yui.compressor.CssCompressor compressor;

		/*-----------------------------------------------------------------*/

		InputStreamReader reader = new InputStreamReader(new FileInputStream(inFileName), "UTF-8");

		try
		{
			compressor = new com.yahoo.platform.yui.compressor.CssCompressor(reader);
		}
		finally
		{
			reader.close();
		}

		/*-----------------------------------------------------------------*/

		OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(outFileName), "UTF-8");

		try
		{
			compressor.compress(writer, -1);
		}
		finally
		{
			writer.close();
		}

		/*-----------------------------------------------------------------*/
	}

	/*---------------------------------------------------------------------*/

	public static void main(String[] args)
	{
		/*-----------------------------------------------------------------*/

		String outFileName;
		String inFileName;

		if(args.length != 2)
		{
			System.out.println("Output file:");
			outFileName = new Scanner(System.in).nextLine();

			System.out.println("Input file:");
			inFileName = new Scanner(System.in).nextLine();
		}
		else
		{
			outFileName = args[0];
			inFileName = args[1];
		}

		/*-----------------------------------------------------------------*/

		try
		{
			CssCompressor.compress(outFileName, inFileName);
		}
		catch(Exception e)
		{
			System.err.println(e.getMessage());

			System.exit(1);
		}

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
