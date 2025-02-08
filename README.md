# SOA Frontend Template Service

This template should get you up and running with the following:
* Webpack built SPA React Typescript front-end application
* Built assets are Dockerized and served behind NGINX for easy deployment to the Juniper Square EKS k8s clusters
* Pre-configured CI/CD
* Preview environments on open PRs against `main`
* Bare-metal local development over HTTPS
* Testing with `jest`
* Linting with `eslint`
* Code formatting with `prettier`
* Hot module reloading (HMR)
* PR template included
* Ready to be integrated with Codecov and Sentry


## Initial configuration
### Determine local development url
- Decide on a url for local development. All of the examples in this readme will use `frontendservice.dev.junipersquare.us`.
- Decide on a port to run this on

### Initial setup script
- [Install node](https://nodejs.org) and [Homebrew](https://brew.sh)
- Run the following script with `-n` being the name of the service, `-t` being your team name (important for server logging) and `-p` being the port number.
```
$ ./initial-setup.sh -n frontendservice -t my-team-name -p 8080
```

### Graphql
- [Install `@jsq/graphql-codegen` and read the README](https://github.com/junipersquare/jsq-graphql-codegen)

### Other env vars
- Talk to someone from SRE to get your repo added to CodeCov, add the CODECOV_TOKEN [as a repo level environment variable](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
- Talk to someone from SRE to get your repo added to Sentry and add the `SENTRY_DSN` environment variable to `infra/values-*.yml`. It has already been added to the application. You can also test it locally by adding `SENTRY_DSN` to your repos `.env` file.

### Github integration
- Talk to someone from SRE to add the JIRA app integration to your new repo.


## Starting the application locally
- Ensure you followed all the steps under [Initial configuration](#initial-configuration)
- Start up the dev server

```
$ yarn run dev
```

You should be able to view the application at https://frontendservice.dev.junipersquare.us:7579 (or whatever port you chose)

## Adding environment variables and using them in the app.
- Environment variables are defined in a couple of places.
	1. `infra/values-*.yml` files under `deployments.frontend.envVars` for deployment. You can also define repo level environment variables [like this](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) and access them in .yml files like this: `${{ secrets.ENV_VAR }}`
	2. Variables defined in a `.env` file will supersede the ones defined in the `infra` files.
- Access any environment variables in the app within the `process.env` object.
```javascript
// if .env has this line in it,
// FOO_BAR=abc123

console.log(process.env.FOO_BAR) // 'abc123'
```

## Observability

See the readme in https://github.com/junipersquare/frontend-observability for setting up observability with RUM.

The values that must be filled in have been marked with a `TODO`.
