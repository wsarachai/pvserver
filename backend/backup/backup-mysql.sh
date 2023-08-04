#!/bin/bash
db_name=pvdb
db_user=pvuser
db_password=1234
backup_filename=$db_name-`date +%F`

mysqldump -h localhost -u $db_user -p$db_password $db_name | gzip > /home/keng/Documents/workspace/pvserver/db/$backup_filename.sql.gz
