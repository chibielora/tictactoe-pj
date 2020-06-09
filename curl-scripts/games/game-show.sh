API="https://tic-tac-toe-api.herokuapp.com"
URL_PATH="/games/id:"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \

echo
