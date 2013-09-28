from webitup/base/nginx
maintainer Mangled Deutz <dev@webitup.fr>

add ./pukes/nginx.conf /etc/nginx/sites-available/default
add ./dist /var/www

cmd  ["/usr/bin/supervisord", "-n"]