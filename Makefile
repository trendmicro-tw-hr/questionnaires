build.web:
	docker-compose build web
	
up.web:
	docker-compose up web -d --build

exec.web:
	docker exec -it questionnaires-web /bin/bash

down:
	docker-compose down
