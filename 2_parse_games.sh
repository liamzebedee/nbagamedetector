# for file in data
for f in data/*.html
do
	# echo $f
	node parseGame.js $f
done