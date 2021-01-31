if [ ! -z "$VERCEL" ]
then
	export URL=https://$VERCEL_URL
	echo "Set URL to $URL"
fi