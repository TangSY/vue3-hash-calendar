#!/bin/bash
yarn
yarn build:site
cd ./site-dist
tar -zcvf calendar.tar.gz *
mv calendar.tar.gz /usr/share/nginx/hxkj/dist/calendar/
cd /usr/share/nginx/hxkj/dist/calendar/
tar -zxvf calendar.tar.gz
rm -f calendar.tar.gz