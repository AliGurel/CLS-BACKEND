```sh

$ docker --version
$ docker version
$ docker info
# tüm docker komutlarını listeler
$ docker --help
$ docker help
#sadece belirtilen komudun kullanımını açıklar
$ docker build --help

# <imagename> bu kısma node, python gibi şeyler denedi
$ docker search <imagename> 

# image oluşturur, dockerfile içindeki komutları çalıştırır, imahge adını rastgele verir
$ docker build .
# eğer image e kendimiz isim vermek istiyorsak aşağıdaki gibi yaz, ancak büyük harf kullanma
$ docker build . --tag <imagename>
#image a ait version oluşturmak için, örn :v2 gibi yaz
$ docker build . --tag <imagename>:version

#image ismini güncelleme
$ docker tag <currentimagename> <newimagename>

#var olan image leri listeler
$ docker images veya docker image ls

# var olan image i silmek
$ docker rmi <imagename>
$ docker rmi <imagename>:versiyon

# image i zorla silmek
$ docker rmi -f <imagename>

#conatiner a çevrilmeyen image leri silmek
$ docker image prune
#yukarıdaki çalışmazsa
$ docker image prune -f
#bu da çalışmazsa
$ docker image prune -f -a

#image den container oluşturma, <containername> i ibz isim veriyoruz
$ docker run --name <containername> <imagename>

# mevcut tüm container leri listeler
$ docker container ls -a
$ docker ps -a

# sadece aktif container leri listeler
$ docker container ls
$ docker ps 

# container silme
$ docker rm <containername>
$ docker rm <containername> -f

#pasif olan container ları silme
$ docker container prune 

# conatiner ı çalıştırma ve durdurma
$ docker start <containername>
$ docker stop <containername>

# terminali /app klasörü içinde açmak için
$ docker run -it <imagename> sh
#çıkmak için
exit yaz

```Sh