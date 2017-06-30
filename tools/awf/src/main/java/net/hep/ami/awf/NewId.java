package net.hep.ami.awf;

import java.util.*;

public class NewId
{
	/*---------------------------------------------------------------------*/

	public static void main(String[] args)
	{
		/*-----------------------------------------------------------------*/

		final Random r = new Random();

		/*-----------------------------------------------------------------*/

		final String A =      "ABCDEF"     ;
		final String B = "0123456789ABCDEF";

		/*-----------------------------------------------------------------*/

		StringBuilder stringBuilder = new StringBuilder();

		/*-----------------------------------------------------------------*/

		stringBuilder.append(A.charAt(r.nextInt( 6)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append('_');
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append('_');
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append('_');
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append('_');
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));
		stringBuilder.append(B.charAt(r.nextInt(16)));

		/*-----------------------------------------------------------------*/

		System.out.println(stringBuilder.toString());

		/*-----------------------------------------------------------------*/

		System.exit(0);
	}

	/*---------------------------------------------------------------------*/
}
