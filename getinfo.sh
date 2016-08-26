#!/usr/bin/bash

upout=$(uptime)
nvidiaout=$(nvidia-smi | grep Default)

echo "$nvidiaout" | awk '{print $13}' > /sysmon/gpuinfo.txt
echo "$nvidiaout" | awk '{print $9 " " $11}' > /sysmon/gpumeminfo.txt
free | grep Mem: | awk '{print $3 " " $4 " " $6}' > /sysmon/meminfo.txt
echo "$upout" | awk '{print $10 $11 $12}' > /sysmon/cpuinfo.txt
df | grep ^/dev | awk '{print $3 " " $4 " " $6 " "}' > /sysmon/diskinfo.txt
echo "$upout" | awk '{print $6}' > /sysmon/userinfo.txt
cat /proc/cpuinfo | awk '/^processor/{print $3 " "}' > /sysmon/cpucoreinfo.txt

