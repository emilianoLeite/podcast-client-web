# Dumb Components

In this folder you will find the "Dumb" Components. These components:

- Are *not* aware of global state (Context, etc)
- Are *not* aware of Auth state (Authenticated/Unauthenticated)
- Can have business logic, but only handle data received via props
- Do *not* make requests to the "outside world"
- Can import "Smart Components"
