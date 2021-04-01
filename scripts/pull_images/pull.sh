#!/bin/sh

DATA_URL=https://s3.eu-central-1.amazonaws.com/fashion-gan/images.zip
ZIP_FILE=scripts/pull_images/images.zip
IMAGE_DESTINATION=client/public/images/product/

if test -f "$ZIP_FILE"; then
  echo "$ZIP_FILE exists."
else
  echo "Downloading images..."
  curl -Lo $ZIP_FILE $DATA_URL
fi

echo "cleaning $IMAGE_DESTINATION"
rm -rf $IMAGE_DESTINATION
mkdir -p $IMAGE_DESTINATION

echo "Unzipping files..."
unzip -j $ZIP_FILE images/test_images/dresses/* -d $IMAGE_DESTINATION

echo "Renaming image sequentially..."
ls $IMAGE_DESTINATION | cat -n | while read n f; do mv $IMAGE_DESTINATION"$f" $IMAGE_DESTINATION"$n.jpg"; done #
##rm *.zip
#
echo "done"
