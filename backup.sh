#!/bin/bash

# specific config variables (EDIT THESE)
HOME="/home/rocknrollturner"
SITEDIR="structuredcapital.net"
DBHOST="mysql.structuredcapital.net"
DBUSER="rocknrollturner"
DBPASS="Turner2016"
DBNAME="structured_cap"
EMAIL="paulturnerblatchley@gmail.com"

# other config variables(DO NOT EDIT THESE)
NOWDATE=$(date +"%y%m%d")
NOWDAY=$(date +"%d")
BACKUPDIR="backups"
MYSQLDUMP="$(which mysqldump)"

# check to see if target path exists - if so, delete the old one and create a new one, otherwise just create it
TARGETPATH=$HOME/$BACKUPDIR/$SITEDIR/$NOWDAY
if [ -d $TARGETPATH ]
then
rm -r $TARGETPATH
mkdir -p $TARGETPATH
else
mkdir -p $TARGETPATH
fi

# create a GZIP of the directory inside the target path
tar -zcf $TARGETPATH/${SITEDIR}_$NOWDATE.tar.gz ./$SITEDIR

# dump the data into a SQL file inside the target path
$MYSQLDUMP -u $DBUSER -h $DBHOST -p$DBPASS $DBNAME | gzip > $TARGETPATH/${DBNAME}_$NOWDATE.sql.gz

# email the GZIP files
mutt $EMAIL -a $TARGETPATH/${DBNAME}_$NOWDATE.sql.gz -s "FULL Backup for $SITEDIR"

# print a message for the logfile / output email
printf "t$SITEDIR has been backed upn" | tee -a $LOGFILE