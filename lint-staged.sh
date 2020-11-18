#!/bin/sh

if git rev-parse --verify HEAD >/dev/null 2>&1
then
	against=HEAD
else
	# Initial commit: diff against an empty tree object
	against=151b84bcb68d0d7460d72bfddb2574342fa375ab
fi

# Redirect output to stderr.
exec 1>&2

# assume there have been no problems
status=0

files=''
# loop through newly committed and modified files
for file in $(git diff-index --name-only --diff-filter AM --cached HEAD); do
  if (echo $file | grep "\.js" | grep -q -v "\.json") then
		files="${files} ${file}"
  fi
done

# lint JS files
yarn run lint-file $files
status=$(( $status == 0 ? $? : $status ))

exit $status
