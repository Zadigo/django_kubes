FROM golang:1.27.1-alpine3.24 AS builder

# ca-certificates: needed if your server or its deps make outbound TLS calls
# git: needed if any go.mod dependency is fetched over VCS instead of a module proxy
RUN apk add --no-cache ca-certificates git

WORKDIR /app

# Copy only go.mod/go.sum first so this layer is cached
# and dependencies aren't re-downloaded on every source change
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# CGO_ENABLED=0 -> static binary, no libc dependency, works on scratch/distroless
# -ldflags="-s -w" -> strip debug symbols, smaller binary
# -trimpath -> reproducible builds, no local filesystem paths leaked into the binary
RUN CGO_ENABLED=0 GOOS=linux go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /out/gomcp .

FROM alpine:3.20

RUN apk add --no-cache ca-certificates \
    && addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=builder /out/gomcp .

USER app

ENTRYPOINT ["./gomcp"]
