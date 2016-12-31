# The first target will be the default

note:
	echo "Please specify a target for make."

data:
	#psql -f test_data.sql madein
	mysql -u root -p madeIn < test_data.sql

db:
	#- dropdb madein
	#createdb madein
	#psql -f madeIn.sql madein
	mysql -u root -p < madeInnoDB.sql

install:
	sudo aptitude install postgresql
