# The first target will be the default

note:
	echo "Please specify a target for make."

data:
	psql -f test_data.sql madein

db:
	- dropdb madein
	createdb madein
	psql -f madeIn.sql madein

install:
	sudo aptitude install postgresql
