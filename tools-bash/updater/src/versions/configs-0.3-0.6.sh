#!/bin/bash -i

sed -i "s/minimum-gas-prices.*/minimum-gas-prices = \"5000000000000acudos\"/g" "$MIGRATED_APP_TOML"
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
