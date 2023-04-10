# newsletter.com

Web application for storicard challenge, a simple newsletter app.

## Contents

- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Run](#run)
- [Authors](#authors)

## Dependencies

![TypeScript +4.9](https://img.shields.io/badge/TypeScript-+4.9-blue.svg)
![React +18.2](https://img.shields.io/badge/React-+18.2-red.svg)

## Configuration

Create an **.env** based on the [.env.template](./.env.template):

```sh
cp .env.template .env
```

If you need to update any value here's the list of the environment variables definition:

| Variable          | Default value       | Description         |
| ----------------- | ------------------- | ------------------- |
| REACT_APP_API_URL | http://0.0.0.0:8000 | Newsletter API URL. |

# Run

The recommendation is to have the project [api.newsletter.com](https://github.com/Davestring/api.newsletter.com/) running first before executing this project, then:

> Install project dependencies:

```sh
yarn install
```

> Run the project:

```sh
yarn start:app
```

At this point you should be able to render the site at: [http://0.0.0.0:3000](http://0.0.0.0:3000)

## Authors

Carlos David Hernández Martínez - [Davestring](https://github.com/Davestring)
