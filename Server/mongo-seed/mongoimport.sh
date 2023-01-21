#!/bin/sh

mongoimport --host mongodb --db animalhouse --collection user  		--type json --file /mongo-seed/users.json    --jsonArray
mongoimport --host mongodb --db animalhouse --collection animal 	--type json --file /mongo-seed/animals.json  --jsonArray
mongoimport --host mongodb --db animalhouse --collection product 	--type json --file /mongo-seed/products.json --jsonArray
mongoimport --host mongodb --db animalhouse --collection punteggio	--type json --file /mongo-seed/punteggi.json --jsonArray
mongoimport --host mongodb --db animalhouse --collection sede 		--type json --file /mongo-seed/sedi.json 	 --jsonArray
mongoimport --host mongodb --db animalhouse --collection servizio 	--type json --file /mongo-seed/servizi.json  --jsonArray

