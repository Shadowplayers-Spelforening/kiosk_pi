#!/usr/bin/env bash
docker compose -f /home/shadowplayers/kiosk/docker-compose.yml down
docker compose -f /home/shadowplayers/kiosk/docker-compose.yml up -d
#runuser -u shadowplayers -- firefox --kiosk "http://127.0.0.1:3000"
xset s off
#xset -dpms
xset s noblank
runuser -u shadowplayers -- chromium --noerrdialogs --disable-infobars --kiosk http://127.0.0.1:3000

