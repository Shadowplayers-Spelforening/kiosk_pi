#!/usr/bin/env bash
#docker compose -f /home/shadowplayers/kiosk/docker-compose.yml down
#docker compose -f /home/shadowplayers/kiosk/docker-compose.yml up -d
#runuser -u shadowplayers -- firefox --kiosk "http://127.0.0.1:3000"
#xset -dpms

xset s off
xset s noblank

URL="https://app.shadowplayers.nu/kiosk/" #http://192.168.128.2:3000
echo "Waiting for remote server"
# Wait until the URL returns HTTP 200
while true; do
    code=$(curl -s -o /dev/null -L -w '%{http_code}' --max-time 5 "$URL")
    case "$code" in
        200|401) break ;;
    esac
    echo "Waiting for $URL (got $code)..."
    sleep 5
done
echo "Server up! Starting chromium..."
wlrctl pointer move -5000 -5000
wlrctl pointer move 5000 5000
chromium --noerrdialogs --disable-infobars --kiosk "$URL"
