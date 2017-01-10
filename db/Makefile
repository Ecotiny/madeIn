# The first target will be the default

SQL_OPTS=-u root 
# The password has to be set using
# mysql_config_editor set -p
# This must be done before issuing commands


note:
	echo "Please specify a target for make."

data:
	#psql -f test_data.sql madein
	mysql ${SQL_OPTS}  madeIn < test_data.sql

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
	mysql ${SQL_OPTS} madeIn
