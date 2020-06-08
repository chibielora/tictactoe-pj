API="https://tic-tac-toe-wdi.herokuapp.com"
URL_PATH="/games"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "game": {
        "cell": {
            "index": 0,
            "value": "x"
    },
    "over": false
  }
}'

echo