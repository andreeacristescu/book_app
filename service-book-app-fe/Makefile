export AWS_DEFAULT_PROFILE=mentorina

login: 
	aws ecr get-login --profile ${AWS_DEFAULT_PROFILE} | /bin/bash
build: login
	docker build -t mentorina/service-teacher-portal-fe -f docker/Dockerfile .
run: build
	docker-compose -f docker/docker-compose.yml up -d
restart:
	make stop && make run
logs:
	docker-compose -f docker/docker-compose.yml logs -f
stop:
	docker-compose -f docker/docker-compose.yml stop
deploy-qa:
	git checkout qa
	git pull
	git merge dev
	git push
	git checkout dev
.PHONY: build run restart logs stop deploy-qa
