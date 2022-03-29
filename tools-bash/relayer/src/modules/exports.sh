#!/bin/bash -i

echo "$CONNETION_INFO" > "$WORKING_EXPORT_DIR/result.txt"

echo "CONNETION_INFO: $CONNETION_INFO";

echo "" # new line

echo -e "These values can always be found at ${STYLE_BOLD}${WORKING_EXPORT_DIR}${STYLE_DEFAULT}";
