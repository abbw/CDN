#!/bin/bash

#Funciont: Backup website and mysql database
#Author: licess
#Website: http://lnmp.org

#IMPORTANT!!!Please Setting the following Values!

######~Set Directory you want to backup~######
Backup_Dir1=vpser.net
Backup_Dir2=lnmp.org
Backup_Dir3=licess.net
Backup_Dir4=jungehost.com

######~Set MySQL UserName and password~######
MYSQL_UserName=root
MYSQL_PassWord=yourrootpassword

######~Set MySQL Database you want to backup~######
Backup_Database_Name1=vpser
Backup_Database_Name2=licess
Backup_Database_Name3=jungehost
Backup_Database_Name4=vpser

######~Set FTP Information~######
FTP_HostName=184.168.192.43
FTP_UserName=vpsernet
FTP_PassWord=yourftppassword
FTP_BackupDir=backup

#Values Setting END!

TodayWWWBackup=www-*-$(date +"%Y%m%d").tar.gz
TodayDBBackup=db-*-$(date +"%Y%m%d").sql
OldWWWBackup=www-*-$(date -d -3day +"%Y%m%d").tar.gz
OldDBBackup=db-*-$(date -d -3day +"%Y%m%d").sql

tar zcf /home/backup/www-$Backup_Dir1-$(date +"%Y%m%d").tar.gz -C /home/wwwroot/ $Backup_Dir1 --exclude=soft
tar zcf /home/backup/www-$Backup_Dir2-$(date +"%Y%m%d").tar.gz -C /home/wwwroot/ $Backup_Dir2
tar zcf /home/backup/www-$Backup_Dir3-$(date +"%Y%m%d").tar.gz -C /home/wwwroot/ $Backup_Dir3 --exclude=test
tar zcf /home/backup/www-$Backup_Dir4-$(date +"%Y%m%d").tar.gz -C /home/wwwroot/ $Backup_Dir4

/usr/local/mysql/bin/mysqldump -u$MYSQL_UserName -p$MYSQL_PassWord $Backup_Database_Name1 > /home/backup/db-$Backup_Database_Name1-$(date +"%Y%m%d").sql
/usr/local/mysql/bin/mysqldump -u$MYSQL_UserName -p$MYSQL_PassWord $Backup_Database_Name2 > /home/backup/db-$Backup_Database_Name2-$(date +"%Y%m%d").sql
/usr/local/mysql/bin/mysqldump -u$MYSQL_UserName -p$MYSQL_PassWord $Backup_Database_Name3 > /home/backup/db-$Backup_Database_Name3-$(date +"%Y%m%d").sql
/usr/local/mysql/bin/mysqldump -u$MYSQL_UserName -p$MYSQL_PassWord $Backup_Database_Name4 > /home/backup/db-$Backup_Database_Name4-$(date +"%Y%m%d").sql

rm -f /home/backup/$OldWWWBackup
rm -f /home/backup/$OldDBBackup

cd /home/backup/

lftp $FTP_HostName -u $FTP_UserName,$FTP_PassWord << EOF
cd $FTP_BackupDir
mrm $OldWWWBackup
mrm $OldDBBackup
mput $TodayWWWBackup
mput $TodayDBBackup
bye
EOF