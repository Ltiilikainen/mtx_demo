set -e

echo Script initialised, twelve second timeout to give MongoDB time to initialise

sleep 12

echo Seeding database

mongoimport --username ${MONGODB_USER} --password ${MONGODB_PASSWORD} --host mtx-mongo:27017 --authenticationDatabase admin --db ${MONGODB_DB} --collection Uploads --type json --file ./mediaSeed.json --jsonArray

echo Seeded uploads

mongoimport --username ${MONGODB_USER} --password ${MONGODB_PASSWORD} --host mtx-mongo:27017 --authenticationDatabase admin --db ${MONGODB_DB} --collection News --type json --file ./newsSeed.json --jsonArray

echo Seeded news

mongoimport --username ${MONGODB_USER} --password ${MONGODB_PASSWORD} --host mtx-mongo:27017 --authenticationDatabase admin --db ${MONGODB_DB} --collection Referrers --type json --file ./referrersSeed.json --jsonArray

echo seeded referrers