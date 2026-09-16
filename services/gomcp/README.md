## Commands

### Inspector

```Shell

# Start inspector
npx @modelcontextprotocol/inspector go run -C /path/to/gomcp .
```

```Shell
docker-compose build app_gomcp

npx @modelcontextprotocol/inspector docker run -i --rm django_kubes-app_gomcp
```

### Build

```Shell

go build -o gomcp .

# Inspector
npx @modelcontextprotocol/inspector ./gomcp
```

### Docker
