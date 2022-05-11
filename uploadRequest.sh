token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDI0MzM2ZC05ZWJlLTRiYzYtOTJiNi05MjhmZTAxY2FlYjIiLCJlbWFpbCI6ImRhcnRoIiwibmFtZSI6ImRhcnRoIiwiaWF0IjoxNjUyMjgzMTIwLCJleHAiOjE2NTQ4NzUxMjB9.QC4HfEZLyvHSXoaIQVKgKubNUzOhiJJustcwFfz4Kc0"
path="./README.md"

curl http://localhost:3000/graphql \
    -H "Authorization: Bearer $token" \
    -H 'connection: keep-alive' \
    -F 'operations="{\"query\":\"mutation($file: Upload!){\n\tuploadFile(file:$file)\n} \",\"variables\":{\"file\":null}}"' \
    -F 'map={ "nFile": ["variables.file"] }' \
    -F nFile=@$path
