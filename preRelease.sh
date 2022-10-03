cd dist || exit
sed -i "s/0.0.0-semantic-release/$1/g" *
