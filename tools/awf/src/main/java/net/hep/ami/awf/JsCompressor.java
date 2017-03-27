package net.hep.ami.awf;

import java.io.*;
import java.util.*;

import org.mozilla.javascript.*;

public class JsCompressor
{
	/*---------------------------------------------------------------------*/

	public static void compress(final String outFileName, final String inFileName) throws Exception
	{
		com.yahoo.platform.yui.compressor.JavaScriptCompressor compressor;

		/*-----------------------------------------------------------------*/

		InputStreamReader reader = new InputStreamReader(new FileInputStream(inFileName), "UTF-8");

		try
		{
			compressor = new com.yahoo.platform.yui.compressor.JavaScriptCompressor(reader, new ErrorReporter() {
				/*---------------------------------------------------------*/

				@Override
				public void warning(String message, String sourceName, int line, String lineSource, int column)
				{
					System.err.println("\n[WARNING] in " + inFileName);

					if(line < 0) {
						System.err.println("  " + message);
					} else {
						System.err.println("  " + line + ':' + column + ':' + message);
					}
				}

				/*---------------------------------------------------------*/

				@Override
				public void error(String message, String sourceName, int line, String lineSource, int column)
				{
					System.err.println("\n[ERROR] in " + inFileName);

					if(line < 0) {
						System.err.println("  " + message);
					} else {
						System.err.println("  " + line + ':' + column + ':' + message);
					}
				}

				/*---------------------------------------------------------*/

				@Override
				public EvaluatorException runtimeError(String message, String sourceName, int line, String lineSource, int column)
				{
					error(message, sourceName, line, lineSource, column);

					return new EvaluatorException(message);
				}

				/*---------------------------------------------------------*/
			});
		}
		finally
		{
			reader.close();
		}

		/*-----------------------------------------------------------------*/

		OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(outFileName), "UTF-8");

		try
		{
			compressor.compress(writer, -1, false, false, false, false);
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
			JsCompressor.compress(outFileName, inFileName);
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
