# The first target will be the default

SQL_OPTS=-u root -p

note:
	echo "Please specify a target for make."

data:
	#psql -f test_data.sql madein
	mysql -u root -p madeIn < test_data.sql

db:
	#- dropdb madein
	#createdb madein
	#psql -f madeIn.sql madein
	mysql ${SQL_OPTS} < countries.sql
	mysql ${SQL_OPTS} < states.sql
	mysql ${SQL_OPTS} < cities.sql
	mysql ${SQL_OPTS} < madeInnoDB.sql

install:
	sudo aptitude install postgresql

login:
	mysql -u root -p madeIn
