# Skeniranje-lokalne-mreze
Skeniranje lokalne mreže

- Dodavanje u cron tab da se pokreće svaku minutu
crontab -e

#sceniranje mreze i upis u tablicu node.t0_ip_name i node.t0_ip_mac

*/1 * * * *   node /home/pi/produkcija/scan_local.js > /home/pi/produkcija/scan_local.log



Autor: Mario Maruševec

