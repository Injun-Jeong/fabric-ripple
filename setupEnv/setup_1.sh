#!/bin/sh

# install curl
sudo apt install curl
if [ "$?" -ne 0 ]; then
  echo "Failed to install curl..."
  exit 1
fi
curl -V


# install docker
curl -fsSL https://get.docker.com/ | sudo sh
sudo usermod -aG docker $USER


echo ''
echo 'Download success'
echo 'Please rebooting by "sudo reboot"'
