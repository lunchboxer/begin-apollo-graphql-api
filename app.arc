@app
begin-app

@http
post /graphql
post /graphql_yoga
post /graphql_simple

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
