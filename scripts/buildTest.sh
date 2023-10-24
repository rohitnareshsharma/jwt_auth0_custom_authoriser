sam build -t template.yaml
sam local invoke -e events/event.json
