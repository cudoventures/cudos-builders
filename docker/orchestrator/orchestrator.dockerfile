
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

# COPY . .

RUN RUSTFLAGS=-Clinker=musl-gcc cargo build --release --target=x86_64-unknown-linux-musl

# RUN pwd
# RUN ls -l

FROM rust:latest

WORKDIR /home/orchestrator/bin/

COPY --from=cargo-build /usr/src/gravity-bridge/orchestrator/target/x86_64-unknown-linux-musl/release/orchestrator .

COPY --from=cargo-build /usr/src/gravity-bridge/orchestrator/startup.sh .

COPY --from=cargo-build /usr/src/gravity-bridge/orchestrator/Cargo.toml .

# COPY ./CudosBuilders/docker/orchestrator/startup.sh .

RUN addgroup -gid 1000 orchestrator && \
    adduser --disabled-password -uid 1000 -gid 1000 orchestrator && \
    chown orchestrator:orchestrator ./orchestrator && \
    chown orchestrator:orchestrator ./startup.sh && \
    # chmod +x ./orchestrator && \
    chmod +x ./startup.sh && \
    sed -i 's/\r$//' ./startup.sh

CMD ["sleep", "infinity"]

# CMD ["./orchestrator"]
