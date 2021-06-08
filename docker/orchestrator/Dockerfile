
FROM rust:latest as cargo-build

RUN apt-get update

RUN apt-get install musl-tools -y

RUN rustup target add x86_64-unknown-linux-musl

WORKDIR /usr/src

RUN git clone https://github.com/cosmos/gravity-bridge.git

WORKDIR /usr/src/gravity-bridge/orchestrator

#COPY Cargo.toml Cargo.toml

RUN RUSTFLAGS=-Clinker=musl-gcc cargo build --release --target=x86_64-unknown-linux-musl

RUN rm -f target/x86_64-unknown-linux-musl/release/deps/orchestrator*

COPY . .

RUN RUSTFLAGS=-Clinker=musl-gcc cargo build --release --target=x86_64-unknown-linux-musl

RUN pwd
RUN ls -l

FROM alpine:latest

RUN addgroup -g 1000 orchestrator

RUN adduser -D -s /bin/sh -u 1000 -G orchestrator orchestrator

WORKDIR /home/orchestrator/bin/

COPY --from=cargo-build /usr/src/gravity-bridge/orchestrator/target/x86_64-unknown-linux-musl/release/orchestrator .

RUN chown orchestrator:orchestrator orchestrator

CMD ["./orchestrator"]
