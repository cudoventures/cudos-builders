#!/bin/bash -i

echo "$CONNECTION_INFO" > "$WORKING_EXPORT_DIR/result.txt"

echo "CONNECTION_INFO: $CONNECTION_INFO";

echo "" # new line

echo -e "These values can always be found at ${STYLE_BOLD}${WORKING_EXPORT_DIR}${STYLE_DEFAULT}";
