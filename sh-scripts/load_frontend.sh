while true
do
    curl 'http://10.97.158.164:4000/book/1' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
    -H 'Accept-Language: es,en;q=0.9' \
    -H 'Cache-Control: max-age=0' \
    -H 'Connection: keep-alive' \
    -H 'Cookie: connect.sid=s%3Aln8uDW41iaOM0obqCXwxjkTQtl_zVz0s.SJHIBmghL8%2BsSltW6pyQHl96rSWPCiKK5tt%2F5OorFns' \
    -H 'If-None-Match: W/"1a86-MdshhL+EfUG/e67Ssime8RdNfjs"' \
    -H 'Referer: http://10.97.158.164:4000/' \
    -H 'Upgrade-Insecure-Requests: 1' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' \
    --compressed \
    --insecure
    sleep 0.1
done