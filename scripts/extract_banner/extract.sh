ZIP_FILE=scripts/extract_banner/Ads.zip
IMAGE_DESTINATION=client/public/images/category/

echo "cleaning $IMAGE_DESTINATION"
rm -rf $IMAGE_DESTINATION
mkdir -p $IMAGE_DESTINATION

echo "Unzipping files..."
unzip -j $ZIP_FILE Ads/* -d $IMAGE_DESTINATION

ls $IMAGE_DESTINATION | cat -n | while read n f; do mv $IMAGE_DESTINATION"$f" $IMAGE_DESTINATION"$n.png"; done #

echo "done"
