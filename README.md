# Fillout Assignment

This project was initiated with https://github.com/w3cj/express-api-starter.git.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

## Verify result

```
curl --location --globoff 'http://localhost:5000/api/v1/forms/cLZojxk94ous/filteredResponses?limit=10&filters=[{%22id%22%3A%22lastUpdatedAt%22%2C%22condition%22%3A%22greater_than%22%2C%22value%22%3A%222024-03-01T00%3A00%3A00.000Z%22}]&offset=1&beforeDate=2024-03-06T00%3A00%3A00.000Z'
```

The `fitleredResponse` endpoint will accept all query params that [form submissions endpoint](https://www.fillout.com/help/fillout-rest-api#a981e824966448029aeb091e0706d070) will accept.
This endpoint also requires `filters` query param, which is a json string of filters specified in the requirements.

The response format is same as the original form submissions endpoint.
