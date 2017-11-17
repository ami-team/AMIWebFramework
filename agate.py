import re, sys

#############################################################################

RE = re.compile('<li class=\'li_user\' data-user-id=\'([0-9]+)\'><div class=\'label\'>([a-zA-Z\s]+)</div></li>')

#############################################################################

s = 'INSERT INTO AGATE_MATCHING (id, name) VALUES\n'

#############################################################################

with open(sys.argv[1]) as f:

	for line in f.readlines():

		m = RE.search(line)

		if m:
			s += '  (%s, \'%s\'),\n' % (
				m.group(1).lower()
				,
				m.group(2).lower()
			)

#############################################################################

s = s[: -2] + '\n;'

#############################################################################

print(s)

#############################################################################
