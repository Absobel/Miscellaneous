xpi=$(curl "$1" | grep -o "https://[a-z./0-9_+-]*.xpi") || exit 1
temp=$(mktemp)
wget "$xpi" --output-document="$temp"
id=$(unzip -p "$temp" "manifest.json" | grep '"id": "' | sed -r 's|.*"(.*)".*|\1|')
[ -z "$id" ] &&	id=$(unzip -p "$temp" META-INF/cose.sig | strings | grep -o "{.*}" | sed 's/{}//g')
[ -z "$id" ] && echo "Could not find id in $xpi" && exit 1
find "$HOME/.floorp/" -name "extensions" -type d | while read f
do
	if ! test -f "$f/$id.xpi"
	then
		echo "Copying to $f/$id.xpi"
		cp "$temp" "$f/$id.xpi"
	fi
done
rm "$temp"
